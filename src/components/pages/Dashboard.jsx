import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import MetricCard from "@/components/molecules/MetricCard";
import TokenUsageChart from "@/components/organisms/TokenUsageChart";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const Dashboard = () => {
  const metrics = [
    {
      title: "Total Tokens Used",
      value: "2.4M",
      change: "+12.5%",
      changeType: "increase",
      icon: "Zap"
    },
    {
      title: "Monthly Cost",
      value: "$847.32",
      change: "-8.3%",
      changeType: "decrease",
      icon: "DollarSign"
    },
    {
      title: "Active Projects",
      value: "23",
      change: "+3",
      changeType: "increase",
      icon: "Bot"
    },
    {
      title: "Optimization Savings",
      value: "$234.18",
      change: "+18.7%",
      changeType: "increase",
      icon: "TrendingDown"
    }
  ];

  const recentActivity = [
    { action: "Project 'ChatBot Pro' created", time: "2 hours ago", type: "create" },
    { action: "API key for OpenAI updated", time: "4 hours ago", type: "update" },
    { action: "Optimization settings enabled", time: "6 hours ago", type: "optimize" },
    { action: "Monthly usage threshold reached", time: "1 day ago", type: "alert" }
  ];

  const getActivityIcon = (type) => {
    const icons = {
      create: "Plus",
      update: "Edit",
      optimize: "Zap",
      alert: "AlertTriangle"
    };
    return icons[type] || "Activity";
  };

  const getActivityColor = (type) => {
    const colors = {
      create: "success",
      update: "info",
      optimize: "warning",
      alert: "error"
    };
    return colors[type] || "default";
  };

  return (
    <div className="space-y-8">
      <Header
        title="Dashboard"
        subtitle="Monitor your AI token usage and optimize costs across all projects"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TokenUsageChart />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                <p className="text-sm text-slate-400">Latest updates from your projects</p>
              </div>
              <ApperIcon name="Clock" className="h-5 w-5 text-slate-400" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                      <ApperIcon name={getActivityIcon(activity.type)} className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200">{activity.action}</p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                  <Badge variant={getActivityColor(activity.type)} className="text-xs">
                    {activity.type}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;