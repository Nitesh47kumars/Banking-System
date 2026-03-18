import React from "react";

const Shimmer = ({ className }) => (
  <div className={`animate-pulse rounded-xl bg-white/5 ${className}`} />
);

const DashboardSkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Shimmer key={i} className="h-30" />
        ))}
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Shimmer className="h-120" />
        </div>
        <Shimmer className="h-120" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Shimmer key={i} className="h-30" />
        ))}
      </div>
    </>
  );
};

export default DashboardSkeleton;
