/**
 * Project repository service managing monitored domains and test targets.
 */

const mockProjects = [
  {
    id: 'prj_1',
    name: 'E-Commerce Platform',
    website: 'https://shop.example.com',
    environment: 'Production',
    healthScore: 92,
    successRate: 94.6,
    lastTested: '12 minutes ago',
    activeMonitors: 6,
    testsCount: 42,
  },
  {
    id: 'prj_2',
    name: 'Core SaaS Dashboard',
    website: 'https://app.example.com',
    environment: 'Staging',
    healthScore: 98,
    successRate: 99.1,
    lastTested: '1 hour ago',
    activeMonitors: 8,
    testsCount: 68,
  },
  {
    id: 'prj_3',
    name: 'Customer Authentication API',
    website: 'https://api.example.com',
    environment: 'Production',
    healthScore: 78,
    successRate: 82.4,
    lastTested: '3 hours ago',
    activeMonitors: 4,
    testsCount: 24,
  },
];

export const projectService = {
  async getProjects() {
    await new Promise((r) => setTimeout(r, 200));
    return [...mockProjects];
  },

  async getProjectById(id) {
    await new Promise((r) => setTimeout(r, 200));
    return mockProjects.find((p) => p.id === id) || mockProjects[0];
  },

  async createProject(project) {
    await new Promise((r) => setTimeout(r, 400));
    const newPrj = {
      id: 'prj_' + Math.random().toString(36).substring(2, 7),
      name: project.name,
      website: project.website,
      environment: project.environment || 'Production',
      healthScore: 95,
      successRate: 100,
      lastTested: 'Just now',
      activeMonitors: 3,
      testsCount: 12,
    };
    mockProjects.unshift(newPrj);
    return newPrj;
  },
};
