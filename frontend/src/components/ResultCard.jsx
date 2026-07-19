const RISK_STYLES = {
  High: {
    text: "text-red-400",
    border: "border-red-900/40",
    glow: "shadow-[0_0_30px_-10px_rgba(248,113,113,0.25)]",
    bullet: "text-red-400",
    bar: "bg-red-400",
    chip: "border-red-800/50 bg-red-950/30 text-red-400",
  },
  Medium: {
    text: "text-amber-400",
    border: "border-amber-900/40",
    glow: "shadow-[0_0_30px_-10px_rgba(251,191,36,0.25)]",
    bullet: "text-amber-400",
    bar: "bg-amber-400",
    chip: "border-amber-800/50 bg-amber-950/30 text-amber-400",
  },
  Low: {
    text: "text-emerald-400",
    border: "border-emerald-900/40",
    glow: "shadow-[0_0_30px_-10px_rgba(52,211,153,0.25)]",
    bullet: "text-emerald-400",
    bar: "bg-emerald-400",
    chip: "border-emerald-800/50 bg-emerald-950/30 text-emerald-400",
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
  const clampedScore = Math.max(0, Math.min(100, Number(risk_score) || 0));

  return (
    <div
      className={`mx-auto w-full max-w-2xl rounded-lg border ${styles.border} bg-[#0D0F0E] ${styles.glow} sm:p-8`}
    >
      <div className="p-6 sm:p-0">
        {/* Header: Risk Level chip + Risk Score */}
        <div className="flex flex-col gap-5 border-b border-neutral-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
              Risk Level
            </p>
            <span
              className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${styles.chip}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${styles.bar}`} />
              {risk_level} Risk
            </span>
          </div>

          <div className="sm:w-44">
            <div className="flex items-baseline justify-between sm:justify-end sm:gap-2">
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                Risk Score
              </p>
              <p className={`text-lg font-bold ${styles.text}`}>
                {clampedScore}
                <span className="text-xs font-normal text-neutral-500">
                  {" "}
                  / 100
                </span>
              </p>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-800">
              <div
                className={`h-full rounded-full ${styles.bar}`}
                style={{ width: `${clampedScore}%` }}
              />
            </div>
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
          <ul className="mt-2 space-y-2">
            {red_flags.map((flag) => (
              <li
                key={flag}
                className="flex items-start gap-2 rounded-md border border-neutral-800 bg-black/20 px-3 py-2 text-sm text-neutral-300"
              >
                <span className={`mt-0.5 font-bold ${styles.bullet}`}>•</span>
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
    </div>
  );
}

export default ResultCard;