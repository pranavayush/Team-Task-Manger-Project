import { Link } from "react-router";
import { motion } from "motion/react";

export function NotFound() {
  return (
    <div className="min-h-[70vh] grid place-items-center text-center px-6">
      <div>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
          <svg width="200" height="160" viewBox="0 0 200 160" className="mx-auto" fill="none">
            <defs>
              <linearGradient id="g404" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="80" r="62" fill="url(#g404)" opacity="0.12" />
            <circle cx="100" cy="80" r="44" fill="url(#g404)" opacity="0.18" />
            <text x="100" y="92" textAnchor="middle" fontSize="42" fontWeight="700" fill="url(#g404)">404</text>
          </svg>
        </motion.div>
        <h1 className="mt-6 text-[24px] font-semibold tracking-tight">Lost in the workspace</h1>
        <p className="mt-2 text-[13px] text-[#8B93A7] max-w-sm mx-auto leading-relaxed">The page you're looking for doesn't exist, or it was moved when we tidied up the project structure.</p>
        <Link to="/" className="inline-block mt-6 px-4 py-2.5 rounded-lg text-[13px] font-medium bg-gradient-to-r from-[#7C3AED] to-[#10B981] hover:opacity-90 transition-opacity">
          Take me home
        </Link>
      </div>
    </div>
  );
}
