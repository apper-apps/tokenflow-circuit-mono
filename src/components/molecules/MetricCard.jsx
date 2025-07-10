import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const MetricCard = ({ title, value, change, changeType, icon, className }) => {
  const changeColor = changeType === "increase" ? "text-green-400" : "text-red-400";
  const changeIcon = changeType === "increase" ? "TrendingUp" : "TrendingDown";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn("relative overflow-hidden", className)}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <p className="text-2xl font-bold text-white number-counter mt-1">{value}</p>
            {change && (
              <div className={cn("flex items-center mt-2", changeColor)}>
                <ApperIcon name={changeIcon} className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{change}</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <ApperIcon name={icon} className="h-6 w-6 text-primary" />
              </div>
            </div>
          )}
        </div>
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-8 translate-x-8" />
      </Card>
    </motion.div>
  );
};

export default MetricCard;