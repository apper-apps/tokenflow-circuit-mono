import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { apiKeyService } from "@/services/api/apiKeyService";

const ApiKeyManager = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadApiKeys = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiKeyService.getAll();
      setApiKeys(data);
    } catch (err) {
      setError("Failed to load API keys");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApiKeys();
  }, []);

  const handleDeleteKey = async (keyId) => {
    try {
      await apiKeyService.delete(keyId);
      setApiKeys(apiKeys.filter(key => key.Id !== keyId));
      toast.success("API key deleted successfully");
    } catch (err) {
      toast.error("Failed to delete API key");
    }
  };

const getProviderIcon = (provider) => {
    const icons = {
      openai: "Brain",
      anthropic: "MessageSquare",
      google: "Search",
      cohere: "Cpu",
      grok: "Zap",
      llama: "Bot",
      perplexity: "Globe"
    };
    return icons[provider.toLowerCase()] || "Key";
  };

const getProviderColor = (provider) => {
    const colors = {
      openai: "success",
      anthropic: "warning",
      google: "info",
      cohere: "default",
      grok: "info",
      llama: "success",
      perplexity: "warning"
    };
    return colors[provider.toLowerCase()] || "default";
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadApiKeys} />;
  if (apiKeys.length === 0) return <Empty />;

  return (
    <div className="space-y-4">
      {apiKeys.map((apiKey, index) => (
        <motion.div
          key={apiKey.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name={getProviderIcon(apiKey.provider)} className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-white capitalize">{apiKey.provider}</h3>
                    <Badge variant={getProviderColor(apiKey.provider)}>
                      {apiKey.provider.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400">
                    •••••••••{apiKey.keyHash.slice(-8)} • {apiKey.projectIds.length} projects
                  </p>
                  <p className="text-xs text-slate-500">
                    Added {new Date(apiKey.addedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ApperIcon name="Edit" className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteKey(apiKey.Id)}
                >
                  <ApperIcon name="Trash2" className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ApiKeyManager;