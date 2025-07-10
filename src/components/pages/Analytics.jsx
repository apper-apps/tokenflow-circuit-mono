import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import TokenUsageChart from "@/components/organisms/TokenUsageChart";
import MetricCard from "@/components/molecules/MetricCard";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedProject, setSelectedProject] = useState("all");

  const metrics = [
    {
      title: "Total Savings",
      value: "$1,234.56",
      change: "+23.5%",
      changeType: "increase",
      icon: "TrendingDown"
    },
    {
      title: "Avg. Cost per Token",
      value: "$0.000045",
      change: "-15.2%",
      changeType: "decrease",
      icon: "DollarSign"
    },
    {
      title: "Optimization Rate",
      value: "87.3%",
      change: "+12.8%",
      changeType: "increase",
      icon: "Zap"
    },
    {
      title: "Peak Usage Hour",
      value: "2-3 PM",
      icon: "Clock"
    }
  ];

  const topProjects = [
    { name: "ChatBot Pro", tokens: 450000, cost: 125.67, savings: 45.23 },
    { name: "Content Assistant", tokens: 320000, cost: 89.45, savings: 32.18 },
    { name: "Code Helper", tokens: 280000, cost: 78.23, savings: 28.94 },
    { name: "Email Generator", tokens: 195000, cost: 54.32, savings: 19.87 }
  ];

  return (
    <div className="space-y-8">
      <Header
        title="Analytics"
        subtitle="Deep insights into your token usage patterns and optimization performance"
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-white">Usage Analytics</h2>
          <span className="text-sm text-slate-400">Track performance and costs</span>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
            <option value="all">All Projects</option>
            <option value="chatbot">ChatBot Pro</option>
            <option value="content">Content Assistant</option>
            <option value="code">Code Helper</option>
          </Select>
          <div className="flex space-x-2">
            {["7d", "30d", "90d"].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "primary" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </div>

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
                <h3 className="text-lg font-semibold text-white">Top Projects</h3>
                <p className="text-sm text-slate-400">Highest token usage and savings</p>
              </div>
              <ApperIcon name="BarChart3" className="h-5 w-5 text-slate-400" />
            </div>
            <div className="space-y-4">
              {topProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                      <ApperIcon name="Bot" className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{project.name}</p>
                      <p className="text-xs text-slate-400">{project.tokens.toLocaleString()} tokens</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">${project.cost.toFixed(2)}</p>
                    <p className="text-xs text-green-400">-${project.savings.toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;