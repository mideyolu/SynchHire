import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import type { Route } from "./+types/home";
import { resumes } from "../../constants";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SynchHire" },
    { name: "description", content: "Smart Resume Scorer" },
  ];
}

export default function Home() {
    return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
        <Navbar/>
        <section className="main-section">
            <div className="page-heading py-16">
                <h3>Track your Resume ratings</h3>
                <h4>Review your submissions and check AI-powered feedback.</h4>
            </div>

            <>
                {
                    resumes.length > 0 ? (
                        <div className="resumes-section">
                            {
                                resumes.map((resume) => (
                                    <ResumeCard key={resume.id} resume={ resume} />
                                ))
                            }

                        </div>
                    ) : "No resumes available"
                }

            </>
        </section>

  </main>;
}
