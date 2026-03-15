import React from "react";

const QuickInfo = ({ label, value, icon: Icon, color, bg }) => {

  return (
      <div className="bg-white/3 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 ${bg} rounded-xl grid place-items-center`}>
            <Icon size={18} className={color} />
          </div>
        </div>
        <p className="text-white/40 text-xs uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
  );
};

export default QuickInfo;
