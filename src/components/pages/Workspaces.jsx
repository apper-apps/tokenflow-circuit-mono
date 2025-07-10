import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import WorkspaceGrid from "@/components/organisms/WorkspaceGrid";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Workspaces = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreateWorkspace = () => {
    // Handle workspace creation
    console.log("Creating new workspace...");
  };

  return (
    <div className="space-y-8">
      <Header
        title="Workspaces"
        subtitle="Organize your AI projects into logical workspaces for better management"
        onSearch={setSearchTerm}
      />

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-white">All Workspaces</h2>
          <span className="text-sm text-slate-400">Manage your project collections</span>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={handleCreateWorkspace} className="flex items-center space-x-2">
            <ApperIcon name="Plus" className="h-4 w-4" />
            <span>Create Workspace</span>
          </Button>
        </motion.div>
      </div>

      <WorkspaceGrid />
    </div>
  );
};

export default Workspaces;