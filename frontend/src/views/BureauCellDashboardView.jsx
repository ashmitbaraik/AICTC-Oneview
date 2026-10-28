import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/common/KpiCard';
import { StatusBadge } from '../components/common/Badge';
import {
  Layers,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  PieChart as PieIcon,
  Calendar,
  ChevronRight,
  FileText,
  Building2,
  ExternalLink
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  bureauApplicationsTrend,
  bureauCellWiseDistribution
} from '../data/mockData';

export const BureauCellDashboardView = () => {
  const { bureauApps, navigateTo, showToast } = useApp();

  return (
    <div className="page-container">
      {/* Header & Date Range */}
      <div className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title">
              <Layers size={24} color="#1e56d0" />
              Bureau / Cell Dashboard
            </h1>
            <p className="page-subtitle">
              Overview of bureau/cell activities, applications and key metrics.
            </p>
          </div>

          <div className="date-indicator">
            <Calendar size={15} color="#2563eb" />
            <span>01 Jun 2025 - 30 Jun 2025</span>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards matching Screenshot 14 */}
      <div className="kpi-grid-4">
        <KpiCard
          label="Total Applications"
          value="248"
          trend="12%"
          trendType="positive"
          trendPeriod="from last month"
          icon={FileText}
          iconBg="#eff6ff"
          iconColor="#2563eb"
        />
        <KpiCard
          label="Approved Applications"
          value="176"
          trend="15%"
          trendType="positive"
          trendPeriod="from last month"
          icon={CheckCircle2}
          iconBg="#ecfdf5"
          iconColor="#059669"
        />
        <KpiCard
          label="Under Review"
          value="54"
          trend="8%"
          trendType="negative"
          trendPeriod="from last month"
          icon={Clock}
          iconBg="#fffbeb"
          iconColor="#d97706"
        />
        <KpiCard
          label="Rejected Applications"
          value="18"
          trend="5%"
          trendType="negative"
          trendPeriod="from last month"
          icon={XCircle}
          iconBg="#fef2f2"
          iconColor="#dc2626"
        />
      </div>

      {/* Charts Row matching Screenshot 14 */}
      <div className="bureau-charts-grid">
        {/* Applications Trend Multi-line Chart */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <TrendingUp size={16} color="#2563eb" />
              <span>Applications Trend</span>
            </div>
            <div style={{ display: 'flex', gap: '14px', fontSize: '11px', color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }}></span> Total
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Approved
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span> Rejected
              </span>
            </div>
          </div>

          <div className="card-body" style={{ height: '240px', padding: '10px 14px 10px 0' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bureauApplicationsTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748b' }} stroke="#cbd5e1" />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} stroke="#cbd5e1" />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bureau / Cell Wise Distribution Donut Chart */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <PieIcon size={16} color="#06b6d4" />
              <span>Bureau / Cell Wise Distribution</span>
            </div>
          </div>

          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px' }}>
            <div style={{ width: '130px', height: '170px', position: 'relative', flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bureauCellWiseDistribution}
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {bureauCellWiseDistribution.map((entry, index) => (
                      <Cell key={`cell-bc-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none'
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>248</div>
                <div style={{ fontSize: '9px', color: '#64748b' }}>Total</div>
              </div>
            </div>

            <div style={{ flex: 1, fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {bureauCellWiseDistribution.map((cell) => (
                <div key={cell.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cell.color }}></span>
                    <span style={{ color: '#334155' }}>{cell.name}</span>
                  </div>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>
                    {cell.count} <span style={{ color: '#94a3b8', fontWeight: 400 }}>({cell.percentage})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications Table matching Screenshot 14 */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FileText size={16} color="#1e56d0" />
            <span>Recent Applications</span>
          </div>
          <button
            style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}
          >
            View All →
          </button>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Institute Name</th>
                <th>Bureau / Cell</th>
                <th>Application Type</th>
                <th>Submitted On</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bureauApps.map((app) => (
                <tr key={app.id}>
                  <td style={{ fontWeight: 600, color: '#1e56d0', fontFamily: 'monospace' }}>
                    {app.id}
                  </td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>
                    {app.instituteName}
                  </td>
                  <td>
                    <span style={{ fontSize: '11.5px', padding: '2px 7px', background: '#eff6ff', color: '#1d4ed8', borderRadius: '4px' }}>
                      {app.bureau}
                    </span>
                  </td>
                  <td>{app.applicationType}</td>
                  <td style={{ color: '#64748b' }}>{app.submittedOn}</td>
                  <td>
                    <StatusBadge status={app.status} />
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => showToast(`Opening application ${app.id}...`, 'info')}
                    >
                      <ExternalLink size={12} /> View
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
};
