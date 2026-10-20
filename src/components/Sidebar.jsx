import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  AlertTriangle, 
  Settings, 
  ShieldCheck, 
  Radio, 
  Cpu, 
  ChevronRight,
  ExternalLink,
  Sparkles,
  X
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  activeAlertCount, 
  highRiskCount, 
  supplierCount,
  mobileOpen,
  setMobileOpen 
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'suppliers',
      label: 'Suppliers',
      icon: Building2,
      badge: supplierCount.toString()
    },
    {
      id: 'risk-alerts',
      label: 'Risk Alerts',
      icon: AlertTriangle,
      badge: activeAlertCount.toString(),
      badgeColor: highRiskCount > 0 ? 'bg-rose-500 text-white animate-pulse' : 'bg-indigo-600 text-white'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200/90 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:static lg:shadow-none'
        }`}
        aria-label="Main Sidebar Navigation"
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-slate-950 via-blue-950 to-indigo-700 shadow-md shadow-indigo-950/20 text-white ring-1 ring-white/20">
              <ShieldCheck className="w-6 h-6 text-indigo-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 font-sans">
                  Supply<span className="text-indigo-600">Watch</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                by team <span className="font-semibold text-slate-700">BYTE HEADS</span>
              </p>
            </div>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Engine Status Banner */}
        <div className="mx-4 mt-4 p-3 rounded-xl bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-purple-50/70 border border-indigo-100/80">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-slate-800">AI Sentinel Engine</span>
            </div>
            <span className="text-[10px] font-mono font-medium text-indigo-700 bg-white/80 px-1.5 py-0.5 rounded shadow-2xs">
              LIVE
            </span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 leading-snug">
            Monitoring 1,420 global freight & geopolitics signals
          </p>
        </div>

        {/* Navigation Section */}
        <div className="px-4 py-5 flex-1 overflow-y-auto space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Platform Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm shadow-slate-950/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-indigo-300' : 'text-slate-400 group-hover:text-indigo-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        item.badgeColor || (isActive ? 'bg-slate-800 text-indigo-200' : 'bg-slate-200/80 text-slate-700')
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-4 h-4 text-slate-400" />}
                </div>
              </button>
            );
          })}

          <div className="pt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            AI Analytics & Tools
          </div>

          <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600 space-y-2">
            <div className="flex items-center justify-between font-semibold text-slate-800">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                Resilience Model
              </span>
              <span className="text-indigo-600 font-mono">v4.8</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full w-[94.2%]" />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>System Health</span>
              <span className="font-semibold text-slate-700">94.2% Optimal</span>
            </div>
          </div>
        </div>

        {/* User & Organization Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-2xs">
              BH
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">BYTE HEADS Ops</p>
              <p className="text-[11px] text-slate-500 truncate">Enterprise Admin</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200" title="Connected" />
          </div>
        </div>
      </aside>
    </>
  );
}
