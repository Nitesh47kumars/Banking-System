import React from "react";

const TransactionButton = ({loading}) => {
  return (
    <button
      type="submit"
      disabled={loading} // Disable button while processing
      className={`w-full font-bold py-4 cursor-pointer rounded-xl shadow-lg transform transition uppercase tracking-wider flex items-center justify-center gap-2
        ${
          loading
            ? "bg-slate-700 text-slate-400 cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-400 text-slate-900 active:scale-[0.98] shadow-amber-500/20"
        }`}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </>
      ) : (
        "Confirm Transfer"
      )}
    </button>
  );
};

export default TransactionButton;
