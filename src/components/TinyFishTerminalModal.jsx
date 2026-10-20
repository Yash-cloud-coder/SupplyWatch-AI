import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  Cpu, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function TinyFishTerminalModal({ isOpen, onClose, onScanComplete }) {
  const [logs, setLogs] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showJson, setShowJson] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setLogs([]);
      setCurrentStep(0);
      setShowJson(false);
      setProgress(0);
      return;
    }

    // Sequence timers
    // [0s] 'Initializing TinyFish Agent...'
    setLogs([
      { time: '0.0s', text: 'Initializing TinyFish Agent...', tag: 'INIT' }
    ]);
    setCurrentStep(1);
    setProgress(15);

    // [1s] 'Target URL: https://global-logistics-news.com/advisory/taiwan-port'
    const t1 = setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { 
          time: '1.0s', 
          text: 'Target URL: https://global-logistics-news.com/advisory/taiwan-port', 
          tag: 'TARGET',
          isUrl: true 
        }
      ]);
      setCurrentStep(2);
      setProgress(45);
    }, 1000);

    // [2s] 'Applying extraction goal: Find disruption events...'
    const t2 = setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        { 
          time: '2.0s', 
          text: 'Applying extraction goal: Find disruption events...', 
          tag: 'EXTRACT' 
        }
      ]);
      setCurrentStep(3);
      setProgress(75);
    }, 2000);

    // [3.5s] Output a formatted JSON block showing:
    // { type: 'Disruption', location: 'Taiwan Port', severity: 'High', supplier: 'MicroChip Global' }
    const t3 = setTimeout(() => {
      setShowJson(true);
      setCurrentStep(4);
      setProgress(100);
    }, 3500);

    // [4.2s] Automatically close terminal and inject alert into state
    const t4 = setTimeout(() => {
      onScanComplete({
        type: 'Disruption',
        location: 'Taiwan Port',
        severity: 'High',
        supplier: 'MicroChip Global'
      });
      onClose();
    }, 4400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isOpen, onClose, onScanComplete]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-title"
    >
      {/* Terminal Window Frame */}
      <div 
        className="w-full max-w-2xl bg-[#0b0f19] rounded-2xl border border-emerald-500/40 shadow-2xl shadow-emerald-500/10 overflow-hidden font-mono text-xs sm:text-sm animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="bg-[#111827] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* macOS / Unix Window Controls */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition-opacity" 
                title="Close terminal"
                aria-label="Close terminal"
              />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="h-4 w-px bg-slate-700 mx-1" />
            <div className="flex items-center gap-1.5 text-slate-300 font-bold text-xs tracking-wide">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span id="terminal-title">tinyfish-agent@byteheads:~ (crawler-worker)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              STREAMING
            </span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Cancel scan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 h-0.5">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Terminal Body */}
        <div className="p-5 sm:p-6 space-y-3.5 min-h-[300px] max-h-[70vh] overflow-y-auto text-slate-300">
          {/* Header Banner */}
          <div className="text-[11px] text-slate-500 pb-2 border-b border-slate-800/80 flex items-center justify-between">
            <span>TinyFish LLM Scraper Engine • v2.4</span>
            <span>Target Protocol: HTTPS/TLS</span>
          </div>

          {/* Sequential Logs */}
          {logs.map((log, index) => (
            <div key={index} className="flex items-start gap-2.5 animate-in fade-in slide-in-from-left-2 duration-200">
              <span className="text-emerald-500 select-none font-bold">&gt;</span>
              <span className="text-slate-500 text-[11px] select-none font-mono">[{log.time}]</span>
              <span className="text-xs px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px] select-none">
                {log.tag}
              </span>
              <span className={log.isUrl ? 'text-teal-300 underline underline-offset-2 break-all' : 'text-emerald-300'}>
                {log.text}
              </span>
            </div>
          ))}

          {/* Formatted JSON Output (at 3.5s) */}
          {showJson && (
            <div className="mt-3 p-4 rounded-xl bg-[#060a12] border border-emerald-500/50 shadow-inner animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-emerald-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  EXTRACTION PAYLOAD SYNTHESIZED
                </span>
                <span className="text-slate-400 font-normal">application/json</span>
              </div>
              <pre className="text-xs sm:text-sm font-mono text-emerald-400 leading-relaxed overflow-x-auto">
{`{
  "type": "Disruption",
  "location": "Taiwan Port",
  "severity": "High",
  "supplier": "MicroChip Global"
}`}
              </pre>
            </div>
          )}

          {/* Blinking Prompt Cursor */}
          <div className="flex items-center gap-2 pt-1 text-emerald-400">
            <span className="text-emerald-500 font-bold">&gt;</span>
            {currentStep < 4 ? (
              <span className="text-xs text-slate-400 flex items-center gap-2">
                Scanning DOM & semantic NLP tokens...
                <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
              </span>
            ) : (
              <span className="text-xs text-emerald-300 font-bold flex items-center gap-2">
                Ingesting into SupplyWatch AI Feed...
                <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
              </span>
            )}
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="bg-[#111827] px-4 py-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Process execution sandbox: active
          </span>
          <span className="font-semibold text-slate-300">Closing automatically in ~4s</span>
        </div>
      </div>
    </div>
  );
}
