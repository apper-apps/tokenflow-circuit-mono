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
  },

  async enableRotation(id, rotationConfig) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = apiKeys.findIndex(k => k.Id === id);
    if (index === -1) {
      throw new Error("API key not found");
    }
    
    const nextRotation = new Date();
    switch (rotationConfig.interval) {
      case 'daily':
        nextRotation.setDate(nextRotation.getDate() + 1);
        break;
      case 'weekly':
        nextRotation.setDate(nextRotation.getDate() + 7);
        break;
      case 'monthly':
        nextRotation.setMonth(nextRotation.getMonth() + 1);
        break;
      default:
        nextRotation.setDate(nextRotation.getDate() + 7);
    }
    
    apiKeys[index].rotation = {
      enabled: true,
      interval: rotationConfig.interval || 'weekly',
      nextRotation: nextRotation.toISOString(),
      lastRotated: null,
      history: []
    };
    
    return { ...apiKeys[index] };
  },

  async disableRotation(id) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = apiKeys.findIndex(k => k.Id === id);
    if (index === -1) {
      throw new Error("API key not found");
    }
    
    apiKeys[index].rotation = {
      ...apiKeys[index].rotation,
      enabled: false
    };
    
    return { ...apiKeys[index] };
  },

  async rotateKeys(id) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = apiKeys.findIndex(k => k.Id === id);
    if (index === -1) {
      throw new Error("API key not found");
    }
    
    const now = new Date().toISOString();
    const newKeyHash = `hash_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const oldKeyHash = apiKeys[index].keyHash;
    
    // Update the key hash
    apiKeys[index].keyHash = newKeyHash;
    
    // Update rotation history
    if (!apiKeys[index].rotation) {
      apiKeys[index].rotation = {
        enabled: false,
        interval: 'weekly',
        history: []
      };
    }
    
    apiKeys[index].rotation.lastRotated = now;
    
    if (!apiKeys[index].rotation.history) {
      apiKeys[index].rotation.history = [];
    }
    
    apiKeys[index].rotation.history.unshift({
      rotatedAt: now,
      oldKeyHash: oldKeyHash,
      newKeyHash: newKeyHash,
      trigger: 'manual'
    });
    
    // Keep only last 10 history entries
    if (apiKeys[index].rotation.history.length > 10) {
      apiKeys[index].rotation.history = apiKeys[index].rotation.history.slice(0, 10);
    }
    
    // Update next rotation if auto-rotation is enabled
    if (apiKeys[index].rotation.enabled) {
      const nextRotation = new Date();
      switch (apiKeys[index].rotation.interval) {
        case 'daily':
          nextRotation.setDate(nextRotation.getDate() + 1);
          break;
        case 'weekly':
          nextRotation.setDate(nextRotation.getDate() + 7);
          break;
        case 'monthly':
          nextRotation.setMonth(nextRotation.getMonth() + 1);
          break;
        default:
          nextRotation.setDate(nextRotation.getDate() + 7);
      }
      apiKeys[index].rotation.nextRotation = nextRotation.toISOString();
    }
    
    return { ...apiKeys[index] };
  }
};