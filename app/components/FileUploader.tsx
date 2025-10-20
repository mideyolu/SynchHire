import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import formatSize from "../lib/utils";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    // keep a local selectedFile state so the remove button can clear the UI
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0] || null;
            setSelectedFile(file);
            onFileSelect?.(file);
        },
        [onFileSelect],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: { "application/pdf": [".pdf"] },
        maxSize: 20 * 1024 * 1024, // 20 MB
    });

    const file = selectedFile;

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()} className="cursor-pointer">
                <input {...getInputProps()} />

                <div className="space-y-4 cursor-pointer">
                    {file ? (
                        <div
                            className="uploader-selected-file"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src="/images/pdf.png"
                                alt="png"
                                className="size-10"
                            />
                            <div className="flex items-center space-x-4">
                                <div className="">
                                    <h6 className="font-medium text-sm truncate max-w-xs text-gray-700">
                                        {file.name}
                                    </h6>
                                    <span className="text-sm text-gray-500">
                                        {formatSize(file.size)}
                                    </span>
                                </div>
                            </div>
                            {/* Code to remove the current file */}
                            <button
                                className="p-2 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // clear local state and inform parent
                                    setSelectedFile(null);
                                    onFileSelect?.(null);
                                }}
                                type="button"
                            >
                                <img
                                    src="/icons/cross.svg"
                                    alt="remove"
                                    className="w-4 h-4"
                                />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center flex-col gap-2">
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
                                <img
                                    src="/icons/info.svg"
                                    alt="upload"
                                    className="size-20"
                                />
                            </div>
                            <h6 className="text-gray-500">
                                <span className="font-semibold">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </h6>

                            <h6 className="text-lg text-gray-500">
                                PDF (max 20 MB)
                            </h6>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUploader;
