import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const generateStars = (count = 150) => {
  return Array.from({ length: count }, () => {
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const size = Math.random() * 1.5 + 0.5;
    const opacity = Math.random() * 0.6 + 0.4;
    const duration = 3 + Math.random() * 3;
    const delay = Math.random() * 5;

    return { top, left, size, opacity, duration, delay };
  });
};

const ErrorPage = () => {
  const stars = useMemo(() => generateStars(150), []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] overflow-hidden text-white flex items-center justify-center">
      {/* ⭐ Stars */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-float"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 🌌 Content */}
      <div className="z-10 text-center px-6">
        <h1 className="text-7xl font-extrabold text-amber-400 mb-4 animate-pulse">
          404
        </h1>
        <p className="text-lg font-semibold mb-2">Error - Page Not Found</p>
        <p className="text-white/40 mb-6">
          The page you’re looking for doesn’t exist.
        </p>

        <Link
          to="/"
          className="bg-amber-400 text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Go Home
        </Link>
      </div>

      <style>
        {`
          @keyframes float {
            0% {
              transform: translate(0, 0);
              opacity: 0.4;
            }
            50% {
              transform: translate(10px, -20px);
              opacity: 1;
            }
            100% {
              transform: translate(0, 0);
              opacity: 0.4;
            }
          }

          .animate-float {
            animation-name: float;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default ErrorPage;
