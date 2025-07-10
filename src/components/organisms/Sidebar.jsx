import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NavItem from "@/components/molecules/NavItem";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ className }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/", icon: "BarChart3" },
    { name: "Workspaces", href: "/workspaces", icon: "Layers3" },
    { name: "API Keys", href: "/api-keys", icon: "Key" },
    { name: "Analytics", href: "/analytics", icon: "TrendingUp" },
    { name: "Settings", href: "/settings", icon: "Settings" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-surface border border-slate-600 text-slate-200"
      >
        <ApperIcon name={isMobileOpen ? "X" : "Menu"} className="h-6 w-6" />
      </button>

      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:bg-surface lg:border-r lg:border-slate-700",
        className
      )}>
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex items-center h-16 px-6 border-b border-slate-700">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold gradient-text">TokenFlow</span>
            </div>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <NavItem
                key={item.name}
                to={item.href}
                icon={item.icon}
                label={item.name}
              />
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/50"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-slate-700"
            >
              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex items-center h-16 px-6 border-b border-slate-700">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <ApperIcon name="Zap" className="h-5 w-5 text-white" />
                    </div>
                    <span className="ml-3 text-xl font-bold gradient-text">TokenFlow</span>
                  </div>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                  {navigation.map((item) => (
                    <NavItem
                      key={item.name}
                      to={item.href}
                      icon={item.icon}
                      label={item.name}
                    />
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;