import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
} from "~/components/Accordion";
import { cn } from "~/lib/utils";

type Tip = { type: "good" | "improve"; tip: string; explanation: string };

const ScoreBadge = ({
    score,
    showIcon,
}: {
    score: number;
    showIcon?: boolean;
}) => {
    const isGreen = score > 60;
    const isYellow = score > 49 && score <= 60;

    const bg = isGreen
        ? "bg-green-100"
        : isYellow
          ? "bg-yellow-100"
          : "bg-red-100";
    const text = isGreen
        ? "text-green-600"
        : isYellow
          ? "text-yellow-600"
          : "text-red-600";

    return (
        <div
            className={cn([
                " mx-1 inline-flex items-center gap-2 px-3 py-1 rounded-full",
                bg,
            ])}
        >
            {showIcon && isGreen && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className={`${text} w-4 h-4`}
                    fill="currentColor"
                    aria-hidden
                >
                    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 14.2-4.2-4.2 1.4-1.4L11 13.4l5.8-5.8 1.4 1.4L11 16.2z" />
                </svg>
            )}
            <h6 className={cn(["text-sm font-medium", text])}>{score}/100</h6>
        </div>
    );
};

const CategoryHeader = ({
    title,
    categoryScore,
}: {
    title: string;
    categoryScore: number;
}) => {
    return (
        <div className="flex items-center justify-between">
            <h5 className="text-md font-semibold">{title}</h5>
            <ScoreBadge score={categoryScore} showIcon />
        </div>
    );
};

const Category = ({ tips }: { tips: Tip[] }) => {
    return (
        <div className="mt-3">
            <div className="grid grid-cols-2 gap-4">
                {tips.map((t, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <img
                            src={
                                t.type === "good"
                                    ? "/icons/check.svg"
                                    : "/icons/warning.svg"
                            }
                            alt={t.type}
                            className="w-5 h-5 mt-1"
                        />
                        <div>
                            <p className="text-sm !text-gray-500 !tracking-[1px]">
                                {t.tip}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 space-y-3">
                {tips.map((t, i) => (
                    <div
                        key={i}
                        className={cn([
                            "p-3 rounded-md",
                            t.type === "good"
                                ? "bg-green-50 border border-green-100"
                                : "bg-yellow-50 border border-yellow-100",
                        ])}
                    >
                        <h6 className="font-medium">
                            {t.type === "good"
                                ? "What went well"
                                : "How to improve"}
                        </h6>
                        <p className="text-sm !text-gray-500 !tracking-[1px] mt-1">
                            {t.explanation}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Details = ({ feedback }: { feedback: any }) => {
    // feedback structure assumed; adapt as needed
    const tone = feedback?.toneAndStyle?.tips || [];
    const content = feedback?.content?.tips || [];
    const structure = feedback?.structure?.tips || [];
    const skills = feedback?.skills?.tips || [];

    return (
        <div className="w-full">
            <Accordion>
                <AccordionItem id="tone">
                    <AccordionHeader itemId="tone">
                        <CategoryHeader
                            title="Tone & Style"
                            categoryScore={feedback?.toneAndStyle?.score ?? 0}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="tone">
                        <Category tips={tone} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="content">
                    <AccordionHeader itemId="content">
                        <CategoryHeader
                            title="Content"
                            categoryScore={feedback?.content?.score ?? 0}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="content">
                        <Category tips={content} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="structure">
                    <AccordionHeader itemId="structure">
                        <CategoryHeader
                            title="Structure"
                            categoryScore={feedback?.structure?.score ?? 0}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="structure">
                        <Category tips={structure} />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem id="skills">
                    <AccordionHeader itemId="skills">
                        <CategoryHeader
                            title="Skills"
                            categoryScore={feedback?.skills?.score ?? 0}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="skills">
                        <Category tips={skills} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Details;
