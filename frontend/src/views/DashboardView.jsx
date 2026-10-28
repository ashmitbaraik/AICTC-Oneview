import React from 'react';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/common/KpiCard';
import { StatusBadge, PriorityBadge, BureauBadge } from '../components/common/Badge';
import {
  FileText,
  Clock,
  RotateCw,
  CheckCircle2,
  ArrowRightLeft,
  AlertTriangle,
  GitCompare,
  TrendingUp,
  PieChart as PieIcon,
  BarChart3,
  Calendar,
  AlertCircle
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import {
  dashboardTrends,
  bureauDistributionData,
  bureauWorkloadData
} from '../data/mockData';

export const DashboardView = () => {
  const { currentUser, complaints, navigateTo, kpis } = useApp();

  const recentComplaints = complaints.slice(0, 6);

  return (
    <div className="page-container">
      {/* Welcome Banner */}
      <div className="page-header">
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Welcome Back, {currentUser.name}</h1>
            <p className="page-subtitle">
              Here's what's happening with institution-related complaints across AICTE Bureaus/Cells.
            </p>
          </div>
        </div>
      </div>

      {/* 7 KPI Cards Row */}
      <div className="kpi-grid-7">
        <KpiCard
          label="Total Complaints"
          value="1,248"
          trend="12%"
          trendType="positive"
          icon={FileText}
          iconBg="#eff6ff"
          iconColor="#2563eb"
          onClick={() => navigateTo('complaints')}
        />
        <KpiCard
          label="Pending"
          value="412"
          trend="6%"
          trendType="positive"
          icon={Clock}
          iconBg="#fffbeb"
          iconColor="#d97706"
          onClick={() => navigateTo('complaints')}
        />
        <KpiCard
          label="Under Process"
          value="336"
          trend="9%"
          trendType="positive"
          icon={RotateCw}
          iconBg="#f0f9ff"
          iconColor="#0284c7"
          onClick={() => navigateTo('complaints')}
        />
        <KpiCard
          label="Disposed"
          value="438"
          trend="18%"
          trendType="positive"
          icon={CheckCircle2}
          iconBg="#ecfdf5"
          iconColor="#059669"
          onClick={() => navigateTo('complaints')}
        />
        <KpiCard
          label="Transferred"
          value="62"
          trend="4%"
          trendType="positive"
          icon={ArrowRightLeft}
          iconBg="#f5f3ff"
          iconColor="#7c3aed"
          onClick={() => navigateTo('complaints')}
        />
        <KpiCard
          label="Overdue"
          value="54"
          trend="7%"
          trendType="negative"
          icon={AlertTriangle}
          iconBg="#fef2f2"
          iconColor="#dc2626"
          onClick={() => navigateTo('alerts')}
        />
        <KpiCard
          label="Potential Overlaps"
          value="18"
          trend="35%"
          trendType="positive"
          icon={GitCompare}
          iconBg="#ecfeff"
          iconColor="#0891b2"
          onClick={() => navigateTo('overlap-detection')}
        />
      </div>

      {/* Middle Row: Trend Chart, Donut Chart, Quick Alerts */}
      <div className="dashboard-charts-grid">
        {/* Complaint Trends Line Chart */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <TrendingUp size={16} color="#2563eb" />
              <span>Complaint Trends</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }}></span> Total
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Resolved
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span> Pending
              </span>
            </div>
          </div>
          <div className="card-body" style={{ height: '240px', padding: '10px 14px 10px 0' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} stroke="#cbd5e1" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}
                />
                <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bureau-wise Distribution Donut Chart */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <PieIcon size={16} color="#06b6d4" />
              <span>Bureau-wise Distribution</span>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px' }}>
            {/* Donut Chart with Center Text */}
            <div style={{ width: '130px', height: '180px', position: 'relative', flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bureauDistributionData}
                    innerRadius={45}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {bureauDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
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
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>1,248</div>
                <div style={{ fontSize: '9px', color: '#64748b' }}>Complaints</div>
              </div>
            </div>

            {/* Legend List */}
            <div style={{ flex: 1, fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {bureauDistributionData.map((item) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color, flexShrink: 0 }}></span>
                    <span style={{ color: '#334155' }}>{item.name}</span>
                  </div>
                  <div style={{ fontWeight: 600, color: '#0f172a', marginLeft: '6px' }}>
                    {item.percentage} <span style={{ color: '#94a3b8', fontWeight: 400 }}>({item.value})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Alerts Card */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <AlertCircle size={16} color="#ef4444" />
              <span>Quick Alerts</span>
            </div>
            <button
              onClick={() => navigateTo('alerts')}
              style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}
            >
              View All →
            </button>
          </div>
          <div className="card-body" style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div
              onClick={() => navigateTo('alerts')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: '8px',
                backgroundColor: '#fef2f2',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={15} color="#dc2626" />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#991b1b' }}>Overdue Complaints</div>
                  <div style={{ fontSize: '10.5px', color: '#b91c1c' }}>Action required for 54 cases</div>
                </div>
              </div>
              <span className="badge badge-overdue" style={{ fontSize: '11px', fontWeight: 700 }}>54</span>
            </div>

            <div
              onClick={() => navigateTo('case-assignments')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: '8px',
                backgroundColor: '#fffbeb',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={15} color="#d97706" />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#92400e' }}>Upcoming Deadlines (7 days)</div>
                  <div style={{ fontSize: '10.5px', color: '#b45309' }}>12 cases need attention</div>
                </div>
              </div>
              <span className="badge badge-pending" style={{ fontSize: '11px', fontWeight: 700 }}>12</span>
            </div>

            <div
              onClick={() => navigateTo('overlap-detection')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: '8px',
                backgroundColor: '#eff6ff',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GitCompare size={15} color="#2563eb" />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e40af' }}>Potential Overlaps</div>
                  <div style={{ fontSize: '10.5px', color: '#3b82f6' }}>18 cases need review</div>
                </div>
              </div>
              <span className="badge badge-process" style={{ fontSize: '11px', fontWeight: 700 }}>18</span>
            </div>

            <div
              onClick={() => navigateTo('case-assignments')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                borderRadius: '8px',
                backgroundColor: '#ecfdf5',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={15} color="#059669" />
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#065f46' }}>New Assignments</div>
                  <div style={{ fontSize: '10.5px', color: '#047857' }}>5 new cases assigned</div>
                </div>
              </div>
              <span className="badge badge-resolved" style={{ fontSize: '11px', fontWeight: 700 }}>5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Complaints Table + Bureau Workload Bar Chart */}
      <div className="dashboard-bottom-grid">
        {/* Recent Complaints Table */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <FileText size={16} color="#2563eb" />
              <span>Recent Complaints</span>
            </div>
            <button
              onClick={() => navigateTo('complaints')}
              style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer' }}
            >
              View All →
            </button>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Complaint ID</th>
                  <th>Institution Name</th>
                  <th>Category</th>
                  <th>Bureau/Cell</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentComplaints.map((comp) => (
                  <tr key={comp.id}>
                    <td style={{ fontWeight: 600, color: '#1e56d0' }}>{comp.id}</td>
                    <td style={{ fontWeight: 500 }}>{comp.institutionName}</td>
                    <td>{comp.category}</td>
                    <td><BureauBadge bureau={comp.bureau} /></td>
                    <td><StatusBadge status={comp.status} /></td>
                    <td><PriorityBadge priority={comp.priority} /></td>
                    <td style={{ color: '#64748b' }}>{comp.dateSubmitted}</td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => navigateTo('complaint-details', { complaintId: comp.id })}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bureau-wise Workload Stacked Bar Chart */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <BarChart3 size={16} color="#7c3aed" />
              <span>Bureau-wise Workload</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#f59e0b' }}></span> Pending
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#2563eb' }}></span> Disposed
              </span>
            </div>
          </div>
          <div className="card-body" style={{ height: '280px', padding: '10px 14px 10px 0' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bureauWorkloadData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="bureau" tick={{ fontSize: 10, fill: '#64748b' }} stroke="#cbd5e1" />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} stroke="#cbd5e1" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="pending" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                <Bar dataKey="disposed" stackId="a" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
