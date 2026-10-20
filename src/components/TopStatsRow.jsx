import React from 'react';
import { 
  Building2, 
  AlertTriangle, 
  Flame, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  ArrowUpRight
} from 'lucide-react';

export default function TopStatsRow({ 
  supplierCount = 15, 
  activeAlertsCount = 2, 
  highRiskCount = 1,
  totalValueAtRisk = '$4.5M',
  onStatClick
}) {
  const stats = [
    {
      id: 'suppliers',
      title: 'Monitored Suppliers',
      value: supplierCount,
      unit: '',
      subtitle: 'Across 11 countries & 3 Tiers',
      badge: '+3 Added Q4',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: Building2,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
      accentGlow: 'hover:border-blue-300'
    },
    {
      id: 'active-alerts',
      title: 'Active Alerts',
      value: activeAlertsCount,
      unit: '',
      subtitle: activeAlertsCount > 0 ? 'Disruptions requiring triage' : 'All clear across network',
      badge: activeAlertsCount > 0 ? 'Live Telemetry' : 'Nominal',
      badgeColor: activeAlertsCount > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: AlertTriangle,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-100',
      accentGlow: 'hover:border-amber-300'
    },
    {
      id: 'high-risk',
      title: 'High Risk',
      value: highRiskCount,
      unit: '',
      subtitle: highRiskCount > 0 ? 'Critical supply chain impact' : 'Zero critical blockers',
      badge: highRiskCount > 0 ? 'Urgent Attention' : 'Safe',
      badgeColor: highRiskCount > 0 ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-50 text-slate-600 border-slate-200',
      icon: Flame,
      iconBg: highRiskCount > 0 ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-slate-50 text-slate-500 border border-slate-200',
      accentGlow: highRiskCount > 0 ? 'hover:border-rose-300 ring-rose-500/10' : 'hover:border-slate-300',
      pulse: highRiskCount > 0
    },
    {
      id: 'resiliency',
      title: 'Resiliency Index',
      value: '94.2',
      unit: '%',
      subtitle: 'Predicted lead-time stability',
      badge: '+1.8% vs Baseline',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: ShieldCheck,
      iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
      accentGlow: 'hover:border-purple-300'
    }
  ];

  return (
    <section className="mb-8" aria-label="Key Performance Statistics">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              onClick={() => onStatClick && onStatClick(stat.id)}
              className={`relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer group ${stat.accentGlow}`}
            >
              {/* Header row with Title and Icon */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 font-sans">
                  {stat.title}
                </span>
                <div className={`p-2.5 rounded-xl ${stat.iconBg} transition-transform group-hover:scale-105`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Metric Value */}
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="text-lg font-bold text-slate-500">{stat.unit}</span>
                )}
                {stat.pulse && (
                  <span className="ml-2 flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
                  </span>
                )}
              </div>

              {/* Bottom Row with Badge and Subtitle */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500 truncate mr-2 font-medium">
                  {stat.subtitle}
                </span>
                <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] border shrink-0 ${stat.badgeColor}`}>
                  {stat.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
