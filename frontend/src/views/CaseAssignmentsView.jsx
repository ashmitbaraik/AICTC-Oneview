import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/common/KpiCard';
import { StatusBadge, PriorityBadge, BureauBadge } from '../components/common/Badge';
import {
  UserCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  RotateCcw,
  Users,
  Download,
  ChevronRight,
  MoreVertical,
  Calendar,
  Building2,
  RefreshCw,
  FolderOpen
} from 'lucide-react';

export const CaseAssignmentsView = () => {
  const {
    assignments,
    complaints,
    selectedAssignmentId,
    setSelectedAssignmentId,
    navigateTo,
    setModalState,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bureauFilter, setBureauFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Filter assignments
  const filteredAssignments = assignments.filter((item) => {
    const matchSearch =
      item.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchTab =
      activeTab === 'All' ||
      (activeTab === 'Assigned' && item.currentStatus === 'Assigned') ||
      (activeTab === 'Pending' && item.currentStatus === 'Pending') ||
      (activeTab === 'Overdue' && item.currentStatus === 'Overdue');

    const matchBureau = bureauFilter === 'All' || item.bureau === bureauFilter;
    const matchStatus = statusFilter === 'All' || item.currentStatus === statusFilter;
    const matchPriority = priorityFilter === 'All' || item.priority === priorityFilter;

    return matchSearch && matchTab && matchBureau && matchStatus && matchPriority;
  });

  // Selected assignment detail
  const activeAssignment =
    assignments.find((a) => a.caseId === selectedAssignmentId) || assignments[0];

  const handleBulkAssign = () => {
    showToast('Bulk assignment dialog opened for selected items', 'info');
  };

  return (
    <div className="page-container">
      {/* Header & Breadcrumbs */}
      <div className="page-header">
        <div className="breadcrumbs">
          <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('dashboard')}>Home</span>
          <ChevronRight size={12} />
          <span className="current">Case Assignments</span>
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">
              <UserCheck size={24} color="#1e56d0" />
              Case Assignments
            </h1>
            <p className="page-subtitle">
              View, assign and manage complaint cases across Bureaus/Cells. Track ownership, status and next actions.
            </p>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards matching Screenshot 8 */}
      <div className="kpi-grid-4">
        <KpiCard
          label="Total Assigned Cases"
          value="248"
          trend="12%"
          trendType="positive"
          icon={FolderOpen}
          iconBg="#eff6ff"
          iconColor="#2563eb"
        />
        <KpiCard
          label="My Assigned Cases"
          value="32"
          trend="8%"
          trendType="positive"
          icon={UserCheck}
          iconBg="#ecfdf5"
          iconColor="#059669"
        />
        <KpiCard
          label="Pending Actions"
          value="56"
          trend="15%"
          trendType="positive"
          icon={Clock}
          iconBg="#fffbeb"
          iconColor="#d97706"
        />
        <KpiCard
          label="Overdue Cases"
          value="14"
          trend="30%"
          trendType="negative"
          icon={AlertTriangle}
          iconBg="#fef2f2"
          iconColor="#dc2626"
        />
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-input-wrapper">
          <input
            type="text"
            className="filter-input"
            style={{ paddingLeft: '14px' }}
            placeholder="Search by Case ID, Institute, Subject, or Officer..."
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
          <option value="Assigned">Assigned</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          className="filter-select"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button className="btn btn-primary" onClick={() => {}}>
          <Search size={14} /> Search
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => {
            setSearchQuery('');
            setBureauFilter('All');
            setStatusFilter('All');
            setPriorityFilter('All');
          }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* Tabs matching Screenshot 12 */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'All' ? 'active' : ''}`}
          onClick={() => setActiveTab('All')}
        >
          All Cases <span className="tab-count-badge">48</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'Assigned' ? 'active' : ''}`}
          onClick={() => setActiveTab('Assigned')}
        >
          Assigned <span className="tab-count-badge">32</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'Pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('Pending')}
        >
          Pending <span className="tab-count-badge" style={{ background: '#fef3c7', color: '#b45309' }}>12</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'Overdue' ? 'active' : ''}`}
          onClick={() => setActiveTab('Overdue')}
        >
          Overdue <span className="tab-count-badge" style={{ background: '#fee2e2', color: '#b91c1c' }}>4</span>
        </button>
      </div>

      {/* Main Split Layout: Table on Left + Assignment Details Drawer on Right */}
      <div className="split-view-container">
        {/* Left Side: Cases Table */}
        <div className="split-view-main">
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div className="card-title">
                <Users size={16} color="#1e56d0" />
                <span>Case Assignments ({filteredAssignments.length})</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-secondary btn-sm" onClick={handleBulkAssign}>
                  <Users size={13} /> Bulk Assignment
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => showToast('Exporting assignment registry...', 'info')}
                >
                  <Download size={13} /> Export CSV
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '30px' }}><input type="checkbox" /></th>
                    <th style={{ width: '30px' }}>#</th>
                    <th>Case ID</th>
                    <th>Case Type</th>
                    <th>Institute Name</th>
                    <th>Subject</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Assigned To</th>
                    <th>Created On</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssignments.map((row, idx) => {
                    const isSelected = row.caseId === selectedAssignmentId;
                    return (
                      <tr
                        key={row.id}
                        className={isSelected ? 'selected' : ''}
                        onClick={() => setSelectedAssignmentId(row.caseId)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td><input type="checkbox" onClick={(e) => e.stopPropagation()} /></td>
                        <td>{idx + 1}</td>
                        <td style={{ fontWeight: 600, color: '#1e56d0', fontFamily: 'monospace' }}>
                          {row.caseId}
                        </td>
                        <td>
                          <span style={{ fontSize: '11px', padding: '2px 7px', background: '#f1f5f9', borderRadius: '4px' }}>
                            {row.caseType}
                          </span>
                        </td>
                        <td style={{ fontWeight: 500, color: '#0f172a' }}>{row.institutionName}</td>
                        <td style={{ fontSize: '12px', color: '#475569', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {row.subject}
                        </td>
                        <td><PriorityBadge priority={row.priority} /></td>
                        <td><StatusBadge status={row.currentStatus} /></td>
                        <td style={{ fontSize: '12px', color: row.assignedTo === 'Not Assigned' ? '#dc2626' : '#0f172a', fontWeight: row.assignedTo === 'Not Assigned' ? 600 : 400 }}>
                          {row.assignedTo}
                        </td>
                        <td style={{ color: '#64748b', fontSize: '11.5px' }}>{row.createdOn}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {row.assignedTo === 'Not Assigned' ? (
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setModalState({ assignCase: true, data: row.caseId });
                                }}
                              >
                                Assign
                              </button>
                            ) : (
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setModalState({ assignCase: true, data: row.caseId });
                                }}
                              >
                                Reassign
                              </button>
                            )}
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateTo('complaint-details', { complaintId: row.caseId });
                              }}
                            >
                              View
                            </button>
                            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                              <MoreVertical size={15} />
                            </button>
                          </div>
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
              <div>Showing 1-{filteredAssignments.length} of 48 cases</div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>‹</button>
                <button className="btn btn-primary btn-sm" style={{ padding: '3px 8px' }}>1</button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>2</button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>3</button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>4</button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>5</button>
                <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>›</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Assignment Details Drawer matching Screenshot 8 */}
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
              <UserCheck size={16} color="#1e56d0" />
              <span>Assignment Details</span>
            </div>
            <PriorityBadge priority={activeAssignment.priority} />
          </div>

          <div style={{ padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
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
                <Building2 size={18} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e56d0', fontFamily: 'monospace' }}>
                  {activeAssignment.caseId}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>{activeAssignment.institutionName}</div>
              </div>
            </div>

            {/* Assignment meta */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11.5px', marginBottom: '16px' }}>
              <div>
                <span style={{ color: '#94a3b8' }}>Category</span>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>{activeAssignment.caseType}</div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Bureau/Cell</span>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>{activeAssignment.bureau}</div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Status</span>
                <div style={{ marginTop: '2px' }}><StatusBadge status={activeAssignment.currentStatus} /></div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Assigned To</span>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>{activeAssignment.assignedTo}</div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Date Assigned</span>
                <div style={{ color: '#475569' }}>{activeAssignment.dateAssigned || activeAssignment.createdOn}</div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Next Action</span>
                <div style={{ color: '#1e56d0', fontWeight: 600 }}>Review documents and verify compliance</div>
              </div>
            </div>

            {/* Case Timeline in Drawer */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
                Case Timeline
              </div>
              <div className="timeline-stepper">
                <div className="timeline-step">
                  <div className="timeline-node completed"></div>
                  <div className="timeline-date">22 Apr 2025 11:32 AM</div>
                  <div className="timeline-title">Case Assigned</div>
                  <div className="timeline-desc">By Admin</div>
                </div>
                <div className="timeline-step">
                  <div className="timeline-node active"></div>
                  <div className="timeline-date">22 Apr 2025 12:15 PM</div>
                  <div className="timeline-title">Under Process</div>
                  <div className="timeline-desc">By Dr. R. Kumar (RB)</div>
                </div>
                <div className="timeline-step">
                  <div className="timeline-node"></div>
                  <div className="timeline-date">Next Action</div>
                  <div className="timeline-title">Review compliance documents</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                className="btn btn-primary"
                style={{ width: '100%', height: '38px', justifyContent: 'center' }}
                onClick={() => setModalState({ assignCase: true, data: activeAssignment.caseId })}
              >
                <UserCheck size={14} /> Reassign Case
              </button>
              <button
                className="btn btn-secondary"
                style={{ width: '100%', height: '38px', justifyContent: 'center' }}
                onClick={() => setModalState({ updateStatus: true, data: activeAssignment.caseId })}
              >
                <RefreshCw size={14} /> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
