import { useEffect } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { resumes } from "../../constants";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "SynchHire" },
        { name: "description", content: "Smart Resume Scorer" },
    ];
}

export default function Home() {
    const { isLoading, auth } = usePuterStore();
    const navigate = useNavigate();

    useEffect(() => {
        !auth.isAuthenticated ? navigate("/auth?next=/") : null;
    }, [auth.isAuthenticated]);
    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Track your Resume ratings</h1>
                    <h2>
                        Review your submissions and check AI-powered feedback.
                    </h2>
                </div>

                <>
                    {resumes.length > 0 ? (
                        <div className="resumes-section">
                            {resumes.map((resume) => (
                                <ResumeCard key={resume.id} resume={resume} />
                            ))}
                        </div>
                    ) : (
                        "No resumes available"
                    )}
                </>
            </section>
        </main>
    );
}
