import { useDispatch, useSelector } from "react-redux";
import TransactionItem from "./TransactionItem";
import { fetchTransactions } from "../../../redux/transactionSlice";
import { useEffect } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const AllTransactions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transactions } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white/3 border border-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-4 mb-6">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center px-3 py-2 rounded-lg 
        bg-white/5 border border-white/10 
        text-white/70 hover:text-white cursor-pointer 
        hover:bg-white/10 transition-all"
        >
          <RiArrowLeftLine size={18} />
        </button>

        {/* TITLE */}
        <h2 className="font-semibold text-white text-lg tracking-wide">
          All Transactions
        </h2>
      </div>

      {!transactions || transactions.length === 0 ? (
        <div className="text-center py-10 text-white/40 text-sm">
          No transactions found
        </div>
      ) : (
        <div>
          {transactions.map((tx) => (
            <TransactionItem key={tx._id} {...tx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTransactions;
