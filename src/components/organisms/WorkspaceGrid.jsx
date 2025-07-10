import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { workspaceService } from "@/services/api/workspaceService";

const WorkspaceGrid = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadWorkspaces = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await workspaceService.getAll();
      setWorkspaces(data);
    } catch (err) {
      setError("Failed to load workspaces");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkspaces();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadWorkspaces} />;
  if (workspaces.length === 0) return <Empty />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workspaces.map((workspace, index) => (
        <motion.div
          key={workspace.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
        >
          <Link to={`/workspace/${workspace.Id}`}>
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Layers3" className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{workspace.name}</h3>
                    <p className="text-sm text-slate-400">{workspace.description}</p>
                  </div>
                </div>
                <Badge variant="info">{workspace.projectCount} projects</Badge>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Created {new Date(workspace.createdAt).toLocaleDateString()}</span>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="TrendingUp" className="h-4 w-4" />
                  <span>Active</span>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default WorkspaceGrid;