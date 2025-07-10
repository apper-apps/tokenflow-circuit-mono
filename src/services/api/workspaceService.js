import mockWorkspaces from "@/services/mockData/workspaces.json";

let workspaces = [...mockWorkspaces];

export const workspaceService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...workspaces];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const workspace = workspaces.find(w => w.Id === id);
    if (!workspace) {
      throw new Error("Workspace not found");
    }
    return { ...workspace };
  },

  async create(workspaceData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newWorkspace = {
      ...workspaceData,
      Id: Math.max(...workspaces.map(w => w.Id)) + 1,
      createdAt: new Date().toISOString(),
      projectCount: 0
    };
    workspaces.push(newWorkspace);
    return { ...newWorkspace };
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = workspaces.findIndex(w => w.Id === id);
    if (index === -1) {
      throw new Error("Workspace not found");
    }
    workspaces[index] = { ...workspaces[index], ...updates };
    return { ...workspaces[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = workspaces.findIndex(w => w.Id === id);
    if (index === -1) {
      throw new Error("Workspace not found");
    }
    workspaces.splice(index, 1);
    return true;
  }
};