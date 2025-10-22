import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "SynchHire" },
        { name: "description", content: "Smart Resume Scorer" },
    ];
}

export default function Home() {
    const { auth, kv } = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResume, setLoadingResume] = useState<Boolean>(false);

    useEffect(() => {
        !auth.isAuthenticated ? navigate("/auth?next=/") : null;
    }, [auth.isAuthenticated]);

    useEffect(() => {
        const loadingResume = async () => {
            setLoadingResume(true);

            const resumes = (await kv.list("resume:*", true)) as KVItem[];

            const parsedResume = resumes?.map(
                (resume) => JSON.parse(resume.value) as Resume,
            );

            console.log("parsedResume", parsedResume);

            setResumes(parsedResume || []);
            setLoadingResume(false);
        };

        loadingResume();
    }, []);

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className="main-section">
                <div className="page-heading py-16">
                    <h3>Track your Resume ratings</h3>

                    {!loadingResume && resumes.length === 0 ? (
                        <h4>
                            No resumes available. Upload your first reume to get
                            AI Feedback
                        </h4>
                    ) : (
                        <h4>
                            Review your submissions and check AI-powered
                            feedback.
                        </h4>
                    )}
                </div>
                {loadingResume && (
                    <div className="flex flex-col items-center justify-center">
                        <img
                            src="/images/resume-scan-2.gif"
                            alt=""
                            className="w-[200px]"
                        />
                    </div>
                )}

                <>
                    {!loadingResume && resumes.length > 0 && (
                        <div className="resumes-section">
                            {resumes.map((resume) => (
                                <ResumeCard key={resume.id} resume={resume} />
                            ))}
                        </div>
                    )}
                </>

                {!loadingResume && resumes?.length === 0 && (
                    <div className="flex flex-col items-center justify-center mt-10 gap-4">
                        <Link
                            className="primary-button w-fit h-fit text-xl font-semibold"
                            to="/upload"
                        >
                            Upload Resume
                        </Link>
                    </div>
                )}
            </section>
        </main>
    );
}
