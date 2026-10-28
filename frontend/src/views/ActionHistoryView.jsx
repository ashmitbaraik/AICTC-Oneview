import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/common/KpiCard';
import { StatusBadge } from '../components/common/Badge';
import {
  History,
  Users,
  MessageSquare,
  RefreshCw,
  Clock,
  Search,
  Filter,
  ChevronRight,
  Download,
  FileText,
  Building2,
  Calendar
} from 'lucide-react';

export const ActionHistoryView = () => {
  const { actions, selectedActionId, setSelectedActionId, navigateTo, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [bureauFilter, setBureauFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredActions = actions.filter((act) => {
    const matchSearch =
      act.complaintId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.performedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.remarks.toLowerCase().includes(searchQuery.toLowerCase());

    const matchType = typeFilter === 'All' || act.actionType === typeFilter;
    const matchStatus = statusFilter === 'All' || act.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const activeAction = actions.find((a) => a.id === selectedActionId) || actions[0];

  return (
    <div className="page-container">
      {/* Header & Breadcrumbs */}
      <div className="page-header">
        <div className="breadcrumbs">
          <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('dashboard')}>Home</span>
          <ChevronRight size={12} />
          <span className="current">Action History</span>
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">
              <History size={24} color="#1e56d0" />
              Action History
            </h1>
            <p className="page-subtitle">
              Track all actions taken on complaints, including assignments, updates, comments and status changes.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar matching Screenshot 9 */}
      <div className="filter-bar">
        <div className="filter-input-wrapper">
          <input
            type="text"
            className="filter-input"
            style={{ paddingLeft: '14px' }}
            placeholder="Search by complaint ID, institution, or action..."
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
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="All">All Action Types</option>
          <option value="Status Update">Status Update</option>
          <option value="Comment">Comment</option>
          <option value="Assignment">Assignment</option>
          <option value="Action Taken">Action Taken</option>
        </select>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Under Process">Under Process</option>
          <option value="Pending">Pending</option>
          <option value="Assigned">Assigned</option>
          <option value="Resolved">Resolved</option>
          <option value="Disposed">Disposed</option>
        </select>

        <button className="btn btn-primary" onClick={() => {}}>
          <Filter size={14} /> Apply Filters
        </button>
      </div>

      {/* 5 KPI Cards matching Screenshot 9 */}
      <div className="kpi-grid-5">
        <KpiCard
          label="Total Actions"
          value="1,248"
          trend="12%"
          trendType="positive"
          icon={History}
          iconBg="#eff6ff"
          iconColor="#2563eb"
        />
        <KpiCard
          label="Assignments"
          value="362"
          trend="18%"
          trendType="positive"
          icon={Users}
          iconBg="#f5f3ff"
          iconColor="#7c3aed"
        />
        <KpiCard
          label="Comments"
          value="498"
          trend="7%"
          trendType="positive"
          icon={MessageSquare}
          iconBg="#f0fdf4"
          iconColor="#16a34a"
        />
        <KpiCard
          label="Status Updates"
          value="318"
          trend="9%"
          trendType="positive"
          icon={RefreshCw}
          iconBg="#ecfeff"
          iconColor="#0891b2"
        />
        <KpiCard
          label="Latest Activity"
          value="Today"
          trend="24 Apr 2025, 11:32 AM"
          trendType="positive"
          trendPeriod=""
          icon={Clock}
          iconBg="#fffbeb"
          iconColor="#d97706"
        />
      </div>

      {/* Main Split Layout: Audit Table + Action Details Drawer */}
      <div className="split-view-container">
        {/* Left Side: Audit Table */}
        <div className="split-view-main">
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div className="card-title">
                <History size={16} color="#1e56d0" />
                <span>Action History (1,248)</span>
              </div>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>#</th>
                    <th>Date & Time</th>
                    <th>Complaint ID</th>
                    <th>Institution Name</th>
                    <th>Action Type</th>
                    <th>Performed By</th>
                    <th>Status</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredActions.map((act, idx) => {
                    const isSelected = act.id === selectedActionId;
                    return (
                      <tr
                        key={act.id}
                        className={isSelected ? 'selected' : ''}
                        onClick={() => setSelectedActionId(act.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{idx + 1}</td>
                        <td style={{ color: '#64748b', fontSize: '12px' }}>{act.dateTime}</td>
                        <td style={{ fontWeight: 600, color: '#1e56d0', fontFamily: 'monospace' }}>
                          {act.complaintId}
                        </td>
                        <td style={{ fontWeight: 500, color: '#0f172a' }}>{act.institutionName}</td>
                        <td>
                          <span
                            style={{
                              fontSize: '11px',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontWeight: 600,
                              background:
                                act.actionType === 'Status Update'
                                  ? '#eff6ff'
                                  : act.actionType === 'Comment'
                                  ? '#fdf2f8'
                                  : act.actionType === 'Assignment'
                                  ? '#f5f3ff'
                                  : '#ecfdf5',
                              color:
                                act.actionType === 'Status Update'
                                  ? '#1d4ed8'
                                  : act.actionType === 'Comment'
                                  ? '#be185d'
                                  : act.actionType === 'Assignment'
                                  ? '#6d28d9'
                                  : '#047857'
                            }}
                          >
                            {act.actionType}
                          </span>
                        </td>
                        <td style={{ fontSize: '12px', color: '#334155' }}>{act.performedBy}</td>
                        <td><StatusBadge status={act.status} /></td>
                        <td style={{ fontSize: '12px', color: '#64748b', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {act.remarks}
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
              <div>Showing 1-{filteredActions.length} of 1,248 actions</div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>‹</button>
                <button className="btn btn-primary btn-sm" style={{ padding: '3px 8px' }}>1</button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>2</button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>3</button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>4</button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>5</button>
                <span style={{ padding: '0 4px', color: '#94a3b8' }}>...</span>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>125</button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>›</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Action Details Drawer matching Screenshot 9 */}
        <div className="split-view-drawer">
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
              <History size={16} color="#1e56d0" />
              <span>Action Details</span>
            </div>
          </div>

          <div style={{ padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: '#eff6ff',
                    color: '#1e56d0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FileText size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e56d0', fontFamily: 'monospace' }}>
                    {activeAction.complaintId}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{activeAction.institutionName}</div>
                </div>
              </div>
              <StatusBadge status={activeAction.status} />
            </div>

            {/* Detailed Timeline Stepper of all actions on this complaint */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                Case Activity Log
              </div>
              <div className="timeline-stepper">
                <div className="timeline-step">
                  <div className="timeline-node active"></div>
                  <div className="timeline-date">24 Apr 2025 11:32 AM</div>
                  <div className="timeline-title">Status Updated</div>
                  <div className="timeline-desc">By Dr. R. Kumar (RB)</div>
                  <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
                    Status changed to Under Process.
                  </div>
                </div>

                <div className="timeline-step">
                  <div className="timeline-node completed"></div>
                  <div className="timeline-date">24 Apr 2025 10:15 AM</div>
                  <div className="timeline-title">Comment Added</div>
                  <div className="timeline-desc">By Ms. P. Singh (PGRC)</div>
                  <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
                    Sent to institute for additional documents.
                  </div>
                </div>

                <div className="timeline-step">
                  <div className="timeline-node completed"></div>
                  <div className="timeline-date">23 Apr 2025 04:20 PM</div>
                  <div className="timeline-title">Assigned</div>
                  <div className="timeline-desc">By Dr. A. Khan (Other)</div>
                  <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
                    Assigned to RB for verification.
                  </div>
                </div>

                <div className="timeline-step">
                  <div className="timeline-node completed"></div>
                  <div className="timeline-date">22 Apr 2025 02:15 PM</div>
                  <div className="timeline-title">Complaint Created</div>
                  <div className="timeline-desc">By Admin</div>
                  <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>
                    New complaint registered.
                  </div>
                </div>
              </div>
            </div>

            {/* Related Documents list matching Screenshot 9 */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Related Documents
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  style={{
                    padding: '8px 10px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11.5px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>affiliation_letter.pdf</div>
                    <div style={{ color: '#94a3b8', fontSize: '10.5px' }}>22 Apr 2025 11:45 AM</div>
                  </div>
                  <button
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#2563eb' }}
                    onClick={() => showToast('Downloading affiliation_letter.pdf', 'info')}
                  >
                    <Download size={14} />
                  </button>
                </div>

                <div
                  style={{
                    padding: '8px 10px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11.5px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>institute_document.jpg</div>
                    <div style={{ color: '#94a3b8', fontSize: '10.5px' }}>22 Apr 2025 11:46 AM</div>
                  </div>
                  <button
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#2563eb' }}
                    onClick={() => showToast('Downloading institute_document.jpg', 'info')}
                  >
                    <Download size={14} />
                  </button>
                </div>

                <div
                  style={{
                    padding: '8px 10px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11.5px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>previous_approval.pdf</div>
                    <div style={{ color: '#94a3b8', fontSize: '10.5px' }}>20 Apr 2025 04:15 PM</div>
                  </div>
                  <button
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#2563eb' }}
                    onClick={() => showToast('Downloading previous_approval.pdf', 'info')}
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
