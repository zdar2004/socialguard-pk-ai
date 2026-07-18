const RISK_STYLES = {
  High: {
    text: "text-red-400",
    border: "border-red-900/40",
    glow: "shadow-[0_0_30px_-10px_rgba(248,113,113,0.25)]",
    bullet: "text-red-400",
  },
  Medium: {
    text: "text-amber-400",
    border: "border-amber-900/40",
    glow: "shadow-[0_0_30px_-10px_rgba(251,191,36,0.25)]",
    bullet: "text-amber-400",
  },
  Low: {
    text: "text-emerald-400",
    border: "border-emerald-900/40",
    glow: "shadow-[0_0_30px_-10px_rgba(52,211,153,0.25)]",
    bullet: "text-emerald-400",
  },
};

function ResultCard({
  risk_level,
  risk_score,
  scam_type,
  red_flags = [],
  recommended_action,
  safety_tip,
}) {
  const styles = RISK_STYLES[risk_level] || RISK_STYLES.Medium;

  return (
    <div
      className={`mx-auto w-full max-w-2xl rounded-lg border ${styles.border} bg-[#100D0D] p-6 ${styles.glow} sm:p-8`}
    >
      {/* Header: Risk Level + Risk Score */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-neutral-800 pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            Risk Level
          </p>
          <p className={`mt-1 text-2xl font-bold tracking-tight ${styles.text}`}>
            {risk_level} Risk
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
            Risk Score
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-100">
            {risk_score} <span className="text-base font-normal text-neutral-500">/ 100</span>
          </p>
        </div>
      </div>

      {/* Scam Type */}
      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          Scam Type
        </p>
        <p className="mt-1 text-lg font-semibold text-neutral-100">
          {scam_type}
        </p>
      </div>

      {/* Red Flags */}
      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          Red Flags
        </p>
        <ul className="mt-2 space-y-1.5">
          {red_flags.map((flag) => (
            <li key={flag} className="flex items-start gap-2 text-sm text-neutral-300">
              <span className={`mt-0.5 ${styles.bullet}`}>•</span>
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
          {recommended_action}
        </p>
      </div>

      {/* Safety Tip */}
      <div className="mt-4 rounded-md border border-emerald-800/40 bg-emerald-950/20 p-4">
        <p className="font-mono text-xs uppercase tracking-widest text-emerald-500/80">
          Safety Tip
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-200">
          {safety_tip}
        </p>
      </div>
    </div>
  );
}

export default ResultCard;