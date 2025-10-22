import React from "react";
import type { Suggestion } from "~/components/ATS";

export interface ATSSuggestionsProps {
    suggestions: Suggestion[];
}

const ATSSuggestions = ({ suggestions }: ATSSuggestionsProps) => {
    return (
        <ul className="mt-2 space-y-2">
            {suggestions.map((s, idx) => {
                const tipBg = s.type === "good" ? "bg-badge-green/10" : "bg-badge-yellow/10";
                return (
                    <li
                        key={idx}
                        className={`${tipBg} flex items-start gap-3 p-2 rounded-md`}
                    >
                        <img
                            src={s.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                            alt={s.type}
                            className="w-5 h-5 mt-1"
                        />
                        <p className={`text-sm !tracking-[1px] ${s.type === "good" ? "!text-green-600" : "!text-yellow-600"}`}>
                            {s.tip}
                        </p>
                    </li>
                );
            })}
        </ul>
    );
};

export default ATSSuggestions;
