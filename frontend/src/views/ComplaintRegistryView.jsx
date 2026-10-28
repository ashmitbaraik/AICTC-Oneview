import React, { useState } from 'react';
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
  Search,
  RotateCcw,
  Plus,
  Download,
  ChevronRight,
  MoreVertical,
  Calendar,
  Filter
} from 'lucide-react';

export const ComplaintRegistryView = () => {
  const {
    complaints,
    navigateTo,
    kpis,
    setModalState,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [bureauFilter, setBureauFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Filter complaints
  const filteredComplaints = complaints.filter((comp) => {
    const matchSearch =
      comp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchBureau = bureauFilter === 'All' || comp.bureau === bureauFilter || comp.bureauFullName?.includes(bureauFilter);
    const matchStatus = statusFilter === 'All' || comp.status === statusFilter;
    const matchCategory = categoryFilter === 'All' || comp.category === categoryFilter;
    const matchPriority = priorityFilter === 'All' || comp.priority === priorityFilter;

    return matchSearch && matchBureau && matchStatus && matchCategory && matchPriority;
  });

  const handleReset = () => {
    setSearchQuery('');
    setBureauFilter('All');
    setStatusFilter('All');
    setCategoryFilter('All');
    setPriorityFilter('All');
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'Complaint ID,Institution Name,Category,Bureau/Cell,Priority,Status,Date Submitted,Assigned To',
        ...filteredComplaints.map(
          (c) =>
            `"${c.id}","${c.institutionName}","${c.category}","${c.bureau}","${c.priority}","${c.status}","${c.dateSubmitted}","${c.assignedTo}"`
        )
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aicte_complaints_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Complaint records exported to CSV successfully!', 'success');
  };

  return (
    <div className="page-container">
      {/* Header & Breadcrumbs */}
      <div className="page-header">
        <div className="breadcrumbs">
          <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('dashboard')}>Home</span>
          <ChevronRight size={12} />
          <span className="current">Complaint Registry</span>
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">
              <FileText size={24} color="#1e56d0" />
              Complaint Registry
            </h1>
            <p className="page-subtitle">
              View and manage all institution-related complaints across AICTE Bureaus/Cells.
            </p>
          </div>
        </div>
      </div>

      {/* 7 KPI Cards */}
      <div className="kpi-grid-7">
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
          label="Pending"
          value="412"
          trend="6%"
          trendType="positive"
          icon={Clock}
          iconBg="#fffbeb"
          iconColor="#d97706"
        />
        <KpiCard
          label="Under Process"
          value="336"
          trend="9%"
          trendType="positive"
          icon={RotateCw}
          iconBg="#f0f9ff"
          iconColor="#0284c7"
        />
        <KpiCard
          label="Disposed"
          value="438"
          trend="18%"
          trendType="positive"
          icon={CheckCircle2}
          iconBg="#ecfdf5"
          iconColor="#059669"
        />
        <KpiCard
          label="Transferred"
          value="62"
          trend="4%"
          trendType="positive"
          icon={ArrowRightLeft}
          iconBg="#f5f3ff"
          iconColor="#7c3aed"
        />
        <KpiCard
          label="Overdue"
          value="54"
          trend="7%"
          trendType="negative"
          icon={AlertTriangle}
          iconBg="#fef2f2"
          iconColor="#dc2626"
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

      {/* Advanced Filter Bar matching Screenshot 5 */}
      <div className="filter-bar">
        <div className="filter-input-wrapper">
          <input
            type="text"
            className="filter-input"
            style={{ paddingLeft: '14px' }}
            placeholder="Search complaint ID, institution, category..."
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
          <option value="PGRC">Public Grievance Redressal (PGRC)</option>
          <option value="Other Cells">Other Cells</option>
          <option value="Regional Office">Regional Offices</option>
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
          <option value="Transferred">Transferred</option>
          <option value="Under Review">Under Review</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          className="filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Academic">Academic</option>
          <option value="Affiliation">Affiliation</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Faculty">Faculty</option>
          <option value="Examination">Examination</option>
          <option value="Fees">Fees</option>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748b' }}>
          <Calendar size={15} />
          <span>Select Date Range</span>
        </div>

        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>

        <button className="btn btn-primary" onClick={() => {}}>
          <Filter size={14} /> Apply Filters
        </button>
      </div>

      {/* Complaints List Table Container */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FileText size={16} color="#1e56d0" />
            <span>Complaints List ({filteredComplaints.length})</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={handleExportCSV}>
              <Download size={14} /> Export CSV
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setModalState({ registerComplaint: true })}
            >
              <Plus size={15} /> Register Complaint
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th>Complaint ID</th>
                <th>Institution Name</th>
                <th>Category</th>
                <th>Bureau/Cell</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Date Submitted</th>
                <th>Assigned To</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((comp, idx) => (
                <tr key={comp.id}>
                  <td>{idx + 1}</td>
                  <td style={{ fontWeight: 600, color: '#1e56d0', fontFamily: 'monospace' }}>
                    {comp.id}
                  </td>
                  <td style={{ fontWeight: 500, color: '#0f172a' }}>
                    {comp.institutionName}
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '2px 8px',
                        background: '#f1f5f9',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#475569'
                      }}
                    >
                      {comp.category}
                    </span>
                  </td>
                  <td>
                    <BureauBadge bureau={comp.bureau} />
                  </td>
                  <td>
                    <PriorityBadge priority={comp.priority} />
                  </td>
                  <td>
                    <StatusBadge status={comp.status} />
                  </td>
                  <td style={{ color: '#64748b', fontSize: '12.5px' }}>
                    {comp.dateSubmitted}
                  </td>
                  <td style={{ color: '#334155', fontSize: '12px' }}>
                    {comp.assignedTo}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => navigateTo('complaint-details', { complaintId: comp.id })}
                      >
                        View
                      </button>
                      <button
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer with pagination matching screenshot */}
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
          <div>Showing 1-{filteredComplaints.length} of 1,248 complaints</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
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
  );
};
