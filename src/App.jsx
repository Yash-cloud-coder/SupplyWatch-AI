import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import TopStatsRow from './components/TopStatsRow';
import RiskAlertFeed from './components/RiskAlertFeed';
import AlertDetailsModal from './components/AlertDetailsModal';
import TinyFishTerminalModal from './components/TinyFishTerminalModal';
import SuppliersView from './components/SuppliersView';
import SettingsView from './components/SettingsView';
import { INITIAL_ALERTS, MONITORED_SUPPLIERS } from './data/mockData';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  TrendingUp,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

export default function App() {
  // Core React state
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [suppliers, setSuppliers] = useState(MONITORED_SUPPLIERS);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isTinyFishScanning, setIsTinyFishScanning] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Computed state metrics
  const activeAlertsCount = useMemo(() => {
    return alerts.filter((a) => a.status !== 'Resolved').length;
  }, [alerts]);

  const highRiskCount = useMemo(() => {
    return alerts.filter((a) => a.riskLevel === 'High' && a.status !== 'Resolved').length;
  }, [alerts]);

  const supplierCount = suppliers.length;

  // Trigger toast helper
  const showToast = (msg, type = 'info') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.text === msg ? null : prev));
    }, 3500);
  };

  // Toggle alert resolved state
  const handleToggleResolve = (alertId) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) => {
        if (alert.id === alertId) {
          const isNowResolved = alert.status !== 'Resolved';
          const updated = {
            ...alert,
            status: isNowResolved ? 'Resolved' : 'Active'
          };
          showToast(
            isNowResolved
              ? `Disruption "${alert.title}" marked as Resolved.`
              : `Disruption "${alert.title}" reopened as Active.`,
            isNowResolved ? 'success' : 'info'
          );
          if (selectedAlert && selectedAlert.id === alertId) {
            setSelectedAlert(updated);
          }
          return updated;
        }
        return alert;
      })
    );
  };

  // Simulate new incoming AI Risk Alert
  const handleSimulateNewAlert = () => {
    const scenarios = [
      {
        title: 'Panama Canal Transit Draft Restrictions Tightened',
        supplier: 'Pacific Logistics Corp',
        supplierId: 'SUP-005',
        riskLevel: 'High',
        category: 'Maritime / Climate',
        location: 'Panama Canal Locks',
        estimatedDelay: '+6 to 9 Days',
        valueAtRisk: '$1,850,000',
        affectedComponents: ['Substrate Panels (SUB-88)'],
        purchaseOrders: ['PO-89912'],
        aiSummary: 'Gatun Lake reservoir levels dropped below seasonal threshold. Transit booking slots slashed by 30%, delaying outbound cargo across Atlantic corridors.',
        confidenceScore: 97,
        recommendedMitigation: 'Reroute priority cargo to West Coast intermodal rail corridor or utilize Magellan detour for non-critical shipments.'
      },
      {
        title: 'Air Cargo Ground Crew Wildcat Strike at Schiphol',
        supplier: 'EuroFreight Express',
        supplierId: 'SUP-004',
        riskLevel: 'Medium',
        category: 'Labor / Logistics',
        location: 'Amsterdam, Netherlands',
        detectedAt: 'Just now',
        estimatedDelay: '+2 Days',
        valueAtRisk: '$310,000',
        affectedComponents: ['Precision Optic Sensors'],
        purchaseOrders: ['PO-89540'],
        aiSummary: 'Unannounced 24-hour baggage and ramp crew strike at Amsterdam Airport Schiphol has grounded 4 scheduled cargo feeder flights.',
        confidenceScore: 93,
        recommendedMitigation: 'Divert shipments via Brussels (BRU) or Liege (LGG) airfreight cargo hubs.'
      },
      {
        title: 'Industrial Solvent Shortage Notice Issued',
        supplier: 'São Paulo Polymers S.A.',
        supplierId: 'SUP-014',
        riskLevel: 'Low',
        category: 'Raw Materials / Supply',
        location: 'Campinas, Brazil',
        detectedAt: 'Just now',
        estimatedDelay: '+1 Day',
        valueAtRisk: '$45,000',
        affectedComponents: ['Industrial Resin & Casing'],
        purchaseOrders: ['PO-89801'],
        aiSummary: 'Secondary solvent supplier notified of maintenance turnaround. São Paulo Polymers reported 14-day internal buffer on site.',
        confidenceScore: 91,
        recommendedMitigation: 'Monitor daily inventory burndown; no supplier escalation required at current safety stock levels.'
      }
    ];

    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
    const newId = `ALT-${1080 + alerts.length + 1}`;
    const newAlert = {
      ...randomScenario,
      id: newId,
      detectedAt: 'Just now',
      timestamp: new Date().toISOString(),
      status: 'Active',
      timeline: [
        { time: 'Just now', event: 'AI Sentinel ingestion parsed real-time news & telemetry bulletin.' },
        { time: 'Just now', event: `Impact scored: ${randomScenario.riskLevel} risk rating computed.` }
      ]
    };

    setAlerts([newAlert, ...alerts]);
    showToast(`New Disruption Detected: "${newAlert.title}" (${newAlert.supplier})`, 'warning');
  };

  // Reset alerts
  const handleResetAlerts = () => {
    setAlerts(INITIAL_ALERTS);
    showToast('Alerts feed reset to original baseline state.');
  };

  // Handle TinyFish Data Scanner completion & state injection
  const handleTinyFishScanComplete = (extractedData) => {
    const tinyFishAlert = {
      id: `ALT-TF-${Date.now().toString().slice(-4)}`,
      title: 'Sudden Strike at Taiwan Port',
      supplier: extractedData.supplier || 'MicroChip Global',
      supplierId: 'SUP-901',
      riskLevel: extractedData.severity || 'High',
      category: 'Maritime / Port Strike',
      location: extractedData.location || 'Taiwan Port',
      detectedAt: 'Just now (via TinyFish)',
      timestamp: new Date().toISOString(),
      sourceUrl: 'https://global-logistics-news.com/advisory/taiwan-port',
      sourceName: 'Global Logistics News (Maritime Advisory)',
      sourceTimestamp: 'October 20, 2026 • 20:25:00 UTC',
      status: 'Active',
      estimatedDelay: '+14 Days Delay',
      valueAtRisk: '$1,650,000',
      affectedComponents: ['Advanced 5nm Silicon Wafers', 'Power Management Substrates'],
      purchaseOrders: ['PO-90412', 'PO-90415'],
      aiSummary: 'A sudden strike at Taiwan Port is likely to delay our semiconductor shipments by 14 days.',
      confidenceScore: 99,
      recommendedAction: 'Review Alternate Suppliers',
      recommendedMitigation: 'Review alternate suppliers for qualified 5nm fabrication lines (e.g., Kanto Robotics or Seoul Silicon Wafer Corp) or divert urgent shipments to Taichung/Keelung secondary air-freight hubs.',
      isTinyFishIngested: true,
      timeline: [
        { time: 'Just now', event: 'TinyFish Agent initialized web target: https://global-logistics-news.com/advisory/taiwan-port' },
        { time: 'Just now', event: 'Structured schema extracted: { type: "Disruption", location: "Taiwan Port", severity: "High", supplier: "MicroChip Global" }' },
        { time: 'Just now', event: 'SupplyWatch AI ingested event: Risk tier elevated to High.' }
      ]
    };

    // Prepend to alerts feed
    setAlerts((prev) => [tinyFishAlert, ...prev]);

    // Ensure we are viewing dashboard so user sees it right at the top
    if (currentTab !== 'dashboard' && currentTab !== 'risk-alerts') {
      setCurrentTab('dashboard');
    }

    showToast(`⚡ TinyFish Ingested Disruption: ${tinyFishAlert.title} (${tinyFishAlert.supplier})`, 'warning');
  };

  // Handle Review Alternate Suppliers action
  const handleReviewAlternateSuppliers = (alert) => {
    setCurrentTab('suppliers');
    showToast(`Reviewing alternate qualified suppliers for ${alert.supplier}`, 'info');
  };

  // Handle supplier click from suppliers tab to filter alerts
  const handleSelectSupplierAlerts = (supplierName) => {
    setCurrentTab('risk-alerts');
    showToast(`Filtering alerts for ${supplierName}`);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div 
          className="fixed bottom-6 right-6 z-60 animate-in slide-in-from-bottom-5 duration-300 max-w-md"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-800">
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : toastMessage.type === 'warning' ? (
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            ) : (
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />
            )}
            <p className="text-xs font-medium text-slate-200">{toastMessage.text}</p>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        activeAlertCount={activeAlertsCount}
        highRiskCount={highRiskCount}
        supplierCount={supplierCount}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Navbar Header */}
        <Navbar
          currentTab={currentTab}
          activeAlertCount={activeAlertsCount}
          onSimulateNewAlert={handleSimulateNewAlert}
          onStartTinyFishScan={() => setIsTinyFishScanning(true)}
          setMobileOpen={setMobileOpen}
          onNotificationClick={() => setCurrentTab('risk-alerts')}
        />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          {/* Top stats row: displayed on Dashboard and Risk Alerts view */}
          {(currentTab === 'dashboard' || currentTab === 'risk-alerts') && (
            <TopStatsRow
              supplierCount={supplierCount}
              activeAlertsCount={activeAlertsCount}
              highRiskCount={highRiskCount}
              onStatClick={(statId) => {
                if (statId === 'suppliers') setCurrentTab('suppliers');
                if (statId === 'active-alerts' || statId === 'high-risk') setCurrentTab('risk-alerts');
              }}
            />
          )}

          {/* Tab 1: Dashboard View */}
          {currentTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Risk Alert Feed (Core User Requirement) */}
              <RiskAlertFeed
                alerts={alerts}
                onViewDetails={setSelectedAlert}
                onToggleResolve={handleToggleResolve}
                onSimulateNewAlert={handleSimulateNewAlert}
                onResetAlerts={handleResetAlerts}
              />

              {/* Supplementary Enterprise Insights: Supplier Risk Distribution & Live Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 cols: Quick Monitored Suppliers Snapshot */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-sans">
                        High-Priority Supplier Health
                      </h3>
                      <p className="text-xs text-slate-500">
                        Top suppliers with active telemetry and lead-time monitoring
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentTab('suppliers')}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
                    >
                      <span>View All 15</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {suppliers.slice(0, 5).map((sup) => (
                      <div key={sup.id} className="py-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="text-base">{sup.flag}</span>
                          <div>
                            <span className="font-bold text-slate-900 block">{sup.name}</span>
                            <span className="text-slate-500 text-[11px]">{sup.category}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="hidden sm:block text-right">
                            <span className="font-mono font-semibold text-slate-700 block">{sup.leadTime}</span>
                            <span className="text-[10px] text-slate-400">Avg Lead Time</span>
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded-full font-bold text-[11px] border ${
                              sup.riskRating.includes('High')
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : sup.riskRating.includes('Medium')
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            {sup.riskRating}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right col: AI Mitigation Engine Summary */}
                <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-white/10 border border-white/20">
                        <Sparkles className="w-5 h-5 text-indigo-300" />
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                        ACTIVE RADAR
                      </span>
                    </div>

                    <h3 className="text-lg font-bold tracking-tight mb-2 font-sans">
                      Prescriptive Mitigation
                    </h3>
                    <p className="text-xs text-indigo-200 leading-relaxed mb-6">
                      SupplyWatch AI automatically cross-references port congestion, weather models, and tier-2 vendor capacity to recommend immediate freight reroutes.
                    </p>

                    <div className="space-y-3 text-xs">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <span className="text-slate-300">Average Disruption Lead</span>
                        <span className="font-bold text-white">+3.2 Days Ahead</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <span className="text-slate-300">Estimated Cost Avoidance</span>
                        <span className="font-bold text-emerald-400 font-mono">$2.4M YTD</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-[11px] text-indigo-300">
                    <span>Engine: Sentinel-4.8</span>
                    <span className="font-semibold text-white">team BYTE HEADS</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Suppliers Directory */}
          {currentTab === 'suppliers' && (
            <SuppliersView
              suppliers={suppliers}
              onSelectSupplierAlerts={handleSelectSupplierAlerts}
            />
          )}

          {/* Tab 3: Dedicated Risk Alerts View */}
          {currentTab === 'risk-alerts' && (
            <div className="space-y-6">
              <RiskAlertFeed
                alerts={alerts}
                onViewDetails={setSelectedAlert}
                onToggleResolve={handleToggleResolve}
                onSimulateNewAlert={handleSimulateNewAlert}
                onResetAlerts={handleResetAlerts}
              />
            </div>
          )}

          {/* Tab 4: Settings View */}
          {currentTab === 'settings' && (
            <SettingsView onToast={showToast} />
          )}
        </main>
      </div>

      {/* Interactive 'View Details' Slide-over Modal */}
      {selectedAlert && (
        <AlertDetailsModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          onToggleResolve={handleToggleResolve}
          onActionTriggered={(msg) => showToast(msg, 'success')}
          onReviewAlternateSuppliers={handleReviewAlternateSuppliers}
        />
      )}

      {/* TinyFish Live Scanner Terminal Modal */}
      <TinyFishTerminalModal
        isOpen={isTinyFishScanning}
        onClose={() => setIsTinyFishScanning(false)}
        onScanComplete={handleTinyFishScanComplete}
      />
    </div>
  );
}
