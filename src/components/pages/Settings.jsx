import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Switch from "@/components/atoms/Switch";
import Select from "@/components/atoms/Select";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      threshold: true,
      reports: true
    },
    optimization: {
      autoCaching: true,
      batchProcessing: false,
      smartRouting: true
    },
    billing: {
      currency: "USD",
      alertThreshold: 1000,
      monthlyBudget: 2000
    }
  });

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const settingSections = [
    {
      title: "Notifications",
      icon: "Bell",
      description: "Configure how you receive alerts and updates",
      settings: [
        { key: "email", label: "Email Notifications", type: "switch" },
        { key: "push", label: "Push Notifications", type: "switch" },
        { key: "threshold", label: "Usage Threshold Alerts", type: "switch" },
        { key: "reports", label: "Weekly Reports", type: "switch" }
      ]
    },
    {
      title: "Optimization",
      icon: "Zap",
      description: "Default optimization settings for new projects",
      settings: [
        { key: "autoCaching", label: "Auto-enable Prompt Caching", type: "switch" },
        { key: "batchProcessing", label: "Auto-enable Batch Processing", type: "switch" },
        { key: "smartRouting", label: "Smart Model Routing", type: "switch" }
      ]
    },
    {
      title: "Billing & Limits",
      icon: "CreditCard",
      description: "Manage your billing preferences and spending limits",
      settings: [
        { key: "currency", label: "Currency", type: "select", options: ["USD", "EUR", "GBP"] },
        { key: "alertThreshold", label: "Alert Threshold ($)", type: "number" },
        { key: "monthlyBudget", label: "Monthly Budget ($)", type: "number" }
      ]
    }
  ];

  const handleSave = () => {
    // Save settings
    console.log("Saving settings:", settings);
  };

  return (
    <div className="space-y-8">
      <Header
        title="Settings"
        subtitle="Configure your platform preferences and optimization defaults"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {settingSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                  <ApperIcon name={section.icon} className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                  <p className="text-sm text-slate-400">{section.description}</p>
                </div>
              </div>
              <div className="space-y-4">
                {section.settings.map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-slate-200">
                        {setting.label}
                      </label>
                    </div>
                    <div className="flex-shrink-0">
                      {setting.type === "switch" && (
                        <Switch
                          checked={settings[section.title.toLowerCase()][setting.key]}
                          onCheckedChange={(value) => 
                            handleSettingChange(section.title.toLowerCase(), setting.key, value)
                          }
                        />
                      )}
                      {setting.type === "select" && (
                        <Select
                          value={settings[section.title.toLowerCase()][setting.key]}
                          onChange={(e) => 
                            handleSettingChange(section.title.toLowerCase(), setting.key, e.target.value)
                          }
                          className="w-24"
                        >
                          {setting.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </Select>
                      )}
                      {setting.type === "number" && (
                        <input
                          type="number"
                          value={settings[section.title.toLowerCase()][setting.key]}
                          onChange={(e) => 
                            handleSettingChange(section.title.toLowerCase(), setting.key, parseInt(e.target.value))
                          }
                          className="w-24 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm text-white"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <ApperIcon name="Save" className="h-4 w-4" />
          <span>Save Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default Settings;