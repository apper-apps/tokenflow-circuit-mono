import { motion } from "framer-motion";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const Header = ({ title, subtitle, onSearch }) => {
  return (
    <div className="glass-effect rounded-xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-2"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <SearchBar
            placeholder="Search..."
            onSearch={onSearch}
            className="w-64"
          />
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors">
              <ApperIcon name="Bell" className="h-5 w-5 text-slate-300" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="h-5 w-5 text-white" />
              </div>
              <Badge variant="success">Admin</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;