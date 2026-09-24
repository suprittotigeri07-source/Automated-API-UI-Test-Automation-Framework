import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Globe, RotateCw, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { HealthScore } from '../../components/testing/HealthScore';

export function ProjectDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/projects" className="p-1 rounded-lg text-[#5F6B85] hover:text-[#3D52A0]">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#172033]">E-Commerce Platform</h1>
          <p className="text-xs text-[#5F6B85] mt-0.5">https://shop.example.com • Project ID: {id}</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-[#ADBBDA]/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-[#7091E6] uppercase tracking-wider">Target Status</span>
          <h2 className="text-xl font-bold text-[#172033] mt-1">Health Score: 92 / 100</h2>
          <p className="text-xs text-[#5F6B85] mt-1">Last automated regression ran 2 minutes ago.</p>
        </div>
        <Link to="/new-test?url=https://shop.example.com">
          <Button variant="primary" className="gap-2 text-xs">
            <Play className="w-4 h-4" />
            <span>Trigger Suite Run</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
