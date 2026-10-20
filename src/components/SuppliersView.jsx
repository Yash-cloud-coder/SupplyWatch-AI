import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  Shield,
  ArrowUpDown,
  Mail,
  ChevronRight
} from 'lucide-react';

export default function SuppliersView({ suppliers, onSelectSupplierAlerts }) {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('All');

  const filteredSuppliers = suppliers.filter((sup) => {
    if (tierFilter !== 'All' && sup.tier !== tierFilter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      sup.name.toLowerCase().includes(q) ||
      sup.category.toLowerCase().includes(q) ||
      sup.country.toLowerCase().includes(q) ||
      sup.id.toLowerCase().includes(q)
    );
  });

  const getRiskBadge = (rating) => {
    if (rating.includes('High')) {
      return 'bg-rose-50 text-rose-700 border-rose-200';
    } else if (rating.includes('Medium')) {
      return 'bg-amber-50 text-amber-700 border-amber-200';
    } else {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 font-sans">
              Monitored Suppliers Directory
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
              {suppliers.length} Active Nodes
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Real-time telemetry, solvency metrics, lead-time volatility, and active alerts across Tier-1 to Tier-3 suppliers
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search supplier, category, country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white w-64 transition-all"
            />
          </div>

          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option value="All">All Tiers</option>
            <option value="Tier 1">Tier 1</option>
            <option value="Tier 2">Tier 2</option>
            <option value="Tier 3">Tier 3</option>
          </select>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/70 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-6">Supplier Organization</th>
                <th className="py-3.5 px-4">Tier</th>
                <th className="py-3.5 px-4">Country & Node</th>
                <th className="py-3.5 px-4">Lead Time</th>
                <th className="py-3.5 px-4">Health Index</th>
                <th className="py-3.5 px-4">Risk Rating</th>
                <th className="py-3.5 px-4">Active Alerts</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSuppliers.map((sup) => (
                <tr key={sup.id} className="hover:bg-slate-50/60 transition-colors group">
                  {/* Supplier info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-100 to-indigo-50 border border-slate-200/80 flex items-center justify-center text-slate-700 font-bold text-xs group-hover:border-indigo-300 transition-colors">
                        {sup.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 font-sans group-hover:text-indigo-600 transition-colors">
                          {sup.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {sup.category} • <span className="font-mono text-slate-400">{sup.id}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Tier */}
                  <td className="py-4 px-4 font-semibold text-slate-700">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200/60">
                      {sup.tier}
                    </span>
                  </td>

                  {/* Country */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700">
                      <span className="text-sm">{sup.flag}</span>
                      <span>{sup.country}</span>
                    </div>
                  </td>

                  {/* Lead time */}
                  <td className="py-4 px-4 font-mono font-medium text-slate-600">
                    {sup.leadTime}
                  </td>

                  {/* Health Score Progress */}
                  <td className="py-4 px-4">
                    <div className="w-28 space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="font-bold text-slate-700">{sup.healthScore}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            sup.healthScore > 85 ? 'bg-emerald-500' : sup.healthScore > 70 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${sup.healthScore}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Risk Rating */}
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] border ${getRiskBadge(sup.riskRating)}`}>
                      {sup.riskRating}
                    </span>
                  </td>

                  {/* Active Alerts */}
                  <td className="py-4 px-4">
                    {sup.activeAlerts > 0 ? (
                      <span className="inline-flex items-center gap-1 font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        <AlertTriangle className="w-3 h-3" />
                        {sup.activeAlerts} Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        Clean
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => onSelectSupplierAlerts(sup.name)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 font-semibold transition-all"
                    >
                      Filter Alerts
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
