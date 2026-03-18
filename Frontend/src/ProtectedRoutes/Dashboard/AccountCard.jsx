import { useSelector } from "react-redux";
import {
  RiShieldCheckLine,
  RiUserLine,
  RiMailLine,
  RiIdCardLine,
  RiCalendarLine,
} from "react-icons/ri";

const AccountCard = ({ user }) => {
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const joinDate = new Date(user.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white/3 border border-white/5 rounded-2xl p-6 flex flex-col gap-6 backdrop-blur-md hover:border-white/10 transition">
      {/* Title */}
      <h2 className="font-semibold text-white text-sm tracking-wide">
        Account Details
      </h2>

      {/* Avatar Section */}
      <div className="flex flex-col items-center gap-3 py-1">
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-amber-400/20 to-amber-500/10 text-amber-400 text-lg font-bold grid place-items-center shadow-inner">
          {initials}
        </div>

        <div className="text-center">
          <p className="font-semibold text-white">{user.name}</p>

          <span className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
            <RiShieldCheckLine size={11} />
            Verified
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-4 border-t border-white/5 pt-5">
        {[
          { icon: RiUserLine, label: "Full Name", value: user.name },
          { icon: RiMailLine, label: "Email", value: user.email },
          {
            icon: RiIdCardLine,
            label: "Account ID",
            value: user?.accountId?.toUpperCase() || "You Don't Account Yet!",
            mono: true,
          },
          {
            icon: RiCalendarLine,
            label: "Member Since",
            value: joinDate,
          },
        ].map(({ icon: Icon, label, value, mono }) => (
          <div key={label} className="flex items-start gap-3 group">
            {/* Icon */}
            <div className="w-8 h-8 bg-white/5 rounded-lg grid place-items-center shrink-0 group-hover:bg-white/10 transition">
              <Icon size={14} className="text-white/40" />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p className="text-xs text-white/30 group-hover:text-white/40 transition mb-0.5">
                {label}
              </p>
              <p
                className={`text-sm text-white/80 truncate ${
                  mono ? "font-mono tracking-wide" : "font-medium"
                }`}
              >
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountCard;
