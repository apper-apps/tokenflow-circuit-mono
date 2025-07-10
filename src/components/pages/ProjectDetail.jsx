import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import OptimizationToggle from "@/components/molecules/OptimizationToggle";
import MetricCard from "@/components/molecules/MetricCard";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { projectService } from "@/services/api/projectService";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProject = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await projectService.getById(parseInt(id));
      setProject(data);
    } catch (err) {
      setError("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProject();
  }, [id]);

  const handleOptimizationToggle = (setting, value) => {
    setProject(prev => ({
      ...prev,
      optimizationSettings: {
        ...prev.optimizationSettings,
        [setting]: value
      }
    }));
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProject} />;
  if (!project) return <Error message="Project not found" />;

  const metrics = [
    {
      title: "Today's Tokens",
      value: project.currentUsage.dailyTokens.toLocaleString(),
      change: "+8.2%",
      changeType: "increase",
      icon: "Zap"
    },
    {
      title: "Today's Cost",
      value: `$${project.currentUsage.dailyCost.toFixed(2)}`,
      change: "-12.5%",
      changeType: "decrease",
      icon: "DollarSign"
    },
    {
      title: "API Keys",
      value: project.apiKeys.length.toString(),
      icon: "Key"
    },
    {
      title: "Optimization Score",
      value: "87%",
      change: "+5%",
      changeType: "increase",
      icon: "TrendingUp"
    }
  ];

  return (
    <div className="space-y-8">
      <Header
        title={project.name}
        subtitle="Configure optimization settings and monitor token usage"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/workspace/${project.workspaceId}`} className="flex items-center text-slate-400 hover:text-white transition-colors">
            <ApperIcon name="ChevronLeft" className="h-4 w-4 mr-1" />
            Back to Workspace
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="success">Active</Badge>
          <Button variant="outline" size="sm">
            <ApperIcon name="Settings" className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Optimization Settings</h3>
                <p className="text-sm text-slate-400">Configure token optimization techniques</p>
              </div>
              <ApperIcon name="Zap" className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-4">
              <OptimizationToggle
                title="Prompt Caching"
                description="Cache frequently used prompts to reduce token usage"
                icon="Database"
                enabled={project.optimizationSettings.promptCaching}
                onToggle={(value) => handleOptimizationToggle("promptCaching", value)}
                savings="$42.18"
              />
              <OptimizationToggle
                title="Batch Processing"
                description="Process multiple requests together for efficiency"
                icon="Package"
                enabled={project.optimizationSettings.batchProcessing}
                onToggle={(value) => handleOptimizationToggle("batchProcessing", value)}
                savings="$18.76"
              />
              <OptimizationToggle
                title="Smart Routing"
                description="Automatically route to the most cost-effective model"
                icon="Route"
                enabled={project.optimizationSettings.routingStrategy === "cost"}
                onToggle={(value) => handleOptimizationToggle("routingStrategy", value ? "cost" : "standard")}
                savings="$31.44"
              />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Connected APIs</h3>
                <p className="text-sm text-slate-400">Manage your API key assignments</p>
              </div>
              <Button size="sm">
                <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                Add API
              </Button>
            </div>
            <div className="space-y-4">
              {project.apiKeys.map((apiKey, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                      <ApperIcon name="Key" className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white capitalize">{apiKey.provider}</p>
                      <p className="text-xs text-slate-400">•••••••••{apiKey.keyHash.slice(-8)}</p>
                    </div>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;