import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import ApiKeyManager from "@/components/organisms/ApiKeyManager";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const ApiKeys = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddApiKey = () => {
    // Handle API key addition
    console.log("Adding new API key...");
  };

const providers = [
    { name: "OpenAI", icon: "Brain", description: "GPT-3.5, GPT-4, and more", color: "success" },
    { name: "Anthropic", icon: "MessageSquare", description: "Claude AI models", color: "warning" },
    { name: "Google", icon: "Search", description: "Gemini and PaLM models", color: "info" },
    { name: "Cohere", icon: "Cpu", description: "Command and Embed models", color: "default" },
    { name: "Grok", icon: "Zap", description: "X AI's conversational AI", color: "info" },
    { name: "LLAMA", icon: "Bot", description: "Meta's large language models", color: "success" },
    { name: "Perplexity", icon: "Globe", description: "AI-powered search and answers", color: "warning" }
  ];

  return (
    <div className="space-y-8">
      <Header
        title="API Keys"
        subtitle="Manage your AI provider API keys and configure secure access"
        onSearch={setSearchTerm}
      />

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-white">Your API Keys</h2>
          <span className="text-sm text-slate-400">Securely stored and encrypted</span>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={handleAddApiKey} className="flex items-center space-x-2">
            <ApperIcon name="Plus" className="h-4 w-4" />
            <span>Add API Key</span>
          </Button>
        </motion.div>
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {providers.map((provider, index) => (
          <motion.div
            key={provider.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name={provider.icon} className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{provider.name}</h3>
                  <p className="text-sm text-slate-400">{provider.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <ApiKeyManager />
    </div>
  );
};

export default ApiKeys;