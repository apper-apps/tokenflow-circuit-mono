import { motion } from "framer-motion";
import Switch from "@/components/atoms/Switch";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const OptimizationToggle = ({ 
  title, 
  description, 
  icon, 
  enabled, 
  onToggle, 
  savings,
  className 
}) => {
  return (
    <motion.div
      className={cn(
        "glass-effect rounded-lg p-4 transition-all duration-200",
        enabled && "ring-2 ring-primary/30",
        className
      )}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
            enabled ? "bg-primary/20 text-primary" : "bg-slate-700 text-slate-400"
          )}>
            <ApperIcon name={icon} className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-slate-200">{title}</h3>
            <p className="text-sm text-slate-400 mt-1">{description}</p>
            {savings && enabled && (
              <div className="flex items-center mt-2">
                <ApperIcon name="TrendingDown" className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400 font-medium">{savings} saved</span>
              </div>
            )}
          </div>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={onToggle}
        />
      </div>
    </motion.div>
  );
};

export default OptimizationToggle;