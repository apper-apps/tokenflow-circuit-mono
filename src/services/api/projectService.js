import mockProjects from "@/services/mockData/projects.json";

let projects = [...mockProjects];

export const projectService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...projects];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const project = projects.find(p => p.Id === id);
    if (!project) {
      throw new Error("Project not found");
    }
    return { ...project };
  },

  async getByWorkspace(workspaceId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return projects.filter(p => p.workspaceId === workspaceId);
  },

  async create(projectData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newProject = {
      ...projectData,
      Id: Math.max(...projects.map(p => p.Id)) + 1,
      createdAt: new Date().toISOString(),
      currentUsage: {
        dailyTokens: 0,
        dailyCost: 0,
        monthlyTokens: 0,
        monthlyCost: 0
      }
    };
    projects.push(newProject);
    return { ...newProject };
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = projects.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Project not found");
    }
    projects[index] = { ...projects[index], ...updates };
    return { ...projects[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = projects.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Project not found");
    }
    projects.splice(index, 1);
    return true;
  }
};