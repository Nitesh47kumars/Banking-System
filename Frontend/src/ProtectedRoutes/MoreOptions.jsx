import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  RiUserLine,
  RiMailLine,
  RiShieldCheckLine,
  RiLogoutBoxLine,
  RiCalendarLine,
  RiBankLine,
  RiCoinLine,
  RiFingerprint2Line,
  RiCheckboxCircleLine,
  RiTimeLine,
} from "react-icons/ri";
import { logout } from "../redux/authSlice";
import { useEffect } from "react";
import { fetchAccount, fetchBalance } from "../redux/accountSlice";

const Row = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
      <Icon size={14} className="text-white/70" />
    </div>
    <div>
      <p className="text-xs text-white/40">{label}</p>
      <p className="text-sm font-medium">{value || "—"}</p>
    </div>
  </div>
);

const MoreOptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { account, balance } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(fetchAccount());
  }, []);

  useEffect(() => {
    if (account) {
      dispatch(fetchBalance(account?._id));
    }
  }, [account]);

  const logoutUser = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  const userData = [
    { label: "Name", value: user?.name, icon: RiUserLine },
    { label: "Email", value: user?.email, icon: RiMailLine },
    { label: "User ID", value: user?._id, icon: RiFingerprint2Line },
    {
      label: "Type",
      value: user?.systemUser ? "System" : "Personal",
      icon: RiShieldCheckLine,
    },
    { label: "Joined", value: user?.createdAt, icon: RiCalendarLine },
  ];

  const accountData = [
    { label: "Status", value: account?.status, icon: RiCheckboxCircleLine },
    { label: "Account ID", value: account?._id, icon: RiBankLine },
    { label: "Currency", value: account?.currency || "INR", icon: RiCoinLine },
    { label: "Updated", value: account?.updatedAt, icon: RiTimeLine },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-5 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">More Options</h1>

      {/* USER */}
      <div className="bg-white/5 rounded-xl overflow-hidden">
        <p className="px-4 py-2 text-xs text-white/40">User Info</p>
        {userData.map((item, i) => (
          <Row key={i} {...item} />
        ))}
      </div>

      {/* ACCOUNT */}
      <div className="bg-white/5 rounded-xl overflow-hidden">
        <p className="px-4 py-2 text-xs text-white/40">Account</p>
        {accountData.map((item, i) => (
          <Row key={i} {...item} />
        ))}
      </div>

      {/* BALANCE */}
      {balance && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-amber-400/10 border border-amber-400/20 rounded-xl p-4">
            <p className="text-xs text-white/40">Available</p>
            <p className="text-lg font-bold text-amber-400">
              ₹{balance.balance}
            </p>
          </div>

          <div className="bg-emerald-400/10 border border-emerald-400/20 rounded-xl p-4">
            <p className="text-xs text-white/40">Credit</p>
            <p className="text-lg font-bold text-emerald-400">
              ₹{balance.totalCredit}
            </p>
          </div>

          <div className="bg-rose-400/10 border border-rose-400/20 rounded-xl p-4">
            <p className="text-xs text-white/40">Debit</p>
            <p className="text-lg font-bold text-rose-400">
              ₹{balance.totalDebit}
            </p>
          </div>
        </div>
      )}

      {/* LOGOUT */}
      <button
        onClick={logoutUser}
        className="w-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 py-3 rounded-xl flex items-center justify-center gap-2"
      >
        <RiLogoutBoxLine />
        Logout
      </button>
    </div>
  );
};

export default MoreOptions;
