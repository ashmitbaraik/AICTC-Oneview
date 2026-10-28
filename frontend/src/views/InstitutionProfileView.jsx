import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge, PriorityBadge, BureauBadge } from '../components/common/Badge';
import {
  Building2,
  ChevronRight,
  MapPin,
  Phone,
  Globe,
  GraduationCap,
  Edit,
  FileText,
  Clock,
  CheckCircle2,
  ArrowRightLeft,
  PieChart as PieIcon,
  TrendingUp,
  Download,
  AlertTriangle
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

export const InstitutionProfileView = () => {
  const { activeInstitution, complaints, navigateTo, setModalState } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');
  const [trendRange, setTrendRange] = useState('6M');

  // Institution-related complaints
  const instComplaints = complaints.filter(
    (c) => c.institutionName.toLowerCase() === activeInstitution.name.toLowerCase()
  );

  // Institution trend data
  const instTrendData = [
    { month: 'Nov 2024', total: 5, pending: 4, disposed: 1 },
    { month: 'Dec 2024', total: 7, pending: 5, disposed: 2 },
    { month: 'Jan 2025', total: 9, pending: 6, disposed: 3 },
    { month: 'Feb 2025', total: 12, pending: 8, disposed: 4 },
    { month: 'Mar 2025', total: 15, pending: 10, disposed: 5 },
    { month: 'Apr 2025', total: 18, pending: 12, disposed: 6 }
  ];

  const categoryBreakdown = activeInstitution.categoryBreakdown || [
    { name: 'Academic', value: 33, count: 6, color: '#2563eb' },
    { name: 'Infrastructure', value: 22, count: 4, color: '#f97316' },
    { name: 'Affiliation', value: 17, count: 3, color: '#10b981' },
    { name: 'Examination', value: 11, count: 2, color: '#8b5cf6' },
    { name: 'Faculty', value: 11, count: 2, color: '#06b6d4' },
    { name: 'Others', value: 6, count: 1, color: '#64748b' }
  ];

  const tabs = [
    'Overview',
    'Complaint History',
    'Active Complaints',
    'Disposed Complaints',
    'Statistics',
    'Documents',
    'Timeline'
  ];

  return (
    <div className="page-container">
      {/* Header & Breadcrumbs */}
      <div className="page-header">
        <div className="breadcrumbs">
          <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('dashboard')}>Home</span>
          <ChevronRight size={12} />
          <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('institutions')}>Institution Directory</span>
          <ChevronRight size={12} />
          <span className="current">{activeInstitution.name}</span>
        </div>
      </div>

      {/* Hero Banner Card matching Screenshot 4 */}
      <div className="card inst-profile-banner">
        {/* Campus Photo */}
        <div
          style={{
            width: '280px',
            minWidth: '280px',
            backgroundImage: `url(${activeInstitution.photo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
            position: 'relative',
            borderRadius: '10px 0 0 10px'
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(3px)',
              color: 'white',
              fontSize: '11px',
              padding: '3px 8px',
              borderRadius: '4px',
              fontWeight: 600
            }}
          >
            {activeInstitution.name} Campus
          </div>
        </div>

        {/* Institution Info Header Details */}
        <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                  {activeInstitution.name}
                </h1>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                  {activeInstitution.location}
                </p>
              </div>

              {/* Status and Type Badges */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ padding: '6px 12px', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                  <div style={{ fontSize: '10.5px', color: '#1e40af' }}>Institution Type</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e56d0' }}>{activeInstitution.type}</div>
                </div>
                <div style={{ padding: '6px 12px', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                  <div style={{ fontSize: '10.5px', color: '#065f46' }}>Status</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669' }}></span>
                    {activeInstitution.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Badges bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '6px' }}>
              <span
                style={{
                  padding: '3px 10px',
                  borderRadius: '20px',
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  fontSize: '11.5px',
                  fontWeight: 600
                }}
              >
                {activeInstitution.type}
              </span>
              <span
                style={{
                  padding: '3px 10px',
                  borderRadius: '20px',
                  backgroundColor: '#f1f5f9',
                  color: '#334155',
                  fontSize: '11.5px',
                  fontWeight: 600
                }}
              >
                AICTE Permanent ID: {activeInstitution.aicteId}
              </span>
            </div>
          </div>

          {/* Contact & Meta Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              fontSize: '12px',
              color: '#475569',
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #f1f5f9',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} color="#64748b" />
              <span>{activeInstitution.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={14} color="#64748b" />
              <span>{activeInstitution.contactNumber}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={14} color="#64748b" />
              <span style={{ color: '#2563eb' }}>{activeInstitution.website}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GraduationCap size={14} color="#64748b" />
              <span>Affiliated to: <strong>{activeInstitution.affiliatedUniversity}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {tab === 'Active Complaints' && (
              <span className="tab-count-badge" style={{ background: '#fef2f2', color: '#dc2626' }}>
                {activeInstitution.activeComplaints}
              </span>
            )}
            {tab === 'Disposed Complaints' && (
              <span className="tab-count-badge" style={{ background: '#ecfdf5', color: '#059669' }}>
                {activeInstitution.disposedComplaints}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content: Overview */}
      {activeTab === 'Overview' && (
        <>
          {/* Top 3 Cards Grid: Institution Details, Complaint Summary, Category Distribution */}
          <div className="inst-profile-tri-grid">
            {/* Institution Details Card */}
            <div className="card" style={{ marginBottom: 0 }}>
              <div className="card-header">
                <div className="card-title">
                  <Building2 size={16} color="#1e56d0" />
                  <span>Institution Details</span>
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => alert('Editing institution profile...')}
                >
                  <Edit size={13} /> Edit
                </button>
              </div>
              <div className="card-body" style={{ fontSize: '12.5px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td style={{ padding: '6px 0', color: '#64748b', width: '42%' }}>Institution Name</td>
                      <td style={{ padding: '6px 0', fontWeight: 600, color: '#0f172a' }}>{activeInstitution.name}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '6px 0', color: '#64748b' }}>AICTE Permanent ID</td>
                      <td style={{ padding: '6px 0', fontWeight: 600, color: '#0f172a' }}>{activeInstitution.aicteId}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '6px 0', color: '#64748b' }}>Type</td>
                      <td style={{ padding: '6px 0', color: '#0f172a' }}>{activeInstitution.type}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '6px 0', color: '#64748b' }}>Location</td>
                      <td style={{ padding: '6px 0', color: '#0f172a' }}>{activeInstitution.location}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '6px 0', color: '#64748b' }}>Establishment Year</td>
                      <td style={{ padding: '6px 0', color: '#0f172a' }}>{activeInstitution.established}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '6px 0', color: '#64748b' }}>Affiliated University</td>
                      <td style={{ padding: '6px 0', color: '#0f172a' }}>{activeInstitution.affiliatedUniversity}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '6px 0', color: '#64748b' }}>Website</td>
                      <td style={{ padding: '6px 0', color: '#2563eb' }}>{activeInstitution.website}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '6px 0', color: '#64748b' }}>Contact Number</td>
                      <td style={{ padding: '6px 0', color: '#0f172a' }}>{activeInstitution.contactNumber}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '6px 0', color: '#64748b' }}>Email</td>
                      <td style={{ padding: '6px 0', color: '#0f172a' }}>{activeInstitution.email}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '6px 0', color: '#64748b' }}>Principal Name</td>
                      <td style={{ padding: '6px 0', fontWeight: 600, color: '#0f172a' }}>{activeInstitution.principalName}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Complaint Summary 4-Box Grid */}
            <div className="card" style={{ marginBottom: 0 }}>
              <div className="card-header">
                <div className="card-title">
                  <FileText size={16} color="#059669" />
                  <span>Complaint Summary</span>
                </div>
              </div>
              <div
                className="card-body"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  alignContent: 'center'
                }}
              >
                <div
                  style={{
                    backgroundColor: '#eff6ff',
                    border: '1px solid #dbeafe',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center'
                  }}
                >
                  <FileText size={18} color="#2563eb" style={{ margin: '0 auto 4px' }} />
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#1e40af' }}>
                    {activeInstitution.totalComplaints}
                  </div>
                  <div style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 600 }}>Total Complaints</div>
                </div>

                <div
                  style={{
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fef3c7',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center'
                  }}
                >
                  <AlertTriangle size={18} color="#d97706" style={{ margin: '0 auto 4px' }} />
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#92400e' }}>
                    {activeInstitution.activeComplaints}
                  </div>
                  <div style={{ fontSize: '11px', color: '#d97706', fontWeight: 600 }}>Active Complaints</div>
                </div>

                <div
                  style={{
                    backgroundColor: '#ecfdf5',
                    border: '1px solid #d1fae5',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center'
                  }}
                >
                  <CheckCircle2 size={18} color="#059669" style={{ margin: '0 auto 4px' }} />
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#065f46' }}>
                    {activeInstitution.disposedComplaints}
                  </div>
                  <div style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>Disposed Complaints</div>
                </div>

                <div
                  style={{
                    backgroundColor: '#f5f3ff',
                    border: '1px solid #ede9fe',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center'
                  }}
                >
                  <ArrowRightLeft size={18} color="#7c3aed" style={{ margin: '0 auto 4px' }} />
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#5b21b6' }}>
                    {activeInstitution.transferredComplaints || 0}
                  </div>
                  <div style={{ fontSize: '11px', color: '#7c3aed', fontWeight: 600 }}>Transferred Complaints</div>
                </div>
              </div>
            </div>

            {/* Complaint Category Distribution Donut Chart */}
            <div className="card" style={{ marginBottom: 0 }}>
              <div className="card-header">
                <div className="card-title">
                  <PieIcon size={16} color="#7c3aed" />
                  <span>Complaint Category Distribution</span>
                </div>
              </div>
              <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px' }}>
                {/* Donut with 18 Total */}
                <div style={{ width: '130px', height: '170px', position: 'relative', flexShrink: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryBreakdown}
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {categoryBreakdown.map((entry, index) => (
                          <Cell key={`cat-${index}`} fill={entry.color} />
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
                    <div style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                      {activeInstitution.totalComplaints}
                    </div>
                    <div style={{ fontSize: '9px', color: '#64748b' }}>Total</div>
                  </div>
                </div>

                {/* Legend list */}
                <div style={{ flex: 1, fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {categoryBreakdown.map((item) => (
                    <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }}></span>
                        <span style={{ color: '#334155' }}>{item.name}</span>
                      </div>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>
                        {item.count} <span style={{ color: '#94a3b8', fontWeight: 400 }}>({item.value}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Recent Complaints (Related to this Institution) + Trend Line Chart */}
          <div className="inst-profile-bottom-grid">
            {/* Recent Complaints Table */}
            <div className="card" style={{ marginBottom: 0 }}>
              <div className="card-header">
                <div className="card-title">
                  <FileText size={16} color="#2563eb" />
                  <span>Recent Complaints (Related to this Institution)</span>
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
                      <th>Category</th>
                      <th>Bureau/Cell</th>
                      <th>Status</th>
                      <th>Priority</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {instComplaints.slice(0, 5).map((comp) => (
                      <tr key={comp.id}>
                        <td style={{ fontWeight: 600, color: '#1e56d0' }}>{comp.id}</td>
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

            {/* Complaint Trend Line Chart */}
            <div className="card" style={{ marginBottom: 0 }}>
              <div className="card-header">
                <div className="card-title">
                  <TrendingUp size={16} color="#059669" />
                  <span>Complaint Trend</span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {['6M', '1Y', '2Y'].map((rng) => (
                    <button
                      key={rng}
                      onClick={() => setTrendRange(rng)}
                      style={{
                        padding: '3px 8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        border: '1px solid #cbd5e1',
                        borderRadius: '4px',
                        background: trendRange === rng ? '#1e56d0' : '#ffffff',
                        color: trendRange === rng ? '#ffffff' : '#475569',
                        cursor: 'pointer'
                      }}
                    >
                      {rng}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card-body" style={{ height: '240px', padding: '10px 14px 10px 0' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={instTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} stroke="#cbd5e1" />
                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} stroke="#cbd5e1" />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="disposed" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Other tabs fallback */}
      {activeTab !== 'Overview' && (
        <div className="card" style={{ padding: '30px', textAlign: 'center' }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', marginBottom: '8px' }}>
            {activeTab} for {activeInstitution.name}
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '500px', margin: '0 auto 16px' }}>
            Displaying detailed records, regulatory audit attachments, and chronological cell movements for this technical institute.
          </p>
          <button className="btn btn-secondary" onClick={() => setActiveTab('Overview')}>
            ← Back to Overview
          </button>
        </div>
      )}
    </div>
  );
};
