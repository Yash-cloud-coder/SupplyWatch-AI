import React from 'react';
import { 
  Menu, 
  Bell, 
  Search, 
  ShieldCheck, 
  Zap, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  Terminal,
  Radio
} from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  activeAlertCount, 
  onSimulateNewAlert, 
  onStartTinyFishScan,
  setMobileOpen,
  onNotificationClick 
}) {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return {
          title: 'Executive Operations Dashboard',
          subtitle: 'Live supply chain health, disruption detection, and automated mitigation'
        };
      case 'suppliers':
        return {
          title: 'Monitored Suppliers Directory',
          subtitle: 'Multi-tier supplier risk ratings, geo-nodes, and real-time SLAs'
        };
      case 'risk-alerts':
        return {
          title: 'Risk Alert Intelligence Feed',
          subtitle: 'High, Medium, and Low severity disruptions flagged across global nodes'
        };
      case 'settings':
        return {
          title: 'Platform & AI Settings',
          subtitle: 'Tune detection thresholds, automated escalation, and integration webhooks'
        };
      default:
        return {
          title: 'SupplyWatch AI Dashboard',
          subtitle: 'Supply chain risk intelligence'
        };
    }
  };

  const { title, subtitle } = getTabTitle();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight font-sans truncate">
              {title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate hidden sm:block">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: TinyFish Scanner Button, Notifications, User pill */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Core Demo Feature: Scan Sources (TinyFish) Button */}
        <button
          onClick={onStartTinyFishScan}
          className="relative group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-slate-950 hover:bg-slate-900 active:scale-95 transition-all shadow-md shadow-slate-950/20 border border-emerald-500/40 ring-1 ring-emerald-500/20 focus:ring-2 focus:ring-emerald-400 focus:outline-hidden"
          title="Launch TinyFish live data crawler terminal"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-90" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <Terminal className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-6 transition-transform" />
          <span className="tracking-tight text-white font-sans">Scan Sources (TinyFish)</span>
          <span className="hidden md:inline-block px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
            LIVE DEMO
          </span>
        </button>

        {/* Notifications Bell */}
        <button
          onClick={onNotificationClick}
          className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80 transition-colors"
          aria-label={`Notifications: ${activeAlertCount} active alerts`}
        >
          <Bell className="w-4 h-4" />
          {activeAlertCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
              {activeAlertCount}
            </span>
          )}
        </button>

        {/* Profile indicator */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
            BH
          </div>
          <div className="hidden md:block text-left">
            <span className="text-xs font-bold text-slate-900 block leading-tight">BYTE HEADS</span>
            <span className="text-[10px] font-medium text-slate-500 block leading-tight">Enterprise Ops</span>
          </div>
        </div>
      </div>
    </header>
  );
}
