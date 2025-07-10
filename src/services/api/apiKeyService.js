import mockApiKeys from "@/services/mockData/apiKeys.json";

let apiKeys = [...mockApiKeys];

export const apiKeyService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...apiKeys];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const apiKey = apiKeys.find(k => k.Id === id);
    if (!apiKey) {
      throw new Error("API key not found");
    }
    return { ...apiKey };
  },

  async create(apiKeyData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newApiKey = {
      ...apiKeyData,
      Id: Math.max(...apiKeys.map(k => k.Id)) + 1,
      addedAt: new Date().toISOString(),
      keyHash: `hash_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    apiKeys.push(newApiKey);
    return { ...newApiKey };
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = apiKeys.findIndex(k => k.Id === id);
    if (index === -1) {
      throw new Error("API key not found");
    }
    apiKeys[index] = { ...apiKeys[index], ...updates };
    return { ...apiKeys[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = apiKeys.findIndex(k => k.Id === id);
    if (index === -1) {
      throw new Error("API key not found");
    }
    apiKeys.splice(index, 1);
    return true;
  }
};