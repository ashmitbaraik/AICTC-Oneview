import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/common/KpiCard';
import { StatusBadge, BureauBadge } from '../components/common/Badge';
import {
  Building2,
  AlertTriangle,
  FileText,
  CheckCircle2,
  Search,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  MoreVertical,
  MapPin,
  Globe,
  Calendar,
  Layers
} from 'lucide-react';

export const InstitutionDirectoryView = () => {
  const {
    institutions,
    navigateTo,
    selectedInstitutionId,
    setSelectedInstitutionId,
    activeInstitution,
    complaints
  } = useApp();

  const [nameFilter, setNameFilter] = useState('');
  const [idFilter, setIdFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('All');
  const [bureauFilter, setBureauFilter] = useState('All');

  // Filtered list
  const filteredInstitutions = institutions.filter((inst) => {
    const matchName = inst.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchId = inst.aicteId.toLowerCase().includes(idFilter.toLowerCase());
    const matchState = stateFilter === 'All' || inst.state === stateFilter;
    const matchBureau = bureauFilter === 'All' || inst.primaryBureau === bureauFilter || inst.associatedBureaus?.some(b => b.includes(bureauFilter));
    return matchName && matchId && matchState && matchBureau;
  });

  const handleReset = () => {
    setNameFilter('');
    setIdFilter('');
    setStateFilter('All');
    setBureauFilter('All');
  };

  // Complaints related to currently selected preview institution
  const previewComplaints = complaints.filter(
    (c) => c.institutionName.toLowerCase() === activeInstitution.name.toLowerCase()
  );

  return (
    <div className="page-container">
      {/* Header & Breadcrumbs */}
      <div className="page-header">
        <div className="breadcrumbs">
          <span>Home</span>
          <ChevronRight size={12} />
          <span className="current">Institution Directory</span>
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">
              <Building2 size={24} color="#1e56d0" />
              Institute Directory
            </h1>
            <p className="page-subtitle">
              Search and view detailed information about technical institutions and their associated complaints across AICTE Bureaus/Cells.
            </p>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="kpi-grid-4">
        <KpiCard
          label="Total Institutions"
          value="124"
          icon={Building2}
          iconBg="#eff6ff"
          iconColor="#2563eb"
        />
        <KpiCard
          label="Institutions with Complaints"
          value="86"
          icon={AlertTriangle}
          iconBg="#fef2f2"
          iconColor="#dc2626"
        />
        <KpiCard
          label="Active Complaints"
          value="342"
          icon={FileText}
          iconBg="#fffbeb"
          iconColor="#d97706"
        />
        <KpiCard
          label="Disposed Complaints"
          value="218"
          icon={CheckCircle2}
          iconBg="#ecfdf5"
          iconColor="#059669"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="filter-input-wrapper">
          <input
            type="text"
            className="filter-input"
            style={{ paddingLeft: '14px' }}
            placeholder="Search by Institution Name..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>

        <div className="filter-input-wrapper">
          <input
            type="text"
            className="filter-input"
            style={{ paddingLeft: '14px' }}
            placeholder="Search by AICTE Permanent ID..."
            value={idFilter}
            onChange={(e) => setIdFilter(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
        >
          <option value="All">All States</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Delhi">Delhi</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Telangana">Telangana</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="West Bengal">West Bengal</option>
        </select>

        <select
          className="filter-select"
          value={bureauFilter}
          onChange={(e) => setBureauFilter(e.target.value)}
        >
          <option value="All">All Bureaus/Cells</option>
          <option value="RB">Regulation Bureau (RB)</option>
          <option value="PGRC">Public Grievance (PGRC)</option>
          <option value="Other Cells">Other Cells</option>
        </select>

        <button className="btn btn-primary" onClick={() => {}}>
          <Search size={15} /> Search
        </button>

        <button className="btn btn-secondary" onClick={handleReset}>
          <RotateCcw size={15} /> Reset
        </button>
      </div>

      {/* Main Table + Right Preview Drawer Split View */}
      <div className="split-view-container">
        {/* Left Side: Institutions Table */}
        <div className="split-view-main">
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div className="card-title">
                <span>Institutions ({filteredInstitutions.length})</span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Sort by: <strong>Name (A-Z)</strong>
              </div>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>#</th>
                    <th>Institution Name</th>
                    <th>AICTE ID</th>
                    <th>Location</th>
                    <th>Bureau/Cell</th>
                    <th>Active Complaints</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInstitutions.map((inst, index) => {
                    const isSelected = inst.id === selectedInstitutionId;
                    return (
                      <tr
                        key={inst.id}
                        className={isSelected ? 'selected' : ''}
                        onClick={() => setSelectedInstitutionId(inst.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td>{index + 1}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '6px',
                                background: '#f1f5f9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#1e56d0'
                              }}
                            >
                              <Building2 size={15} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, color: '#0f172a' }}>{inst.name}</div>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>{inst.subtitle}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ color: '#475569', fontFamily: 'monospace' }}>{inst.aicteId}</td>
                        <td style={{ color: '#475569' }}>{inst.location}</td>
                        <td><BureauBadge bureau={inst.primaryBureau} /></td>
                        <td style={{ fontWeight: 600, color: inst.activeComplaints > 10 ? '#dc2626' : '#0f172a' }}>
                          {inst.activeComplaints}
                        </td>
                        <td><StatusBadge status={inst.status} /></td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigateTo('institution-profile', { institutionId: inst.id });
                              }}
                            >
                              View
                            </button>
                            <button
                              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical size={16} />
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
              <div>Showing 1-{filteredInstitutions.length} of {institutions.length} institutions</div>
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

        {/* Right Side: Institution Details Preview Drawer */}
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
              <Building2 size={16} color="#1e56d0" />
              <span>Institution Details</span>
            </div>
            <button
              onClick={() => navigateTo('institution-profile', { institutionId: activeInstitution.id })}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#2563eb',
                fontSize: '11.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              View Full Profile <ExternalLink size={12} />
            </button>
          </div>

          <div style={{ padding: '18px' }}>
            {/* Header info */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: '#eff6ff',
                    color: '#1e56d0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                    {activeInstitution.name}
                  </h3>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>{activeInstitution.subtitle}</div>
                </div>
              </div>
              <StatusBadge status={activeInstitution.status} />
            </div>

            {/* Quick Metadata */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11.5px', marginBottom: '16px' }}>
              <div>
                <span style={{ color: '#94a3b8' }}>AICTE Permanent ID:</span>
                <div style={{ fontWeight: 600, color: '#334155' }}>{activeInstitution.aicteId}</div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Location:</span>
                <div style={{ fontWeight: 600, color: '#334155' }}>{activeInstitution.location}</div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Established:</span>
                <div style={{ fontWeight: 600, color: '#334155' }}>{activeInstitution.established}</div>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Website:</span>
                <div style={{ fontWeight: 600, color: '#2563eb' }}>{activeInstitution.website}</div>
              </div>
            </div>

            {/* Complaint Summary Mini Grid */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Complaint Summary
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center' }}>
                <div style={{ padding: '8px 4px', background: '#fef2f2', borderRadius: '6px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#dc2626' }}>
                    {activeInstitution.activeComplaints}
                  </div>
                  <div style={{ fontSize: '9.5px', color: '#991b1b' }}>Active</div>
                </div>
                <div style={{ padding: '8px 4px', background: '#eff6ff', borderRadius: '6px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0284c7' }}>
                    {activeInstitution.underProcessComplaints || 5}
                  </div>
                  <div style={{ fontSize: '9.5px', color: '#0369a1' }}>In Process</div>
                </div>
                <div style={{ padding: '8px 4px', background: '#f5f3ff', borderRadius: '6px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#7c3aed' }}>
                    {activeInstitution.transferredComplaints || 3}
                  </div>
                  <div style={{ fontSize: '9.5px', color: '#6d28d9' }}>Transferred</div>
                </div>
                <div style={{ padding: '8px 4px', background: '#ecfdf5', borderRadius: '6px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#16a34a' }}>
                    {activeInstitution.disposedComplaints}
                  </div>
                  <div style={{ fontSize: '9.5px', color: '#15803d' }}>Disposed</div>
                </div>
              </div>
            </div>

            {/* Recent Complaints Mini List */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>Recent Complaints</span>
                <button
                  onClick={() => navigateTo('complaints')}
                  style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '11px', cursor: 'pointer' }}
                >
                  View All
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {previewComplaints.slice(0, 3).map((comp) => (
                  <div
                    key={comp.id}
                    onClick={() => navigateTo('complaint-details', { complaintId: comp.id })}
                    style={{
                      padding: '8px 10px',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#1e56d0' }}>{comp.id}</span>
                      <StatusBadge status={comp.status} />
                    </div>
                    <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {comp.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Associated Bureaus/Cells Chips */}
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                Associated Bureaus/Cells
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {activeInstitution.associatedBureaus?.map((b, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '11px',
                      padding: '3px 8px',
                      background: '#eff6ff',
                      color: '#1e56d0',
                      borderRadius: '6px',
                      fontWeight: 500
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
