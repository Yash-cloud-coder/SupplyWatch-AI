import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  PlusCircle, 
  AlertTriangle, 
  ShieldAlert, 
  Radio, 
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  X
} from 'lucide-react';
import AlertCard from './AlertCard';

export default function RiskAlertFeed({ 
  alerts, 
  onViewDetails, 
  onToggleResolve, 
  onSimulateNewAlert,
  onResetAlerts 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Filter calculations
  const filterCounts = useMemo(() => {
    return {
      All: alerts.length,
      High: alerts.filter(a => a.riskLevel === 'High' && a.status !== 'Resolved').length,
      Medium: alerts.filter(a => a.riskLevel === 'Medium' && a.status !== 'Resolved').length,
      Low: alerts.filter(a => a.riskLevel === 'Low' && a.status !== 'Resolved').length,
      Resolved: alerts.filter(a => a.status === 'Resolved').length
    };
  }, [alerts]);

  // Filter and search logic
  const filteredAlerts = useMemo(() => {
    return alerts
      .filter((alert) => {
        // Filter by tab
        if (selectedFilter === 'High') {
          if (alert.riskLevel !== 'High' || alert.status === 'Resolved') return false;
        } else if (selectedFilter === 'Medium') {
          if (alert.riskLevel !== 'Medium' || alert.status === 'Resolved') return false;
        } else if (selectedFilter === 'Low') {
          if (alert.riskLevel !== 'Low' || alert.status === 'Resolved') return false;
        } else if (selectedFilter === 'Resolved') {
          if (alert.status !== 'Resolved') return false;
        }

        // Search term matching
        if (!searchTerm.trim()) return true;
        const query = searchTerm.toLowerCase();
        return (
          alert.title?.toLowerCase().includes(query) ||
          alert.supplier?.toLowerCase().includes(query) ||
          alert.category?.toLowerCase().includes(query) ||
          alert.location?.toLowerCase().includes(query) ||
          alert.aiSummary?.toLowerCase().includes(query) ||
          alert.purchaseOrders?.some(po => po.toLowerCase().includes(query))
        );
      })
      .sort((a, b) => {
        if (sortBy === 'risk') {
          const priority = { High: 3, Medium: 2, Low: 1 };
          return (priority[b.riskLevel] || 0) - (priority[a.riskLevel] || 0);
        }
        // Default: newest first by timestamp or id
        return b.id.localeCompare(a.id);
      });
  }, [alerts, selectedFilter, searchTerm, sortBy]);

  return (
    <section className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden" aria-labelledby="feed-heading">
      {/* Feed Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 id="feed-heading" className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                Risk Alert Feed
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                </span>
                Live Telemetry
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Real-time AI disruption detection, automated impact mapping, and contingency playbooks
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onSimulateNewAlert}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 transition-all shadow-xs shadow-indigo-600/20"
              title="Inject a real-time synthetic risk signal to test dashboard state reactivity"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Simulate New Risk Event</span>
            </button>

            <button
              onClick={onResetAlerts}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200/80 transition-colors"
              title="Reset alerts to default mock state"
              aria-label="Reset alerts to default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter bar & Search */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
          {/* Risk Level Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none" role="tablist">
            {[
              { id: 'All', label: 'All Alerts', count: filterCounts.All },
              { id: 'High', label: 'High Risk', count: filterCounts.High, color: 'text-rose-700 bg-rose-50' },
              { id: 'Medium', label: 'Medium', count: filterCounts.Medium, color: 'text-amber-700 bg-amber-50' },
              { id: 'Low', label: 'Low', count: filterCounts.Low, color: 'text-blue-700 bg-blue-50' },
              { id: 'Resolved', label: 'Resolved', count: filterCounts.Resolved, color: 'text-emerald-700 bg-emerald-50' }
            ].map((tab) => {
              const isSelected = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  role="tab"
                  aria-selected={isSelected}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isSelected ? 'bg-slate-800 text-indigo-200' : 'bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Sort */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search alerts or suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-7 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-1.5 px-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              aria-label="Sort alerts"
            >
              <option value="newest">Sort: Newest</option>
              <option value="risk">Sort: Severity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feed List Content */}
      <div className="p-5 sm:p-6 bg-slate-50/40">
        {filteredAlerts.length > 0 ? (
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onViewDetails={onViewDetails}
                onToggleResolve={onToggleResolve}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-14 text-center">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-3 text-indigo-600">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1 font-sans">
              No matching alerts found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              {searchTerm
                ? `No alerts match "${searchTerm}". Try resetting your search terms or filter.`
                : 'All alerts in this category have been addressed or resolved.'}
            </p>
            {(searchTerm || selectedFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFilter('All');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors shadow-2xs"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Feed Footer */}
      <div className="p-4 px-6 border-t border-slate-100 bg-white flex flex-wrap items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-medium">Showing {filteredAlerts.length} of {alerts.length} total events</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium text-slate-600">
          <span>AI Polling Interval:</span>
          <span className="font-mono text-indigo-600 font-semibold">Realtime WebSockets</span>
        </div>
      </div>
    </section>
  );
}
