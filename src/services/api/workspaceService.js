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
  },

  // API Endpoints compatible with OpenRouter structure
  createApiEndpoints() {
    return {
      async handleGetWorkspaces(req, res) {
        try {
          const workspaces = await workspaceService.getAll();
          res.status(200).json({
            object: "list",
            data: workspaces,
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

      async handleGetWorkspace(req, res) {
        try {
          const id = parseInt(req.params.id);
          if (isNaN(id)) {
            return res.status(400).json({
              error: {
                message: "Invalid workspace ID",
                type: "invalid_request_error"
              }
            });
          }
          
          const workspace = await workspaceService.getById(id);
          res.status(200).json(workspace);
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

      async handleCreateWorkspace(req, res) {
        try {
          const workspace = await workspaceService.create(req.body);
          res.status(201).json(workspace);
        } catch (error) {
          res.status(500).json({
            error: {
              message: error.message,
              type: "internal_error"
            }
          });
        }
      },

      async handleUpdateWorkspace(req, res) {
        try {
          const id = parseInt(req.params.id);
          if (isNaN(id)) {
            return res.status(400).json({
              error: {
                message: "Invalid workspace ID",
                type: "invalid_request_error"
              }
            });
          }
          
          const workspace = await workspaceService.update(id, req.body);
          res.status(200).json(workspace);
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

      async handleDeleteWorkspace(req, res) {
        try {
          const id = parseInt(req.params.id);
          if (isNaN(id)) {
            return res.status(400).json({
              error: {
                message: "Invalid workspace ID",
                type: "invalid_request_error"
              }
            });
          }
          
          await workspaceService.delete(id);
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
      }
    };
  }
};