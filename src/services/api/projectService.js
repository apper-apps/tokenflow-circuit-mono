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
  },

  // API Endpoints compatible with OpenRouter structure
  createApiEndpoints() {
    return {
      async handleGetProjects(req, res) {
        try {
          const projects = await projectService.getAll();
          res.status(200).json({
            object: "list",
            data: projects,
            has_more: false
          });
        } catch (error) {
          res.status(500).json({
            error: {
              message: error.message,
              type: "internal_error"
            }
          });
        }
      },

      async handleGetProject(req, res) {
        try {
          const id = parseInt(req.params.id);
          if (isNaN(id)) {
            return res.status(400).json({
              error: {
                message: "Invalid project ID",
                type: "invalid_request_error"
              }
            });
          }
          
          const project = await projectService.getById(id);
          res.status(200).json(project);
        } catch (error) {
          const status = error.message.includes("not found") ? 404 : 500;
          res.status(status).json({
            error: {
              message: error.message,
              type: status === 404 ? "not_found_error" : "internal_error"
            }
          });
        }
      },

      async handleCreateProject(req, res) {
        try {
          const project = await projectService.create(req.body);
          res.status(201).json(project);
        } catch (error) {
          res.status(500).json({
            error: {
              message: error.message,
              type: "internal_error"
            }
          });
        }
      },

      async handleUpdateProject(req, res) {
        try {
          const id = parseInt(req.params.id);
          if (isNaN(id)) {
            return res.status(400).json({
              error: {
                message: "Invalid project ID",
                type: "invalid_request_error"
              }
            });
          }
          
          const project = await projectService.update(id, req.body);
          res.status(200).json(project);
        } catch (error) {
          const status = error.message.includes("not found") ? 404 : 500;
          res.status(status).json({
            error: {
              message: error.message,
              type: status === 404 ? "not_found_error" : "internal_error"
            }
          });
        }
      },

      async handleDeleteProject(req, res) {
        try {
          const id = parseInt(req.params.id);
          if (isNaN(id)) {
            return res.status(400).json({
              error: {
                message: "Invalid project ID",
                type: "invalid_request_error"
              }
            });
          }
          
          await projectService.delete(id);
          res.status(204).send();
        } catch (error) {
          const status = error.message.includes("not found") ? 404 : 500;
          res.status(status).json({
            error: {
              message: error.message,
              type: status === 404 ? "not_found_error" : "internal_error"
            }
          });
        }
      },

      async handleGetProjectsByWorkspace(req, res) {
        try {
          const workspaceId = parseInt(req.params.workspaceId);
          if (isNaN(workspaceId)) {
            return res.status(400).json({
              error: {
                message: "Invalid workspace ID",
                type: "invalid_request_error"
              }
            });
          }
          
          const projects = await projectService.getByWorkspace(workspaceId);
          res.status(200).json({
            object: "list",
            data: projects,
            has_more: false
          });
        } catch (error) {
          res.status(500).json({
            error: {
              message: error.message,
              type: "internal_error"
            }
          });
}
      }
    };
  }
};