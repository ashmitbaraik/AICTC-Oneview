import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/common/KpiCard';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  Calendar,
  Download,
  ChevronRight,
  TrendingUp,
  PieChart as PieIcon,
  Sparkles,
  FileSpreadsheet,
  FileText,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import {
  analyticsTrendData,
  analyticsCategoriesData,
  analyticsBureauData,
  topInstitutionsByComplaints,
  recentReportsList
} from '../data/mockData';

export const AnalyticsReportsView = () => {
  const { navigateTo, showToast } = useApp();

  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [bureau, setBureau] = useState('All');
  const [category, setCategory] = useState('All');

  const handleGenerateReport = () => {
    showToast('Generating AICTE Analytical Performance Report...', 'info');
    setTimeout(() => {
      showToast('Report generated successfully! Ready for download.', 'success');
    }, 1200);
  };

  return (
    <div className="page-container">
      {/* Header & Breadcrumbs */}
      <div className="page-header">
        <div className="breadcrumbs">
          <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('dashboard')}>Home</span>
          <ChevronRight size={12} />
          <span className="current">Analytics & Reports</span>
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">
              <BarChart3 size={24} color="#1e56d0" />
              Analytics & Reports
            </h1>
            <p className="page-subtitle">
              View detailed analytics, generate reports and track performance across the system.
            </p>
          </div>
        </div>
      </div>

      {/* 5 KPI Cards matching Screenshot 10 */}
      <div className="kpi-grid-5">
        <KpiCard
          label="Total Complaints"
          value="1,248"
          trend="12%"
          trendType="positive"
          icon={FileText}
          iconBg="#eff6ff"
          iconColor="#2563eb"
        />
        <KpiCard
          label="Resolved Complaints"
          value="892"
          trend="18%"
          trendType="positive"
          icon={CheckCircle2}
          iconBg="#ecfdf5"
          iconColor="#059669"
        />
        <KpiCard
          label="Avg. Resolution Time"
          value="7.4 days"
          trend="32%"
          trendType="positive"
          icon={Clock}
          iconBg="#f0f9ff"
          iconColor="#0284c7"
        />
        <KpiCard
          label="Pending Complaints"
          value="356"
          trend="5%"
          trendType="negative"
          icon={AlertTriangle}
          iconBg="#fef2f2"
          iconColor="#dc2626"
        />
        <KpiCard
          label="Institutions Involved"
          value="218"
          trend="11%"
          trendType="positive"
          icon={Building2}
          iconBg="#f5f3ff"
          iconColor="#7c3aed"
        />
      </div>

      {/* Filter Bar with Generate Report Button */}
      <div className="filter-bar">
        <select
          className="filter-select"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="Last Quarter">Last Quarter</option>
          <option value="Year 2024-25">Academic Year 2024-25</option>
        </select>

        <select
          className="filter-select"
          value={bureau}
          onChange={(e) => setBureau(e.target.value)}
        >
          <option value="All">All Bureaus/Cells</option>
          <option value="RB">Regulation Bureau (RB)</option>
          <option value="PGRC">Public Grievance (PGRC)</option>
          <option value="Regional Office">Regional Offices</option>
        </select>

        <select className="filter-select">
          <option value="All">All Institutions</option>
          <option value="BIT">BIT Sindri</option>
          <option value="Global">Global Tech Institute</option>
        </select>

        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Academic">Academic</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Affiliation">Affiliation</option>
          <option value="Faculty">Faculty</option>
          <option value="Examination">Examination</option>
        </select>

        <select className="filter-select">
          <option value="All">All Statuses</option>
          <option value="Resolved">Resolved</option>
          <option value="Pending">Pending</option>
        </select>

        <button
          className="btn btn-primary"
          style={{ marginLeft: 'auto' }}
          onClick={handleGenerateReport}
        >
          <Download size={14} /> Generate Report
        </button>
      </div>

      {/* Row 1: Complaints Trend, Category Donut, Bureau Bar Chart */}
      <div className="analytics-charts-grid">
        {/* Complaints Trend Area Chart */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <TrendingUp size={16} color="#2563eb" />
              <span>Complaints Trend</span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              <strong>24 Apr:</strong> 148 complaints
            </div>
          </div>
          <div className="card-body" style={{ height: '220px', padding: '10px 14px 10px 0' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsTrendData}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748b' }} stroke="#cbd5e1" />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} stroke="#cbd5e1" />
                <Tooltip />
                <Area type="monotone" dataKey="complaints" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Complaints by Category Donut Chart */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <PieIcon size={16} color="#06b6d4" />
              <span>Complaints by Category</span>
            </div>
          </div>
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px' }}>
            <div style={{ width: '120px', height: '170px', position: 'relative', flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsCategoriesData}
                    innerRadius={42}
                    outerRadius={60}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {analyticsCategoriesData.map((entry, index) => (
                      <Cell key={`cell-cat-${index}`} fill={entry.color} />
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
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>1,248</div>
                <div style={{ fontSize: '9px', color: '#64748b' }}>Total</div>
              </div>
            </div>

            <div style={{ flex: 1, fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {analyticsCategoriesData.map((cat) => (
                <div key={cat.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: cat.color }}></span>
                    <span style={{ color: '#334155' }}>{cat.name}</span>
                  </div>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>
                    {cat.percentage} <span style={{ color: '#94a3b8', fontWeight: 400 }}>({cat.value})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Complaints by Bureau/Cell Bar Chart */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <Building2 size={16} color="#7c3aed" />
              <span>Complaints by Bureau/Cell</span>
            </div>
          </div>
          <div className="card-body" style={{ height: '220px', padding: '10px 14px 10px 0' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsBureauData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="bureau" tick={{ fontSize: 10, fill: '#64748b' }} stroke="#cbd5e1" />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} stroke="#cbd5e1" />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Top Institutions, Recent Reports, Key Insights */}
      <div className="analytics-bottom-grid">
        {/* Top Institutions by Complaints */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <Building2 size={16} color="#1e56d0" />
              <span>Top Institutions by Complaints</span>
            </div>
            <button
              onClick={() => navigateTo('institutions')}
              style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '11px', cursor: 'pointer' }}
            >
              View All
            </button>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '30px' }}>#</th>
                  <th>Institution Name</th>
                  <th>Total Complaints</th>
                  <th>Resolved</th>
                  <th>Pending</th>
                </tr>
              </thead>
              <tbody>
                {topInstitutionsByComplaints.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{idx + 1}</td>
                    <td style={{ fontWeight: 600, color: '#0f172a' }}>{item.name}</td>
                    <td style={{ fontWeight: 700, color: '#1e56d0' }}>{item.total}</td>
                    <td style={{ color: '#059669', fontWeight: 600 }}>{item.resolved}</td>
                    <td style={{ color: '#dc2626', fontWeight: 600 }}>{item.pending}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Reports List */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <FileSpreadsheet size={16} color="#059669" />
              <span>Recent Reports</span>
            </div>
            <button
              style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '11px', cursor: 'pointer' }}
            >
              View All
            </button>
          </div>
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recentReportsList.map((rep, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '11.5px'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{rep.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: '10px' }}>
                    {rep.date} | {rep.format} • {rep.size}
                  </div>
                </div>
                <button
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#2563eb' }}
                  onClick={() => showToast(`Downloading ${rep.name}...`, 'success')}
                >
                  <Download size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights matching Screenshot 10 */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <Sparkles size={16} color="#f59e0b" />
              <span>Key Insights</span>
            </div>
          </div>
          <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <ArrowUpRight size={15} />
              </div>
              <div style={{ color: '#334155', lineHeight: 1.4 }}>
                Complaints increased by <strong>12%</strong> compared to last month, mainly in the Academic category.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#f5f3ff',
                  color: '#7c3aed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Clock size={15} />
              </div>
              <div style={{ color: '#334155', lineHeight: 1.4 }}>
                Average resolution time improved by <strong>32%</strong> (7.4 days vs. 10.9 days).
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#fffbeb',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <AlertTriangle size={15} />
              </div>
              <div style={{ color: '#334155', lineHeight: 1.4 }}>
                <strong>BIT Sindri</strong> has the highest number of complaints (156), accounting for 12% of total.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#eff6ff',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <TrendingUp size={15} />
              </div>
              <div style={{ color: '#334155', lineHeight: 1.4 }}>
                Affiliation-related complaints show a rising trend in the last 7 days across Regional Centres.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
