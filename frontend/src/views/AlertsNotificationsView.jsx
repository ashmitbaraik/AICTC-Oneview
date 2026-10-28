import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/common/KpiCard';
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Info,
  Search,
  Calendar,
  MoreVertical,
  ChevronRight,
  ShieldAlert,
  Clock
} from 'lucide-react';

export const AlertsNotificationsView = () => {
  const { alerts, markAlertAsRead, navigateTo, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredAlerts = alerts.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchTab =
      activeTab === 'All' ||
      (activeTab === 'Alerts' && item.type === 'Alert') ||
      (activeTab === 'Notifications' && item.type === 'Notification') ||
      (activeTab === 'System Updates' && item.type === 'System Update');

    const matchType = typeFilter === 'All' || item.type === typeFilter;

    return matchSearch && matchTab && matchType;
  });

  const getTypeBadge = (type) => {
    switch (type) {
      case 'Alert':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 9px', borderRadius: '12px', background: '#fee2e2', color: '#b91c1c', fontSize: '11px', fontWeight: 600 }}>
            <AlertTriangle size={12} /> Alert
          </span>
        );
      case 'Notification':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 9px', borderRadius: '12px', background: '#eff6ff', color: '#1d4ed8', fontSize: '11px', fontWeight: 600 }}>
            <Bell size={12} /> Notification
          </span>
        );
      case 'System Update':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 9px', borderRadius: '12px', background: '#ecfdf5', color: '#047857', fontSize: '11px', fontWeight: 600 }}>
            <CheckCircle2 size={12} /> System Update
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      {/* Header & Breadcrumbs */}
      <div className="page-header">
        <div className="breadcrumbs">
          <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('dashboard')}>Home</span>
          <ChevronRight size={12} />
          <span className="current">Alerts & Notification</span>
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">
              <Bell size={24} color="#1e56d0" />
              Alerts & Notifications
            </h1>
            <p className="page-subtitle">
              Stay updated with the latest alerts, system notifications and important updates.
            </p>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards matching Screenshot 13 */}
      <div className="kpi-grid-4">
        <KpiCard
          label="Total Alerts"
          value="7"
          trend="Requires attention"
          trendType="negative"
          trendPeriod=""
          icon={AlertTriangle}
          iconBg="#fef2f2"
          iconColor="#dc2626"
        />
        <KpiCard
          label="New Notifications"
          value="12"
          trend="Since last login"
          trendType="positive"
          trendPeriod=""
          icon={Bell}
          iconBg="#eff6ff"
          iconColor="#2563eb"
        />
        <KpiCard
          label="Resolved"
          value="28"
          trend="In last 7 days"
          trendType="positive"
          trendPeriod=""
          icon={CheckCircle2}
          iconBg="#ecfdf5"
          iconColor="#059669"
        />
        <KpiCard
          label="System Updates"
          value="5"
          trend="Important updates"
          trendType="positive"
          trendPeriod=""
          icon={Info}
          iconBg="#f5f3ff"
          iconColor="#7c3aed"
        />
      </div>

      {/* Category Tabs with color dots matching Screenshot 13 */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'All' ? 'active' : ''}`}
          onClick={() => setActiveTab('All')}
        >
          All (7)
        </button>
        <button
          className={`tab-btn ${activeTab === 'Alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('Alerts')}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444' }}></span>
          Alerts (7)
        </button>
        <button
          className={`tab-btn ${activeTab === 'Notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('Notifications')}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#3b82f6' }}></span>
          Notifications (12)
        </button>
        <button
          className={`tab-btn ${activeTab === 'System Updates' ? 'active' : ''}`}
          onClick={() => setActiveTab('System Updates')}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#7c3aed' }}></span>
          System Updates (5)
        </button>
      </div>

      {/* Search and Filters */}
      <div className="filter-bar">
        <div className="filter-input-wrapper">
          <input
            type="text"
            className="filter-input"
            style={{ paddingLeft: '14px' }}
            placeholder="Search alerts and notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Alert">Alerts Only</option>
          <option value="Notification">Notifications Only</option>
          <option value="System Update">System Updates Only</option>
        </select>

        <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={14} /> Date Range
        </button>
      </div>

      {/* Table matching Screenshot 13 */}
      <div className="card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Title</th>
                <th>Message</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlerts.map((alt) => (
                <tr
                  key={alt.id}
                  onClick={() => markAlertAsRead(alt.id)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: alt.status === 'Unread' ? '#fffaf8' : '#ffffff'
                  }}
                >
                  <td>{getTypeBadge(alt.type)}</td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{alt.title}</td>
                  <td style={{ color: '#475569', fontSize: '12.5px', maxWidth: '380px' }}>
                    {alt.message}
                  </td>
                  <td style={{ color: '#64748b', fontSize: '11.5px', whiteSpace: 'nowrap' }}>
                    {alt.dateTime}
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: alt.status === 'Unread' ? '#fee2e2' : '#ecfdf5',
                        color: alt.status === 'Unread' ? '#b91c1c' : '#047857'
                      }}
                    >
                      {alt.status}
                    </span>
                  </td>
                  <td>
                    <button
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast(`Alert: ${alt.title}`, 'info');
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            borderTop: '1px solid #e2e8f0',
            fontSize: '12px',
            color: '#64748b'
          }}
        >
          <div>Showing 1-{filteredAlerts.length} of 7 alerts and notifications</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>‹</button>
            <button className="btn btn-primary btn-sm" style={{ padding: '3px 8px' }}>1</button>
            <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>›</button>
          </div>
        </div>
      </div>
    </div>
  );
};
