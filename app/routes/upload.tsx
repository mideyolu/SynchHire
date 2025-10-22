import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants/index";

const upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    };

    const handleAnalyzer = async ({
        companyName,
        jobTitle,
        jobDescription,
        file,
    }: {
        companyName: string;
        jobTitle: string;
        jobDescription: string;
        file: File;
    }) => {
        try {
            setIsProcessing(true);
            setStatusText("Uploading the file...");

            const uploadedFile = await fs.upload([file]);
            if (!uploadedFile || !uploadedFile.path) {
                setStatusText("Failed to upload file");
                setIsProcessing(false);
                return;
            }

            setStatusText("Converting to image...");
            const imgFile = await convertPdfToImage(file);

            if (!imgFile || !imgFile.file) {
                console.error("PDF to image failed:", imgFile.error);
                setStatusText("Failed to convert PDF to image");
                setIsProcessing(false);
                return;
            }

            setStatusText("Uploading the image...");
            const uploadedImage = await fs.upload([imgFile.file]);
            if (!uploadedImage || !uploadedImage.path) {
                setStatusText("Failed to upload image");
                setIsProcessing(false);
                return;
            }

            setStatusText("Preparing the data...");
            const uuid = generateUUID();

            const data = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName,
                jobTitle,
                jobDescription,
                feedback: "",
            };

            await kv.set(`resume:${uuid}`, JSON.stringify(data));

            setStatusText("Analyzing...");

            const feedback = await ai.feedback(
                uploadedFile.path,
                prepareInstructions({ jobTitle, jobDescription }),
            );

            if (!feedback) {
                setStatusText("Failed to analyze the resume");
                setIsProcessing(false);
                return;
            }

            const feedbackText =
                typeof feedback.message.content === "string"
                    ? feedback.message.content
                    : feedback.message.content[0].text;

            try {
                data.feedback = JSON.parse(feedbackText);
            } catch (err) {
                console.error("JSON parse error:", feedbackText);
                setStatusText("Failed to parse feedback response");
                setIsProcessing(false);
                return;
            }

            await kv.set(`resume:${uuid}`, JSON.stringify(data));

            setStatusText("Analysis complete! Redirecting...");
            console.log("Final data:", data);

            navigate(`/resume/${uuid}`);
        } catch (err) {
            console.error("Error in analyzer:", err);
            setStatusText("Something went wrong while processing your resume.");
            setIsProcessing(false);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest("form");
        const formData = new FormData(form!);
        const companyName = formData.get("company-name") as string;
        const jobTitle = formData.get("job-title") as string;
        const jobDescription = formData.get("job-description") as string;

        if (!file) return;

        handleAnalyzer({ companyName, jobTitle, jobDescription, file });
    };

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className="pahe-heading py-10">
                    <h3>Smart Feedback for your dream job</h3>
                    {isProcessing ? (
                        <>
                            <h4>{statusText}</h4>
                            <img
                                src="/images/resume-scan.gif"
                                className="w-full"
                                alt=""
                            />
                        </>
                    ) : (
                        <h4>
                            Drop your resume for an ATS core and smart feedback
                        </h4>
                    )}

                    {!isProcessing ? (
                        <form
                            id="upload-form"
                            className="flex flex-col gap-4 mt-8"
                            onSubmit={handleSubmit}
                        >
                            <div className="form-div">
                                <label htmlFor="company-name">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="company-name"
                                    name="company-name"
                                    placeholder="Company Name"
                                    required
                                />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input
                                    type="text"
                                    id="job-title"
                                    name="job-title"
                                    placeholder="Job Title"
                                    required
                                />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">
                                    Job Description
                                </label>
                                <textarea
                                    id="job-description"
                                    rows={5}
                                    name="job-description"
                                    placeholder="Job Description"
                                    required
                                />
                            </div>
                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button" type="submit">
                                Analyze Resume
                            </button>
                        </form>
                    ) : null}
                </div>
            </section>
        </main>
    );
};

export default upload;
