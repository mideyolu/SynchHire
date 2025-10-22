import ScoreBadge from "~/components/ScoreBadge";
import ScoreGauge from "~/components/ScoreGauge";

const Category = ({ title, score }: { title: string; score: number }) => {
    const textColor =
        score > 70
            ? "text-green-600"
            : score > 49
              ? "text-yellow-600"
              : "text-red-600";
    return (
        <div className="resume-summary">
            <div className="category">
                <div className="font-medium flex flex-row gap-2 items-center justify-center">
                    <div className="flex flex-col">
                        <p className="!text-lg !text-gray-500 !tracking-[1px]">
                            {title}
                        </p>
                        <ScoreBadge score={score} />
                    </div>
                </div>
                <div className="">
                    <p className="!text-lg !text-gray-500 !tracking-[1px]">
                        <span className={textColor}>{score}</span>/100
                    </p>
                </div>
            </div>
        </div>
    );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md w-full p-1">
            <div className="flex flex-row items-center p-4 gap-8">
                <ScoreGauge score={feedback.overallScore} />

                <div className="flex flex-col gap-2">
                    <h4 className="!text-xl font-bold">Your Resume Score</h4>
                    <p className="!text-sm !text-gray-500 !tracking-[1px]">
                        This score is calculated based on the variables listed
                        below
                    </p>
                </div>
            </div>
            <Category
                title="Tone & Style"
                score={feedback.toneAndStyle.score}
            />
            <Category title="Content Score" score={feedback.content.score} />
            <Category title="Structure" score={feedback.structure.score} />
            <Category title="Skills" score={feedback.skills.score} />
        </div>
    );
};

export default Summary;
