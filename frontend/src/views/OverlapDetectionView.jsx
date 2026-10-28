import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/common/KpiCard';
import { StatusBadge, PriorityBadge } from '../components/common/Badge';
import {
  GitCompare,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  RotateCcw,
  ChevronRight,
  Link as LinkIcon,
  Check,
  AlertCircle,
  ExternalLink,
  ShieldAlert,
  Send
} from 'lucide-react';

export const OverlapDetectionView = () => {
  const {
    overlaps,
    selectedOverlapId,
    setSelectedOverlapId,
    activeOverlap,
    submitOverlapDecision,
    navigateTo,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [bureauFilter, setBureauFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Decision form states for the active overlap
  const [decision, setDecision] = useState('Mark as Related');
  const [reason, setReason] = useState('');

  const filteredOverlaps = overlaps.filter((ov) => {
    const matchSearch =
      ov.caseA.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ov.caseB.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ov.institution.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'All' || ov.status === statusFilter;
    const matchBureau = bureauFilter === 'All' || ov.bureauA === bureauFilter || ov.bureauB === bureauFilter;
    return matchSearch && matchStatus && matchBureau;
  });

  const handleDecisionSubmit = (e) => {
    e.preventDefault();
    submitOverlapDecision(activeOverlap.id, decision, reason);
    setReason('');
  };

  return (
    <div className="page-container">
      {/* Header & Breadcrumbs */}
      <div className="page-header">
        <div className="breadcrumbs">
          <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('dashboard')}>Home</span>
          <ChevronRight size={12} />
          <span className="current">Potential Overlap Detection</span>
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">
              <GitCompare size={24} color="#1e56d0" />
              Potential Overlap Detection
            </h1>
            <p className="page-subtitle">
              Identify and review potentially related complaints across different Bureaus/Cells.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Overlap KPI Cards */}
      <div className="kpi-grid-4">
        <KpiCard
          label="Total Potential Overlaps"
          value="18"
          trend="35%"
          trendType="positive"
          icon={AlertCircle}
          iconBg="#fef2f2"
          iconColor="#dc2626"
        />
        <KpiCard
          label="Under Review"
          value="12"
          trend="20%"
          trendType="positive"
          icon={Clock}
          iconBg="#eff6ff"
          iconColor="#2563eb"
        />
        <KpiCard
          label="Marked as Related"
          value="4"
          trend="33%"
          trendType="positive"
          icon={CheckCircle2}
          iconBg="#ecfdf5"
          iconColor="#059669"
        />
        <KpiCard
          label="Dismissed"
          value="2"
          trend="0%"
          trendType="positive"
          icon={XCircle}
          iconBg="#fff1f2"
          iconColor="#e11d48"
        />
      </div>

      {/* Filter Bar matching Screenshot 7 */}
      <div className="filter-bar">
        <div className="filter-input-wrapper">
          <input
            type="text"
            className="filter-input"
            style={{ paddingLeft: '14px' }}
            placeholder="Search by complaint ID, institution, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={bureauFilter}
          onChange={(e) => setBureauFilter(e.target.value)}
        >
          <option value="All">All Bureaus/Cells</option>
          <option value="RB">Regulation Bureau (RB)</option>
          <option value="PGRC">Public Grievance (PGRC)</option>
          <option value="Regional Office">Regional Offices</option>
        </select>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Under Review">Under Review</option>
          <option value="Pending">Pending</option>
          <option value="Marked as Related">Marked as Related</option>
          <option value="Dismissed">Dismissed</option>
        </select>

        <button className="btn btn-primary" onClick={() => {}}>
          <Search size={14} /> Search
        </button>

        <button className="btn btn-secondary" onClick={() => { setSearchQuery(''); setBureauFilter('All'); setStatusFilter('All'); }}>
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* Main Split Layout: Table on Left + Overlap Alert Details Drawer on Right */}
      <div className="split-view-container">
        {/* Left Side: Overlap Alerts Table */}
        <div className="split-view-main">
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div className="card-title">
                <ShieldAlert size={16} color="#dc2626" />
                <span>Potential Overlap Alerts ({filteredOverlaps.length})</span>
              </div>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '30px' }}>
                      <input type="checkbox" />
                    </th>
                    <th style={{ width: '30px' }}>#</th>
                    <th>Case IDs</th>
                    <th>Institution</th>
                    <th>Categories</th>
                    <th>Matching Reasons</th>
                    <th>Similarity Score</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOverlaps.map((ov, idx) => {
                    const isSelected = ov.id === selectedOverlapId;
                    return (
                      <tr
                        key={ov.id}
                        className={isSelected ? 'selected' : ''}
                        onClick={() => setSelectedOverlapId(ov.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td><input type="checkbox" onClick={(e) => e.stopPropagation()} /></td>
                        <td>{idx + 1}</td>
                        <td>
                          <div style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '12px' }}>
                            <div style={{ color: '#1e56d0' }}>{ov.caseA}</div>
                            <div style={{ color: '#0284c7' }}>{ov.caseB}</div>
                          </div>
                        </td>
                        <td style={{ fontWeight: 600, color: '#0f172a' }}>{ov.institution}</td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            <span style={{ fontSize: '10.5px', padding: '1px 6px', background: '#eff6ff', color: '#1d4ed8', borderRadius: '4px' }}>
                              {ov.categories[0]}
                            </span>
                            <span style={{ fontSize: '10.5px', padding: '1px 6px', background: '#f5f3ff', color: '#6d28d9', borderRadius: '4px' }}>
                              {ov.categories[1]}
                            </span>
                          </div>
                        </td>
                        <td style={{ fontSize: '11.5px', color: '#475569', maxWidth: '180px' }}>
                          <ul style={{ paddingLeft: '14px', margin: 0 }}>
                            {ov.matchingReasons.slice(0, 2).map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          {/* Similarity Score Circle Meter */}
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '38px',
                              height: '38px',
                              borderRadius: '50%',
                              border: `3px solid ${ov.similarityScore >= 80 ? '#ef4444' : ov.similarityScore >= 70 ? '#f59e0b' : '#3b82f6'}`,
                              fontSize: '11px',
                              fontWeight: 700,
                              color: ov.similarityScore >= 80 ? '#dc2626' : ov.similarityScore >= 70 ? '#d97706' : '#2563eb'
                            }}
                          >
                            {ov.similarityScore}%
                          </div>
                        </td>
                        <td><PriorityBadge priority={ov.priority} /></td>
                        <td><StatusBadge status={ov.status} /></td>
                        <td>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedOverlapId(ov.id);
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
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
              <div>Showing 1-{filteredOverlaps.length} of 18 potential overlaps</div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>‹</button>
                <button className="btn btn-primary btn-sm" style={{ padding: '3px 8px' }}>1</button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>2</button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>3</button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>›</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Overlap Alert Details & Review Decision Form */}
        <div className="split-view-drawer" style={{ width: '420px', minWidth: '420px' }}>
          <div
            style={{
              padding: '16px 18px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>
              <ShieldAlert size={17} color="#dc2626" />
              <span>Overlap Alert Details</span>
            </div>
            <StatusBadge status={activeOverlap.status} />
          </div>

          <div style={{ padding: '18px' }}>
            {/* Side-by-Side Case Comparison Cards matching Screenshot 7 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                gap: '8px',
                alignItems: 'center',
                marginBottom: '16px'
              }}
            >
              {/* Case A */}
              <div
                style={{
                  border: '1px solid #bfdbfe',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#f8fafc',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#1e56d0', fontFamily: 'monospace' }}>
                  {activeOverlap.caseA}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#0f172a', margin: '2px 0' }}>
                  {activeOverlap.institution}
                </div>
                <span style={{ fontSize: '10px', padding: '1px 6px', background: '#eff6ff', color: '#1e56d0', borderRadius: '4px' }}>
                  {activeOverlap.categoryA}
                </span>
                <div style={{ fontSize: '9.5px', color: '#64748b', marginTop: '4px' }}>
                  {activeOverlap.dateA}
                </div>
              </div>

              {/* Link Icon Circle */}
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#eff6ff',
                  color: '#1e56d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <LinkIcon size={14} />
              </div>

              {/* Case B */}
              <div
                style={{
                  border: '1px solid #ddd6fe',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#f8fafc',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#6d28d9', fontFamily: 'monospace' }}>
                  {activeOverlap.caseB}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#0f172a', margin: '2px 0' }}>
                  {activeOverlap.institution}
                </div>
                <span style={{ fontSize: '10px', padding: '1px 6px', background: '#f5f3ff', color: '#7c3aed', borderRadius: '4px' }}>
                  {activeOverlap.categoryB}
                </span>
                <div style={{ fontSize: '9.5px', color: '#64748b', marginTop: '4px' }}>
                  {activeOverlap.dateB}
                </div>
              </div>
            </div>

            {/* Matching Reasons Checklist */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Matching Reasons
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {activeOverlap.matchingReasons.map((reason, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '11.5px', color: '#334155' }}>
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: '#dcfce7',
                        color: '#15803d',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px'
                      }}
                    >
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Similarity Score & Priority Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                marginBottom: '16px'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>Similarity Score</div>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    border: '4px solid #ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '15px',
                    fontWeight: 800,
                    color: '#dc2626',
                    margin: '0 auto'
                  }}
                >
                  {activeOverlap.similarityScore}%
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '6px' }}>Priority Level</div>
                <PriorityBadge priority={activeOverlap.priority} />
              </div>
            </div>

            {/* Recommended Action Box */}
            <div
              style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '16px',
                fontSize: '11.5px',
                color: '#1e40af'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '2px' }}>
                <AlertCircle size={14} /> Recommended Action
              </div>
              <p style={{ margin: 0, lineHeight: 1.4 }}>
                {activeOverlap.recommendedAction}
              </p>
            </div>

            {/* Decision Action Form matching Screenshot 7 */}
            <form onSubmit={handleDecisionSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                  Decision
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="overlapDecision"
                      value="Mark as Related"
                      checked={decision === 'Mark as Related'}
                      onChange={(e) => setDecision(e.target.value)}
                    />
                    Mark as Related
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="overlapDecision"
                      value="Dismiss"
                      checked={decision === 'Dismiss'}
                      onChange={(e) => setDecision(e.target.value)}
                    />
                    Dismiss (with reason)
                  </label>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '14px' }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add your reason (optional)..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', height: '38px', justifyContent: 'center' }}
              >
                <Send size={14} /> Submit Decision
              </button>

              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <a
                  href="#view"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('complaint-details', { complaintId: activeOverlap.caseA });
                  }}
                  style={{
                    fontSize: '11.5px',
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <ExternalLink size={12} /> View Full Details
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
