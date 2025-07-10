import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const NavItem = ({ to, icon, label, badge }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
          isActive
            ? "bg-primary/20 text-primary border border-primary/30"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
        )
      }
    >
      {({ isActive }) => (
        <motion.div
          className="flex items-center w-full"
          whileHover={{ x: 2 }}
          transition={{ duration: 0.2 }}
        >
          <ApperIcon
            name={icon}
            className={cn(
              "h-5 w-5 mr-3 transition-colors",
              isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-200"
            )}
          />
          <span className="flex-1">{label}</span>
          {badge && (
            <span className="ml-2 px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
              {badge}
            </span>
          )}
        </motion.div>
      )}
    </NavLink>
  );
};

export default NavItem;