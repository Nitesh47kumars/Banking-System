import { useNavigate } from "react-router-dom";
import TransactionItem from "./TransactionItem";

const RecentTransactions = ({ transactions }) => {
  const navigate = useNavigate();

  const lastFive = [...(transactions || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="lg:col-span-2 bg-white/3 border border-white/5 rounded-2xl p-6">
      
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold text-white">Recent Transactions</h2>

        <button
          onClick={() => navigate("/transactions")}
          className="text-xs cursor-pointer text-amber-400 hover:text-amber-300 transition-colors"
        >
          View all →
        </button>
      </div>

      {lastFive.length === 0 ? (
        <div className="text-center py-10 text-white/40 text-sm">
          No transactions yet
        </div>
      ) : (
        <div>
          {lastFive.map((tx) => (
            <TransactionItem key={tx._id} {...tx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;