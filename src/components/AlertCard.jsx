import React from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight,
  TrendingUp, 
  ShieldAlert,
  Sparkles,
  DollarSign,
  Terminal
} from 'lucide-react';

export default function AlertCard({ alert, onViewDetails, onToggleResolve }) {
  const isResolved = alert.status === 'Resolved';
  const isTinyFish = alert.isTinyFishIngested;

  // Badge styling matching high/medium/low
  const getRiskBadgeStyles = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return {
          container: 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-500/20',
          dot: 'bg-rose-600',
          ping: true
        };
      case 'medium':
        return {
          container: 'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-500/20',
          dot: 'bg-amber-500',
          ping: false
        };
      case 'low':
        return {
          container: 'bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-500/20',
          dot: 'bg-blue-600',
          ping: false
        };
      default:
        return {
          container: 'bg-slate-50 text-slate-700 border-slate-200 ring-1 ring-slate-400/20',
          dot: 'bg-slate-500',
          ping: false
        };
    }
  };

  const badgeStyle = getRiskBadgeStyles(alert.riskLevel);

  return (
    <article
      className={`relative rounded-2xl border transition-all duration-300 group ${
        isResolved 
          ? 'bg-slate-50/70 border-slate-200/60 opacity-80' 
          : isTinyFish
          ? 'bg-white border-emerald-400 shadow-md ring-2 ring-emerald-500/30'
          : 'bg-white border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300'
      }`}
      aria-labelledby={`alert-title-${alert.id}`}
    >
      {/* Top accent bar for high-risk alerts */}
      {alert.riskLevel === 'High' && !isResolved && (
        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${
          isTinyFish 
            ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-600' 
            : 'bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-600'
        }`} />
      )}

      <div className="p-5 sm:p-6">
        {/* Header: Badges & Timestamp */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Risk Level Badge */}
            <span 
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${badgeStyle.container}`}
            >
              <span className="relative flex h-2 w-2">
                {badgeStyle.ping && !isResolved && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${badgeStyle.dot}`}></span>
              </span>
              {alert.riskLevel} Risk
            </span>

            {/* TinyFish Ingestion Tag */}
            {isTinyFish && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-300 ring-1 ring-emerald-400/30 animate-pulse">
                <Terminal className="w-3 h-3 text-emerald-600" /> TinyFish Ingestion
              </span>
            )}

            {/* Category Chip */}
            {alert.category && (
              <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">
                {alert.category}
              </span>
            )}

            {/* Status if Resolved */}
            {isResolved && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> Resolved
              </span>
            )}
          </div>

          {/* Time detected */}
          <div className="flex items-center gap-1 text-xs text-slate-600 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{alert.detectedAt}</span>
          </div>
        </div>

        {/* Event Title */}
        <h3 
          id={`alert-title-${alert.id}`}
          className={`text-lg font-bold tracking-tight mb-2 font-sans transition-colors ${
            isResolved ? 'text-slate-600 line-through decoration-slate-300' : 'text-slate-900 group-hover:text-indigo-950'
          }`}
        >
          {alert.title}
        </h3>

        {/* Supplier Name & Region */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 mb-4">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span>{alert.supplier}</span>
          </div>

          {alert.location && (
            <div className="flex items-center gap-1 text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{alert.location}</span>
            </div>
          )}

          {alert.estimatedDelay && (
            <div className="flex items-center gap-1 font-medium text-amber-700 bg-amber-50/80 px-2 py-0.5 rounded border border-amber-200/60">
              <span>Impact: {alert.estimatedDelay}</span>
            </div>
          )}

          {alert.valueAtRisk && alert.valueAtRisk !== '$0' && (
            <div className="flex items-center gap-1 font-semibold text-slate-700">
              <span>Val at Risk: {alert.valueAtRisk}</span>
            </div>
          )}
        </div>

        {/* AI Insight Summary */}
        {alert.aiSummary && (
          <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/70 text-xs text-slate-600 leading-relaxed mb-4 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p className="line-clamp-2">
              <span className="font-semibold text-slate-800">AI Assessment: </span>
              {alert.aiSummary}
            </p>
          </div>
        )}

        {/* Card Footer: Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-3">
          {/* Quick resolve / unresolve button */}
          <button
            onClick={() => onToggleResolve(alert.id)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
              isResolved
                ? 'border-slate-300 text-slate-600 hover:bg-slate-100'
                : 'border-slate-200 text-slate-600 hover:text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50/60'
            }`}
            title={isResolved ? 'Mark as active' : 'Mark as resolved'}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${isResolved ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{isResolved ? 'Mark Unresolved' : 'Acknowledge / Resolve'}</span>
          </button>

          {/* View Details Button (Core Requirement) */}
          <button
            onClick={() => onViewDetails(alert)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-indigo-700 active:scale-98 transition-all shadow-xs shadow-slate-900/10 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            aria-label={`View details for ${alert.title}`}
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
