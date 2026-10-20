import React, { useEffect } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  DollarSign, 
  ExternalLink, 
  Send, 
  FileText, 
  Calendar,
  Zap,
  ArrowRight,
  Globe,
  Share2,
  Users,
  Compass
} from 'lucide-react';

export default function AlertDetailsModal({ 
  alert, 
  onClose, 
  onToggleResolve, 
  onActionTriggered,
  onReviewAlternateSuppliers 
}) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!alert) return null;

  const isResolved = alert.status === 'Resolved';

  // Badge styling matching high/medium/low
  const getRiskBadgeStyles = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-500/20';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-500/20';
      case 'low':
        return 'bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-500/20';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  // Mock source link and timestamp fallbacks
  const sourceUrl = alert.sourceUrl || 'https://global-logistics-news.com/advisory/taiwan-port';
  const sourceName = alert.sourceName || 'Global Logistics News (Maritime Advisory)';
  const sourceTimestamp = alert.sourceTimestamp || 'October 20, 2026 • 20:25:00 UTC';
  
  // AI summary text fallback matching exact requirement
  const aiSummaryText = alert.aiSummary || 'A sudden strike at Taiwan Port is likely to delay our semiconductor shipments by 14 days.';

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="slideover-title"
      onClick={onClose}
    >
      {/* Slide-over panel container */}
      <div 
        className="relative w-full max-w-2xl bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-300 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shrink-0" />

        {/* Panel Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-white shrink-0">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {/* Risk Level Badge */}
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getRiskBadgeStyles(alert.riskLevel)} flex items-center gap-1.5`}>
                <span className={`w-2 h-2 rounded-full ${alert.riskLevel === 'High' ? 'bg-rose-600 animate-pulse' : 'bg-amber-500'}`} />
                {alert.riskLevel} Risk
              </span>

              {/* Category Pill */}
              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                {alert.category || 'Supply Chain Disruption'}
              </span>

              {/* Status if Resolved */}
              {isResolved && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Resolved
                </span>
              )}

              {alert.isTinyFishIngested && (
                <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-300">
                  ⚡ TinyFish Scanned
                </span>
              )}
            </div>

            {/* 1. The Detected Issue and Affected Supplier */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block mb-1">
                Detected Disruption Event
              </span>
              <h2 id="slideover-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
                {alert.title}
              </h2>
            </div>

            {/* Affected Supplier Profile */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Affected Supplier: <span className="text-indigo-950 font-extrabold">{alert.supplier}</span></span>
              </div>

              {alert.location && (
                <div className="flex items-center gap-1 text-slate-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{alert.location}</span>
                </div>
              )}

              <div className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{alert.detectedAt}</span>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            aria-label="Close details panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm bg-slate-50/40">
          {/* Key Impact Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Est. Delay Impact</span>
              <span className="text-base font-extrabold text-rose-700 font-sans mt-0.5 block">
                {alert.estimatedDelay || '+14 Days'}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Financial Exposure</span>
              <span className="text-base font-extrabold text-slate-900 font-sans mt-0.5 block">
                {alert.valueAtRisk || '$1,650,000'}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">AI Confidence</span>
              <span className="text-base font-extrabold text-indigo-700 font-sans mt-0.5 block">
                {alert.confidenceScore || 99}% Match
              </span>
            </div>
          </div>

          {/* 2. 'AI Risk Summary' Section */}
          <section className="bg-white rounded-2xl p-5 border border-indigo-100 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200/60">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                  AI Risk Summary
                </h3>
              </div>
              <span className="text-[10px] font-mono font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                Prescriptive Intelligence
              </span>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/70 via-blue-50/50 to-purple-50/60 border border-indigo-100/90">
              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                "{aiSummaryText}"
              </p>
            </div>

            <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
              <span>Synthesized via Gemini 3.8 & TinyFish Crawler</span>
              <span className="font-semibold text-slate-700">High Reliability</span>
            </div>
          </section>

          {/* 3. 'Supporting Evidence' Section */}
          <section className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200/60">
                  <Globe className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-sans">
                  Supporting Evidence
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Source Verified
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              {/* Mock Source Link */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Source Reference Link
                </span>
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-700 hover:text-indigo-900 underline underline-offset-4 break-all group transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>{sourceUrl}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0 ml-0.5" />
                </a>
              </div>

              {/* Timestamp */}
              <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-700">Timestamp:</span>
                  <span className="font-mono text-slate-800">{sourceTimestamp}</span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  Publisher: {sourceName}
                </span>
              </div>
            </div>
          </section>

          {/* Impacted Components & Purchase Orders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                Impacted Purchase Orders
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(alert.purchaseOrders || ['PO-90412', 'PO-90415']).map((po) => (
                  <span key={po} className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                    {po}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                Critical Assembly Components
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(alert.affectedComponents || ['Semiconductor Wafers', 'Power Management ICs']).map((comp) => (
                  <span key={comp} className="text-xs font-medium px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-900 border border-indigo-200/60">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Panel Footer with Recommended Action Button */}
        <div className="p-5 border-t border-slate-200 bg-white shrink-0 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Core Action Button: Review Alternate Suppliers */}
            <button
              onClick={() => {
                if (onReviewAlternateSuppliers) {
                  onReviewAlternateSuppliers(alert);
                } else if (onActionTriggered) {
                  onActionTriggered(`Querying alternate qualified suppliers for ${alert.supplier}...`);
                }
                onClose();
              }}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-slate-900 hover:bg-indigo-700 active:scale-98 transition-all shadow-md shadow-slate-900/10 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            >
              <Users className="w-4 h-4 text-indigo-300" />
              <span>Review Alternate Suppliers</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Resolve / Reopen toggle */}
            <button
              onClick={() => onToggleResolve(alert.id)}
              className={`w-full sm:w-auto px-4 py-3 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 shrink-0 ${
                isResolved
                  ? 'border-slate-300 text-slate-700 hover:bg-slate-100 bg-white'
                  : 'border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{isResolved ? 'Reopen Alert' : 'Mark as Resolved'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span>BYTE HEADS Incident Intelligence</span>
            <button 
              onClick={onClose} 
              className="text-slate-500 hover:text-slate-800 font-semibold"
            >
              Dismiss Panel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
