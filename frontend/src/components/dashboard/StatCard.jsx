import React from 'react';
import { Card } from '../common/Card';

export function StatCard({ title, value, subtext, icon: Icon, trend, color = 'blue' }) {
  const colorMap = {
    blue: {
      iconBg: 'bg-[#EDE8F5] text-[#3D52A0]',
      valColor: 'text-[#3D52A0]',
    },
    green: {
      iconBg: 'bg-[#22A06B]/15 text-[#22A06B]',
      valColor: 'text-[#22A06B]',
    },
    red: {
      iconBg: 'bg-[#D64545]/15 text-[#D64545]',
      valColor: 'text-[#D64545]',
    },
    purple: {
      iconBg: 'bg-[#7091E6]/20 text-[#7091E6]',
      valColor: 'text-[#7091E6]',
    },
  };

  const current = colorMap[color] || colorMap.blue;

  return (
    <Card hover className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-[#8697C4]">{title}</p>
        {Icon && (
          <div className={`w-8 h-8 rounded-lg ${current.iconBg} flex items-center justify-center shrink-0`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className={`text-3xl font-extrabold tracking-tight ${current.valColor}`}>
          {value}
        </span>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            typeof trend === 'object' && trend.direction === 'down'
              ? 'bg-[#D64545]/10 text-[#D64545]'
              : 'bg-[#22A06B]/10 text-[#22A06B]'
          }`}>
            {typeof trend === 'object' ? trend.label : trend}
          </span>
        )}
      </div>

      {subtext && <p className="text-xs text-[#5F6B85] mt-1.5">{subtext}</p>}
    </Card>
  );
}
