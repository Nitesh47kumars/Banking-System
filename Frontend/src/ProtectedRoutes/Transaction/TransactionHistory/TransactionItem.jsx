import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";

const TransactionItem = ({ amount, type, createdAt }) => {
  const isCredit = type === "CREDIT";

  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-none">
      
      <div className="flex items-center gap-3">
        
        <div
          className={`w-9 h-9 rounded-lg grid place-items-center ${
            isCredit ? "bg-emerald-400/10" : "bg-rose-400/10"
          }`}
        >
          {isCredit ? (
            <RiArrowDownLine className="text-emerald-400" />
          ) : (
            <RiArrowUpLine className="text-rose-400" />
          )}
        </div>

        <div>
          <p className="text-sm text-white font-medium">
            {isCredit ? "Credited" : "Debited"}
          </p>
          <p className="text-xs text-white/40">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

      </div>

      <p
        className={`text-sm font-semibold ${
          isCredit ? "text-emerald-400" : "text-rose-400"
        }`}
      >
        {isCredit ? "+" : "-"}₹{amount}
      </p>
    </div>
  );
};

export default TransactionItem;