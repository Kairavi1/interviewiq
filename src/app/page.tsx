import {
  Activity,
  Brain,
  ExternalLink,
  FileSearch2,
  RefreshCw,
} from "lucide-react";
import Header from "../components/Header";
import { signIn } from "@/auth";

const steps = [
  {
    number: 1,
    title: "Upload resume",
    description: "PDF parsed and embedded",
  },
  {
    number: 2,
    title: "Paste the JD",
    description: "Role matched to your background",
  },
  {
    number: 3,
    title: "Answer 12 questions",
    description: "Technical, behavioral, culture",
  },
  {
    number: 4,
    title: "Get scored",
    description: "Specific feedback on every answer",
  },
];

const features = [
  {
    icon: <FileSearch2 className="h-6 w-6" strokeWidth={2} />,
    title: "RAG-powered questions",
    description:
      "Your resume and the JD are embedded and matched — questions reference your actual experience.",
  },
  {
    icon: <Activity className="h-6 w-6" strokeWidth={2} />,
    title: "Score tracking",
    description:
      "Every session is saved. Watch your scores improve across practice runs over time.",
  },
  {
    icon: <RefreshCw className="h-6 w-6" strokeWidth={2} />,
    title: "Retry any question",
    description:
      "Re-answer weak questions and see your score delta immediately.",
  },
];
export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#f9f9f7]">
      <Header />

      <section className="flex min-h-[95vh] flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 flex items-center rounded-full border border-[#e6e3db] bg-white px-5 py-2">
          <span className="text-base font-medium text-[#52514e]">
            Resume Analysis · Job Matching · AI Feedback
          </span>
        </div>

        <h1 className="max-w-5xl text-6xl font-bold leading-tight tracking-tight text-black">
          Practice interviews that
          <br />
          actually know your resume
        </h1>

        <p className="mt-8 max-w-3xl text-2xl font-medium leading-relaxed text-[#52514e]">
          Paste a job description, upload your resume. Get 12 questions
          <br />
          tailored to that exact role and your exact background — then
          <br />
          get scored on every answer.
        </p>

        <form
          action={async () => {
            "use server";

            await signIn("google", {
              redirectTo: "/dashboard/prepare",
            });
          }}
        >
          <button className="mt-12 flex h-14 items-center gap-3 rounded-xl border border-zinc-300 bg-white px-6 text-lg font-semibold text-black shadow-sm transition hover:bg-zinc-50">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="h-5 w-5"
            />
            Start with Google — it's free
          </button>
        </form>

        <p className="mt-5 text-lg font-medium text-[#898781]">
          No credit card · Sessions saved to your account
        </p>
      </section>

      <section className="w-full bg-[#f9f9f7] pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-16 text-center text-xl font-semibold tracking-wide text-[#8b897f]">
            HOW IT WORKS
          </h2>

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#cfe3fb]">
                  <span className="text-base font-semibold text-[#1a5296]">
                    {step.number}
                  </span>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-[#1a1a1a]">
                  {step.title}
                </h3>

                <p className="mx-auto max-w-[170px] text-md text-[#8b897f]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f9f9f7] pt-6 pb-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <h2 className="text-xl font-semibold text-[#3d3d3a]">
            Here's what a scored answer looks like
          </h2>

          <p className="mt-2 max-w-3xl text-lg font-medium leading-relaxed text-[#a3a199]">
            Questions are specific to the role and your resume — not generic
            prompts.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl px-6">
          <div className="rounded-2xl border border-[#eceae3] bg-white p-10 text-left shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 rounded-full bg-[#d9e8fb] px-4 py-2 text-[15px] font-semibold text-[#1a5296]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                Technical
              </span>

              <span className="rounded-full border border-[#e6e3db] px-4 py-2 text-[15px] font-medium text-[#7a7870]">
                Medium
              </span>
            </div>

            <h3 className="mt-7 max-w-5xl text-[24px] font-semibold text-black">
              Stripe's infrastructure handles millions of idempotent requests.
              How would you design a system to guarantee exactly-once delivery?
            </h3>

            <div className="mt-7 rounded-xl bg-[#fcfcfb] p-6">
              <p className="text-[15px] font-medium text-[#a3a199]">
                Your answer
              </p>

              <p className="mt-3 text-lg text-[#52514e]">
                I'd use an idempotency key in Redis with a TTL. On each request,
                check if the key exists — return cached response or process and
                store atomically. For distributed guarantees I'd use a
                transactional outbox pattern…
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-lg font-medium text-[#7a7870]">
                Overall score
              </span>

              <div className="flex items-baseline gap-1">
                <span className="text-[26px] font-bold leading-none text-[#3f8f3f]">
                  8.5
                </span>

                <span className="text-xl font-medium leading-none text-[#a3a199]">
                  /10
                </span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="rounded-xl bg-[#CAEAC7] p-6">
                <p className="text-lg font-semibold text-[#016301]">
                  What worked
                </p>

                <p className="mt-3 leading-7 text-[#016301]">
                  Idempotency key + Redis is correct. Transactional outbox shows
                  strong distributed systems knowledge.
                </p>
              </div>

              <div className="rounded-xl bg-[#F9DCA4] p-6">
                <p className="text-lg font-semibold text-[#744500]">Missing</p>

                <p className="mt-3 leading-7 text-[#744500]">
                  Didn't address Redis failure fallback. Mention a DB-backed WAL
                  for durability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f9f9f7] pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-[#e6e3db] bg-white p-7"
              >
                <div className="text-[#52514e]">{feature.icon}</div>

                <h3 className="mt-5 text-lg font-bold text-black">
                  {feature.title}
                </h3>

                <p className="mt-3 font-semibold text-[#898781]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto h-px w-[95%] max-w-9xl bg-[#e6e3db]" />

      <section className="w-full bg-[#f9f9f7] py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <h2 className="text-xl font-bold leading-tight text-black">
            Ready to stop guessing what they'll ask?
          </h2>

          <p className="mt-2 text-xl font-medium leading-relaxed text-[#898781]">
            Sign in, upload your resume, and get your first session in under 2
            minutes.
          </p>

          <button className="mt-10 flex h-14 items-center gap-3 rounded-xl border border-zinc-300 bg-white px-6 text-lg font-semibold text-black shadow-sm transition hover:bg-zinc-50">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="h-5 w-5"
            />
            Get started with Google
          </button>
        </div>
      </section>

      <div className="mx-auto h-px w-[95%] max-w-9xl bg-[#e6e3db]" />

      <footer className="mx-auto flex w-[95%] max-w-9xl items-center justify-between py-10">
        <div className="flex items-center gap-3 text-2xl font-semibold text-[#898781]">
          <Brain size={28} strokeWidth={2} />
          InterviewIQ
        </div>

        <div className="flex items-center gap-8 text-[#898781] font-medium text-lg">
          <span>Built in public</span>

          <a
            href="https://github.com/Kairavi1/interviewiq"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-gray-800 transition"
          >
            GitHub
            <ExternalLink size={18} strokeWidth={2.5} />
          </a>
        </div>
      </footer>
    </main>
  );
}
