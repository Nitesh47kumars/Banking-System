import {
    RiExchangeLine,
    RiAddCircleLine,
    RiMoreLine,
  } from "react-icons/ri";
  
  const QuickActions = ({ onTransaction="asd", onCreateAccount="asd", onMore="asd" }) => {
    const actions = [
      {
        icon: RiExchangeLine,
        label: "Transaction",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        action: onTransaction,
      },
      {
        icon: RiAddCircleLine,
        label: "Create Account",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        action: onCreateAccount,
      },
      {
        icon: RiMoreLine,
        label: "More Options",
        color: "text-violet-400",
        bg: "bg-violet-400/10",
        action: onMore,
      },
    ];
  
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {actions.map(({ icon: Icon, label, color, bg, action }) => (
          <button
            key={label}
            onClick={action}
            className="bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 rounded-2xl p-4 flex flex-col items-center gap-2.5 transition-colors group"
          >
            <div className={`w-10 h-10 ${bg} rounded-xl grid place-items-center`}>
              <Icon size={18} className={color} />
            </div>
  
            <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors">
              {label}
            </span>
          </button>
        ))}
      </div>
    );
  };
  
  export default QuickActions;