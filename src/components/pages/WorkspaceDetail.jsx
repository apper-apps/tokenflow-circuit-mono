import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import ProjectList from "@/components/organisms/ProjectList";
import MetricCard from "@/components/molecules/MetricCard";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { workspaceService } from "@/services/api/workspaceService";

const WorkspaceDetail = () => {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWorkspace = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await workspaceService.getById(parseInt(id));
      setWorkspace(data);
    } catch (err) {
      setError("Failed to load workspace");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkspace();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadWorkspace} />;
  if (!workspace) return <Error message="Workspace not found" />;

  const metrics = [
    {
      title: "Total Projects",
      value: workspace.projectCount.toString(),
      icon: "Bot"
    },
    {
      title: "Monthly Tokens",
      value: "1.2M",
      change: "+15.3%",
      changeType: "increase",
      icon: "Zap"
    },
    {
      title: "Monthly Cost",
      value: "$342.18",
      change: "-5.2%",
      changeType: "decrease",
      icon: "DollarSign"
    },
    {
      title: "Active APIs",
      value: "8",
      icon: "Key"
    }
  ];

  return (
    <div className="space-y-8">
      <Header
        title={workspace.name}
        subtitle={workspace.description}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/workspaces" className="flex items-center text-slate-400 hover:text-white transition-colors">
            <ApperIcon name="ChevronLeft" className="h-4 w-4 mr-1" />
            Back to Workspaces
          </Link>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="flex items-center space-x-2">
            <ApperIcon name="Plus" className="h-4 w-4" />
            <span>Create Project</span>
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Projects</h2>
        <ProjectList workspaceId={parseInt(id)} />
      </div>
    </div>
  );
};

export default WorkspaceDetail;