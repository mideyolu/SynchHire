import React from "react";
import ATSSuggestions from "~/components/ATSSuggestions";

export interface Suggestion {
    type: "good" | "improve";
    tip: string;
}

export interface ATSProps {
    score: number;
    suggestions?: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions = [] }) => {
    const bgFrom = score > 69 ? "from-green-100" : score > 49 ? "from-yellow-100" : "from-red-100";

    const iconSrc = score > 69 ? "/icons/ats-good.svg" : score > 49 ? "/icons/ats-warning.svg" : "/icons/ats-bad.svg";

    return (
        <div className={`rounded-2xl p-4 bg-gradient-to-r ${bgFrom} to-white shadow-md`}>
            <div className="flex items-center gap-4">
                <img src={iconSrc} alt="ats-icon" className="w-10 h-10" />
                <div>
                    <h4 className="text-lg font-semibold">ATS Score - {score}/100</h4>
                    <p className="text-sm !text-gray-500 !tracking-[1px]">Automated screening score for your resume</p>
                </div>
            </div>

            <div className="mt-4">
                <h5 className="font-medium">What this means</h5>
                <p className="text-sm mt-2 !text-gray-500 !tracking-[1px]">
                    This score represents how well your resume is likely to be parsed and matched by automated
                    applicant tracking systems. A higher score indicates better parsing, clearer keywords, and
                    stronger formatting for ATS readability.
                </p>
            </div>

            <div className="mt-4">
                <h6 className="font-medium">Suggestions</h6>
                <ATSSuggestions suggestions={suggestions} />
            </div>

            <p className="mt-4 text-sm !tracking-[1px] !text-gray-700">
                Keep refining your resume — small changes can improve how ATS parses and ranks your profile.
            </p>
        </div>
    );
};

export default ATS;
