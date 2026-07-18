function ResultCard() {
  const redFlags = ["Urgency tactic", "Requests OTP", "Impersonation"];

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg border border-red-900/40 bg-[#100D0D] p-6 shadow-[0_0_30px_-10px_rgba(248,113,113,0.25)] sm:p-8">
      {/* Header: Risk Level + Risk Score */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-neutral-800 pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            Risk Level
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-red-400">
            High Risk
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            Risk Score
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-100">
            92 <span className="text-base font-normal text-neutral-500">/ 100</span>
          </p>
        </div>
      </div>

      {/* Scam Type */}
      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          Scam Type
        </p>
        <p className="mt-1 text-lg font-semibold text-neutral-100">
          OTP Scam
        </p>
      </div>

      {/* Red Flags */}
      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          Red Flags
        </p>
        <ul className="mt-2 space-y-1.5">
          {redFlags.map((flag) => (
            <li key={flag} className="flex items-start gap-2 text-sm text-neutral-300">
              <span className="mt-0.5 text-red-400">•</span>
              {flag}
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Action */}
      <div className="mt-6 rounded-md border border-emerald-800/40 bg-emerald-950/20 p-4">
        <p className="font-mono text-xs uppercase tracking-widest text-emerald-500/80">
          Recommended Action
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-200">
          Do not share your OTP. Call the person directly before taking any
          action.
        </p>
      </div>

      {/* Safety Tip */}
      <div className="mt-4 rounded-md border border-emerald-800/40 bg-emerald-950/20 p-4">
        <p className="font-mono text-xs uppercase tracking-widest text-emerald-500/80">
          Safety Tip
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-200">
          Enable WhatsApp Two-Step Verification.
        </p>
      </div>
    </div>
  );
}

export default ResultCard;