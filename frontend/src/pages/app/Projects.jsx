import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Plus, Search, ExternalLink, ArrowRight, Activity } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { HealthScore } from '../../components/testing/HealthScore';
import { projectService } from '../../services/projectService';

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [createModal, setCreateModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const data = await projectService.getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (newName && newUrl) {
      const created = await projectService.createProject({ name: newName, url: newUrl });
      setProjects([created, ...projects]);
      setCreateModal(false);
      setNewName('');
      setNewUrl('');
    }
  };

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">Projects</h1>
          <p className="text-xs sm:text-sm text-[#5F6B85] mt-1">
            Manage target environments and scheduled automated QA test suites.
          </p>
        </div>

        <Button variant="primary" onClick={() => setCreateModal(true)} className="gap-2 text-xs">
          <Plus className="w-4 h-4" />
          <span>Create Project</span>
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8697C4]" />
          <input
            type="text"
            placeholder="Search projects by name or URL..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-white border border-[#ADBBDA]/50 rounded-xl text-xs text-[#172033] outline-none focus:border-[#3D52A0]"
          />
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="p-6 rounded-2xl bg-white border border-[#ADBBDA]/40 hover:border-[#7091E6] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-base font-bold text-[#172033]">{proj.name}</h3>
                <span className="text-[11px] font-mono text-[#22A06B] bg-[#22A06B]/10 px-2 py-0.5 rounded font-semibold">
                  {proj.successRate}% Success
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#5F6B85] mb-6">
                <span>{proj.url}</span>
                <ExternalLink className="w-3 h-3 text-[#8697C4]" />
              </div>

              <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#ADBBDA]/20 text-xs">
                <div>
                  <span className="text-[#5F6B85] block text-[11px]">Health Score</span>
                  <span className="font-extrabold text-lg text-[#3D52A0]">{proj.healthScore} / 100</span>
                </div>
                <div>
                  <span className="text-[#5F6B85] block text-[11px]">Last Tested</span>
                  <span className="font-semibold text-[#172033]">{proj.lastTested}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs text-[#5F6B85]">{proj.testCount} tests configured</span>
              <Link to={`/projects/${proj.id}`}>
                <Button size="sm" variant="outline" className="text-xs gap-1">
                  <span>View Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Create Project Modal */}
      {createModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-[#172033]">Create New Project</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. Core Checkout API"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ADBBDA] rounded-xl text-xs outline-none focus:border-[#3D52A0]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#172033] mb-1">Website or API Root URL</label>
                <input
                  type="url"
                  placeholder="https://app.company.com"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-[#ADBBDA] rounded-xl text-xs outline-none focus:border-[#3D52A0]"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setCreateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Project
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
