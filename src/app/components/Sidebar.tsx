import { NavLink } from "react-router";
import { motion } from "motion/react";
import { LayoutDashboard, FolderKanban, CheckSquare, Users, Settings, ChevronLeft, Sparkles } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/projects", icon: FolderKanban, label: "Projects" },
  { to: "/tasks", icon: CheckSquare, label: "Tasks" },
  { to: "/team", icon: Users, label: "Team" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const width = collapsed ? 76 : 248;

  return (
    <motion.aside
      animate={{ width }}
      transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
      className="hidden md:flex flex-col border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] shrink-0"
    >
      <div className="h-16 flex items-center px-4 gap-3 border-b border-[var(--sidebar-border)]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#10B981] grid place-items-center shadow-lg shadow-violet-500/20">
          <Sparkles size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-semibold tracking-tight">Northwind</div>
            <div className="text-[11px] text-[#8B93A7]">Workspace</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#8B93A7] hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft size={16} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200 relative ${
                isActive
                  ? "bg-white/5 text-white"
                  : "text-[#8B93A7] hover:text-white hover:bg-white/[0.03]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#10B981]"
                    transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  />
                )}
                <item.icon size={18} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="m-3 p-4 rounded-xl glass">
          <div className="text-[13px] font-medium mb-1">Upgrade to Pro</div>
          <div className="text-[11px] text-[#8B93A7] leading-relaxed mb-3">Unlimited projects, advanced insights, and priority support.</div>
          <button className="w-full text-[12px] font-medium rounded-lg py-2 bg-gradient-to-r from-[#7C3AED] to-[#10B981] hover:opacity-90 transition-opacity">
            Upgrade
          </button>
        </div>
      )}
    </motion.aside>
  );
}
