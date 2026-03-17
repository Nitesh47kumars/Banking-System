import { useDispatch, useSelector } from "react-redux";
import TransactionItem from "./TransactionItem";
import { fetchTransactions } from "../../../redux/transactionSlice";
import { useEffect } from "react";

const AllTransactions = () => {
  const dispatch = useDispatch()
  const {transactions} = useSelector((state)=> state.transaction)
  
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  console.log(transactions);

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white/3 border border-white/5 rounded-2xl p-6">
      
      <h2 className="font-semibold text-white mb-6 text-lg">
        All Transactions
      </h2>

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