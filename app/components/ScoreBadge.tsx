export type ScoreBadgeProps = { score: number };

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
    const isStrong = score > 69;
    const isGood = score > 49 && score <= 69;

    const bgClass = isStrong
        ? "bg-badge-green"
        : isGood
          ? "bg-badge-yellow"
          : "bg-badge-red";

    const textClass = isStrong
        ? "text-green-600"
        : isGood
          ? "text-yellow-600"
          : "text-red-600";

    const label = isStrong ? "Strong" : isGood ? "Good start" : "Needs work";

    return (
        <div className={`${bgClass} inline-block px-3 py-1 rounded-full`}>
            <h6 className={`text-sm font-medium ${textClass}`}>{label}</h6>
        </div>
    );
};

export default ScoreBadge;
