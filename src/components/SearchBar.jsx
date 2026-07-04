import { useId } from "react";

function SearchBar({
  value,
  onChange,
  placeholder = "Search students",
  label = "Search",
}) {
  const inputId = useId();

  return (
    <div className="w-full sm:max-w-md">
      <label
        htmlFor={inputId}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          id={inputId}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <p className="mt-2 text-xs text-slate-500">
        Search by student name or email.
      </p>
    </div>
  );
}

export default SearchBar;
