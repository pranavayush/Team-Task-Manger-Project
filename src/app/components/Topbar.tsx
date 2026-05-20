import { Bell, Search, Command } from "lucide-react";
import { UserAvatar } from "./Avatar";
import { useLocation } from "react-router";
import { motion } from "motion/react";

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/projects": "Projects",
  "/tasks": "Tasks",
  "/team": "Team",
  "/settings": "Settings",
};

export function Topbar() {
  const { pathname } = useLocation();
  const title = titles[pathname] ?? "Northwind";

  return (
    <header className="h-16 border-b border-[var(--border)] flex items-center px-4 md:px-8 gap-4 bg-[#0F1117]/60 backdrop-blur-xl sticky top-0 z-30">
      <motion.h1
        key={title}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-[18px] font-semibold tracking-tight"
      >
        {title}
      </motion.h1>
      <div className="flex-1" />
      <div className="hidden md:flex items-center gap-2 px-3 h-9 rounded-lg bg-[#1C2230] border border-white/5 text-[#8B93A7] text-[13px] w-72">
        <Search size={14} />
        <span className="flex-1">Search…</span>
        <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 flex items-center gap-0.5">
          <Command size={10} /> K
        </kbd>
      </div>
      <button className="relative w-9 h-9 grid place-items-center rounded-lg hover:bg-white/5 transition-colors" aria-label="Notifications">
        <Bell size={17} className="text-[#8B93A7]" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F43F5E] ring-2 ring-[#0F1117]" />
      </button>
      <div className="flex items-center gap-2.5 pl-3 border-l border-white/5">
        <UserAvatar id="u1" size={32} />
        <div className="hidden lg:block">
          <div className="text-[13px] font-medium leading-tight">Ada Lovelace</div>
          <div className="text-[11px] text-[#8B93A7] leading-tight">Admin</div>
        </div>
      </div>
    </header>
  );
}
