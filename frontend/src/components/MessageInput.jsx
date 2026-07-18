import { useState } from "react";

const MAX_CHARACTERS = 3000;

function MessageInput() {
  const [message, setMessage] = useState("");

  const characterCount = message.length;
  const isEmpty = message.trim().length === 0;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value.length <= MAX_CHARACTERS) {
      setMessage(value);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h2 className="text-center text-2xl font-semibold tracking-tight text-neutral-100 sm:text-3xl">
        AI Scam Analyzer
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-neutral-400 sm:text-base">
        Paste a suspicious WhatsApp message, SMS, email, or call conversation
        for AI analysis.
      </p>

      <textarea
        value={message}
        onChange={handleChange}
        maxLength={MAX_CHARACTERS}
        placeholder="Paste the suspicious message here..."
        rows={8}
        className="mt-8 w-full resize-y rounded-md border border-emerald-900/40 bg-[#0D1310] p-4 text-sm text-neutral-100 placeholder:text-neutral-500 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 sm:text-base"
      />

      <div className="mt-2 text-right font-mono text-xs text-neutral-500">
        {characterCount} / {MAX_CHARACTERS} characters
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          disabled={isEmpty}
          className="rounded-md bg-emerald-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#0A0F0D] shadow-[0_0_25px_-5px_rgba(52,211,153,0.6)] transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400 disabled:shadow-none disabled:hover:bg-neutral-700"
        >
          Analyze Scam
        </button>
      </div>
    </div>
  );
}

export default MessageInput;