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
  const [rotationLoading, setRotationLoading] = useState({});
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

  const handleToggleRotation = async (keyId, enabled) => {
    try {
      setRotationLoading(prev => ({ ...prev, [keyId]: true }));
      if (enabled) {
        await apiKeyService.enableRotation(keyId, { interval: 'weekly' });
        toast.success("API key rotation enabled");
      } else {
        await apiKeyService.disableRotation(keyId);
        toast.success("API key rotation disabled");
      }
      await loadApiKeys();
    } catch (err) {
      toast.error("Failed to update rotation settings");
    } finally {
      setRotationLoading(prev => ({ ...prev, [keyId]: false }));
    }
  };

  const handleManualRotation = async (keyId) => {
    try {
      setRotationLoading(prev => ({ ...prev, [keyId]: true }));
      await apiKeyService.rotateKeys(keyId);
      toast.success("API key rotated successfully");
      await loadApiKeys();
    } catch (err) {
      toast.error("Failed to rotate API key");
    } finally {
      setRotationLoading(prev => ({ ...prev, [keyId]: false }));
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
            <div className="flex items-center justify-between mb-4">
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
                    {apiKey.rotation?.enabled && (
                      <Badge variant="info">
                        <ApperIcon name="RotateCw" className="h-3 w-3 mr-1" />
                        Rotation
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">
                    •••••••••{apiKey.keyHash.slice(-8)} • {apiKey.projectIds.length} projects
                  </p>
                  <p className="text-xs text-slate-500">
                    Added {new Date(apiKey.addedAt).toLocaleDateString()}
                    {apiKey.rotation?.enabled && (
                      <span className="ml-2">• Next rotation: {new Date(apiKey.rotation.nextRotation).toLocaleDateString()}</span>
                    )}
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
            
            <div className="border-t border-slate-700 pt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="RotateCw" className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-white">Auto Rotation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleRotation(apiKey.Id, !apiKey.rotation?.enabled)}
                    disabled={rotationLoading[apiKey.Id]}
                  >
                    {rotationLoading[apiKey.Id] ? (
                      <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <ApperIcon name={apiKey.rotation?.enabled ? "ToggleRight" : "ToggleLeft"} className="h-4 w-4 mr-2" />
                    )}
                    {apiKey.rotation?.enabled ? "Disable" : "Enable"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleManualRotation(apiKey.Id)}
                    disabled={rotationLoading[apiKey.Id]}
                  >
                    {rotationLoading[apiKey.Id] ? (
                      <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
                    )}
                    Rotate Now
                  </Button>
                </div>
              </div>
              
              {apiKey.rotation?.enabled && (
                <div className="text-xs text-slate-400 bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span>Rotation Interval: {apiKey.rotation.interval}</span>
                    <span>Last rotated: {apiKey.rotation.lastRotated ? new Date(apiKey.rotation.lastRotated).toLocaleDateString() : 'Never'}</span>
                  </div>
                  {apiKey.rotation.history && apiKey.rotation.history.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-slate-700">
                      <span className="text-slate-500">Recent rotations: {apiKey.rotation.history.length}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ApiKeyManager;