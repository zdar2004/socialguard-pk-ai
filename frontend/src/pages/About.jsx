import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const whyReasons = [
  "Pakistan is experiencing a rapid increase in WhatsApp OTP scams, phishing attacks, fake bank messages and social engineering fraud.",
  "Many users cannot distinguish legitimate messages from scams, especially when attackers impersonate banks, mobile wallets, or trusted contacts.",
  "SocialGuard PK AI was built to help users make safer decisions using AI — turning a suspicious message into a clear, understandable risk assessment.",
];

const steps = [
  "Paste a suspicious message.",
  "AI analyzes the content.",
  "Detect scam indicators.",
  "Receive risk score and safety recommendations.",
];

const aiFeatures = [
  {
    title: "Scam Detection",
    description:
      "Identifies social engineering patterns across WhatsApp, SMS, email, and call transcripts.",
    icon: (
      <path
        d="M12 3l7 3v5c0 4.5-3 8.2-7 9.5-4-1.3-7-5-7-9.5V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    title: "OTP Fraud Detection",
    description:
      "Flags verification-code requests disguised as banks, wallets, or delivery services.",
    icon: (
      <>
        <circle cx="9" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path
          d="M12.2 12.2L20 20M15.5 16.5l2-2M18 19l2-2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    title: "Phishing Detection",
    description:
      "Spots suspicious links and lookalike domains designed to steal credentials.",
    icon: (
      <path
        d="M9 15l6-6M10 6l1.5-1.5a3 3 0 114.2 4.2L14 10M14 18l-1.5 1.5a3 3 0 11-4.2-4.2L10 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    title: "Risk Assessment",
    description:
      "Converts findings into a clear Low, Medium, or High risk score out of 100.",
    icon: (
      <>
        <path
          d="M4 15a8 8 0 1116 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M12 15l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="15" r="1.2" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Personalized Safety Tips",
    description:
      "Provides a recommended action and a practical safety tip for the scam type identified.",
    icon: (
      <path
        d="M12 4l1.8 4.6L18.5 10l-4.7 1.4L12 16l-1.8-4.6L5.5 10l4.7-1.4L12 4z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
];

const builtWith = ["React", "FastAPI", "Google Gemini AI", "Tailwind CSS"];

function About() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0A0F0D] text-neutral-100">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero */}
        <section className="border-b border-emerald-900/30 px-6 py-20 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-emerald-500/80">
              About the Project
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl md:text-5xl">
              About SocialGuard PK AI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
              An AI-powered cybersecurity awareness tool designed to help
              people identify online scams before they become victims.
            </p>
          </div>
        </section>

        {/* 2. Why this project */}
        <section className="border-b border-emerald-900/30 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-neutral-100 sm:text-3xl">
              Why This Project?
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {whyReasons.map((reason, index) => (
                <div
                  key={reason}
                  className="rounded-lg border border-emerald-900/30 bg-[#0D1310] p-6"
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-emerald-500/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. How it works */}
        <section className="border-b border-emerald-900/30 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-neutral-100 sm:text-3xl">
              How It Works
            </h2>

            <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="rounded-lg border border-emerald-900/30 bg-[#0D1310] p-6"
                >
                  <span className="font-mono text-2xl font-bold text-emerald-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. AI Features */}
        <section className="border-b border-emerald-900/30 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-neutral-100 sm:text-3xl">
              AI Features
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {aiFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-lg border border-emerald-900/30 bg-[#0D1310] p-6 transition hover:border-emerald-700/50"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-emerald-800/40 bg-emerald-950/20 text-emerald-400">
                    <svg viewBox="0 0 24 24" className="h-5 w-5">
                      {feature.icon}
                    </svg>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-neutral-100">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Disclaimer */}
        <section className="border-b border-emerald-900/30 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg border border-amber-700/40 bg-amber-950/10 p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-amber-500/80">
                Disclaimer
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
                SocialGuard PK AI is an educational cybersecurity awareness
                project. It helps users identify suspicious messages but
                should not replace official cybersecurity advice or law
                enforcement.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Built with */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              Built With
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {builtWith.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-emerald-900/40 bg-emerald-950/10 px-4 py-1.5 text-xs font-medium text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;