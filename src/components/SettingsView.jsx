import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  ShieldCheck, 
  Cpu, 
  Webhook, 
  Sliders, 
  Save, 
  Check, 
  Radio, 
  Sparkles,
  Users
} from 'lucide-react';

export default function SettingsView({ onToast }) {
  const [sensitivity, setSensitivity] = useState(85);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slackAlerts, setSlackAlerts] = useState(true);
  const [autoEscalate, setAutoEscalate] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    if (onToast) onToast('Settings and AI parameters updated successfully!');
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 font-sans">
            Enterprise Engine Configuration
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage SupplyWatch AI thresholds, notification webhooks, and team access credentials
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 transition-all shadow-xs"
        >
          {saved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{saved ? 'Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      {/* AI Sensitivity & Thresholds */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              AI Risk Detection Sensitivity Threshold
            </h3>
            <p className="text-xs text-slate-500">
              Sets the minimum NLP and telemetry confidence required to generate High-Risk alerts
            </p>
          </div>
        </div>

        <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">Sensitivity Score</span>
            <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              {sensitivity}% Confidence
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="98"
            value={sensitivity}
            onChange={(e) => setSensitivity(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Relaxed (fewer alerts)</span>
            <span>Balanced (Enterprise default)</span>
            <span>Aggressive (Zero tolerance)</span>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Escalation & Notification Channels
            </h3>
            <p className="text-xs text-slate-500">
              Dispatches automated webhook alerts when disruptions are detected
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          <label className="py-3 flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-800 block">Instant Email Dispatch</span>
              <span className="text-[11px] text-slate-500">Send immediate notifications for High and Medium severity disruptions</span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
          </label>

          <label className="py-3 flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-800 block">Slack & Microsoft Teams Webhook</span>
              <span className="text-[11px] text-slate-500">Broadcast to #supply-chain-ops and emergency incident channels</span>
            </div>
            <input
              type="checkbox"
              checked={slackAlerts}
              onChange={(e) => setSlackAlerts(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
          </label>

          <label className="py-3 flex items-center justify-between cursor-pointer">
            <div>
              <span className="text-xs font-semibold text-slate-800 block">Automated Purchase Order Rerouting</span>
              <span className="text-[11px] text-slate-500">Auto-suggest secondary logistics carriers for high-impact port strikes</span>
            </div>
            <input
              type="checkbox"
              checked={autoEscalate}
              onChange={(e) => setAutoEscalate(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
          </label>
        </div>
      </div>

      {/* Team BYTE HEADS System Info */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Users className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">SupplyWatch AI • Architecture</h3>
              <p className="text-xs text-indigo-200">Developed by team BYTE HEADS</p>
            </div>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-indigo-200">
            v2.4.0-Enterprise
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-400 block text-[11px]">Primary Model</span>
            <span className="font-semibold text-white">Gemini 3.8 Multi-modal</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-400 block text-[11px]">Telemetry Engine</span>
            <span className="font-semibold text-emerald-400">WebSocket Live (Connected)</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <span className="text-slate-400 block text-[11px]">Data Encryption</span>
            <span className="font-semibold text-white">AES-256 / TLS 1.3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
