import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";

const TxRow = ({ amount, type, createdAt }) => {
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
          <p className="text-sm text-white font-medium">{type}</p>
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

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="lg:col-span-2 bg-white/3 border border-white/5 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-white">Recent Transactions</h2>
        <button className="text-xs text-amber-400 hover:text-amber-300 transition-colors">
          View all
        </button>
      </div>

      {/* If no transactions */}
      {!transactions || transactions.length === 0 ? (
        <div className="text-center py-10 text-white/40 text-sm">
          No transactions yet
        </div>
      ) : (
        <div>
          {transactions.map((tx) => (
            <TxRow key={tx._id} {...tx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;