function Loader() {
  return (
    <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-12 shadow-sm">
      <div
        className="flex flex-col items-center gap-3"
        role="status"
        aria-live="polite"
      >
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
        <p className="text-sm font-medium text-slate-600">
          Loading students...
        </p>
      </div>
    </div>
  );
}

export default Loader;
