import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const scamTypes = [
  {
    title: "OTP Scam",
    description:
      "Attackers pose as bank or delivery staff to trick victims into revealing one-time passwords.",
  },
  {
    title: "WhatsApp Impersonation",
    description:
      "Scammers hijack or clone a contact's identity to request urgent money transfers from friends and family.",
  },
  {
    title: "Fake Bank Calls",
    description:
      "Callers impersonate bank representatives to extract account details, PINs, or card information.",
  },
  {
    title: "Phishing Links",
    description:
      "Malicious links disguised as legitimate offers or alerts are used to steal credentials and personal data.",
  },
];

const steps = [
  "Paste a suspicious message.",
  "AI analyzes the content.",
  "Risk score is generated.",
  "Safety recommendations are shown.",
];

function About() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0A0F0D] text-neutral-100">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: About */}
        <section className="border-b border-emerald-900/30 px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-emerald-500/80">
              About the Project
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl">
              About SocialGuard PK AI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
              SocialGuard PK AI helps users identify possible social
              engineering scams by analyzing suspicious WhatsApp messages,
              SMS, emails, and call conversations with AI. It highlights red
              flags, estimates a risk score, and suggests safe next steps so
              people can make informed decisions before responding to a
              suspicious request.
            </p>
          </div>
        </section>

        {/* Section 2: Common Scams */}
        <section className="border-b border-emerald-900/30 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-neutral-100 sm:text-3xl">
              Common Scams
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {scamTypes.map((scam) => (
                <div
                  key={scam.title}
                  className="rounded-lg border border-emerald-900/30 bg-[#0D1310] p-6 transition hover:border-emerald-700/50"
                >
                  <h3 className="text-lg font-semibold text-emerald-400">
                    {scam.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {scam.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: How It Works */}
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

        {/* Section 4: Disclaimer */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg border border-amber-700/40 bg-amber-950/10 p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-amber-500/80">
                Disclaimer
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
                This application is an educational cybersecurity project. AI
                predictions may not always be correct. Always verify
                suspicious requests before taking any action.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;