interface Resume {
    id: string;
    companyName?: string;
    jobTitle?: string;
    imagePath: string;
    resumePath: string;
    feedback: Feedback;
}

interface Feedback{
    overallScore: number;
    ATS: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
        }[];
    };
    toneAndStyle: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
        }[];

    };
    content: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
        }[];
    };
    structure: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
        }[];

    };
    skills: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
        }[];

    };

}
