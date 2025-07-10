import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { projectService } from "@/services/api/projectService";

const ProjectList = ({ workspaceId }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await projectService.getByWorkspace(workspaceId);
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (workspaceId) {
      loadProjects();
    }
  }, [workspaceId]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProjects} />;
  if (projects.length === 0) return <Empty />;

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.Id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link to={`/project/${project.Id}`}>
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Bot" className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{project.name}</h3>
                    <p className="text-sm text-slate-400">
                      {project.apiKeys.length} API keys • {project.currentUsage.dailyTokens.toLocaleString()} tokens today
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="success">${project.currentUsage.dailyCost.toFixed(2)}</Badge>
                  <Badge variant={project.optimizationSettings.promptCaching ? "success" : "default"}>
                    {project.optimizationSettings.promptCaching ? "Optimized" : "Standard"}
                  </Badge>
                  <ApperIcon name="ChevronRight" className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectList;