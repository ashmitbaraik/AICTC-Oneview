import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Save, Shield, Bell, Cpu, Database, Check } from 'lucide-react';

export const SettingsView = () => {
  const { showToast } = useApp();

  const [overlapThreshold, setOverlapThreshold] = useState(70);
  const [slaWarningDays, setSlaWarningDays] = useState(7);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoDeduplication, setAutoDeduplication] = useState(true);
  const [realtimeSync, setRealtimeSync] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    showToast('System configuration saved successfully!', 'success');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <Settings size={24} color="#1e56d0" />
          System Settings & AI Engine Configuration
        </h1>
        <p className="page-subtitle">
          Configure cross-bureau overlap detection thresholds, automated SLA alerts, and integration parameters.
        </p>
      </div>

      <form onSubmit={handleSave} style={{ maxWidth: '800px' }}>
        {/* Overlap Engine Configuration */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Cpu size={16} color="#1e56d0" />
              <span>Cross-Bureau AI Overlap Detection Engine</span>
            </div>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">
                Similarity Score Alert Threshold: <strong>{overlapThreshold}%</strong>
              </label>
              <input
                type="range"
                min="50"
                max="95"
                step="5"
                value={overlapThreshold}
                onChange={(e) => setOverlapThreshold(e.target.value)}
                style={{ width: '100%', accentColor: '#1e56d0' }}
              />
              <p style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
                Complaints with matching criteria score above {overlapThreshold}% across Regulation Bureau (RB) and PGRC will trigger high-priority coordination alerts.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                <input
                  type="checkbox"
                  checked={autoDeduplication}
                  onChange={(e) => setAutoDeduplication(e.target.checked)}
                  style={{ accentColor: '#1e56d0' }}
                />
                Enable Semantic Institution Name & Permanent ID entity resolution
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                <input
                  type="checkbox"
                  checked={realtimeSync}
                  onChange={(e) => setRealtimeSync(e.target.checked)}
                  style={{ accentColor: '#1e56d0' }}
                />
                Real-time cross-cell synchronization between AICTE Regional Offices and HQ
              </label>
            </div>
          </div>
        </div>

        {/* SLA & Timeline Reminders */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Bell size={16} color="#d97706" />
              <span>SLA & Escalation Rules</span>
            </div>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Pre-Overdue Warning Window</label>
              <select
                className="form-control"
                value={slaWarningDays}
                onChange={(e) => setSlaWarningDays(e.target.value)}
              >
                <option value="3">3 Days Before Expected Disposal</option>
                <option value="5">5 Days Before Expected Disposal</option>
                <option value="7">7 Days Before Expected Disposal (Default)</option>
                <option value="10">10 Days Before Expected Disposal</option>
              </select>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                style={{ accentColor: '#1e56d0' }}
              />
              Send instant email notification to Bureau Head when potential overlap is marked as "High Priority"
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '14px' }}>
          <Save size={16} /> Save Configuration
        </button>
      </form>
    </div>
  );
};
