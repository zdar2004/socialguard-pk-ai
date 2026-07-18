function LoadingSpinner() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 py-16">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-900/40 border-t-emerald-400 sm:h-14 sm:w-14" />
      <p className="font-mono text-sm uppercase tracking-widest text-emerald-500/80">
        Analyzing message...
      </p>
    </div>
  );
}

export default LoadingSpinner;