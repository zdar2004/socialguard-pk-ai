const RISK_TEXT_COLOR = {
  High: "text-red-400",
  Medium: "text-amber-400",
  Low: "text-emerald-400",
};

function formatTimestamp(timestamp) {
  try {
    return new Date(timestamp).toLocaleString();
  } catch (error) {
    return "";
  }
}

function truncateMessage(message, maxLength = 80) {
  if (!message) return "";
  return message.length > maxLength
    ? `${message.slice(0, maxLength)}…`
    : message;
}

function HistoryPanel({ history = [], onClear }) {
  const isEmpty = history.length === 0;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="flex items-center justify-between">
        <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-500">
          Recent Analyses
        </h3>

        {!isEmpty && (
          <button
            type="button"
            onClick={onClear}
            className="font-mono text-xs uppercase tracking-widest text-neutral-500 transition hover:text-red-400"
          >
            Clear History
          </button>
        )}
      </div>

      {isEmpty ? (
        <p className="mt-4 rounded-md border border-dashed border-emerald-900/40 bg-emerald-950/10 p-6 text-center text-sm text-neutral-500">
          No analyses yet. Your recent scam checks will appear here.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {history.map((item) => {
            const riskColor =
              RISK_TEXT_COLOR[item.result?.risk_level] || "text-neutral-300";

            return (
              <li
                key={item.timestamp}
                className="rounded-md border border-emerald-900/30 bg-[#0D1310] p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-neutral-300">
                    {truncateMessage(item.message)}
                  </p>
                  <span className="font-mono text-xs text-neutral-500">
                    {formatTimestamp(item.timestamp)}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs">
                  <span className={`font-semibold ${riskColor}`}>
                    {item.result?.risk_level} Risk
                  </span>
                  <span className="text-neutral-400">
                    Score: {item.result?.risk_score} / 100
                  </span>
                  <span className="text-neutral-400">
                    {item.result?.scam_type}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default HistoryPanel;