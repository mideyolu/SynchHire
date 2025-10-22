export interface Tip {
    type: "good" | "improve";
    tip: string;
    explanation: string;
}

export type Tips = Tip[];
