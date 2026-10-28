import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusBadge, PriorityBadge, BureauBadge } from '../components/common/Badge';
import {
  ArrowLeft,
  Copy,
  Building2,
  Calendar,
  User,
  Clock,
  Download,
  UploadCloud,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  RefreshCw,
  UserCheck,
  FileCheck2,
  FileText,
  AlertTriangle
} from 'lucide-react';

export const ComplaintDetailsView = () => {
  const {
    activeComplaint,
    navigateTo,
    setModalState,
    showToast,
    institutions
  } = useApp();

  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = [
    'Overview',
    `Documents (${activeComplaint.attachments?.length || 3})`,
    `Related Cases (${activeComplaint.relatedCaseIds?.length || 1})`,
    'Action History',
    'Comments'
  ];

  const handleCopyId = () => {
    navigator.clipboard.writeText(activeComplaint.id);
    showToast(`Complaint ID ${activeComplaint.id} copied to clipboard!`, 'info');
  };

  const matchedInst = institutions.find(
    (i) => i.name.toLowerCase() === activeComplaint.institutionName.toLowerCase()
  ) || institutions[0];

  return (
    <div className="page-container">
      {/* Breadcrumbs & Navigation */}
      <div className="page-header">
        <div className="breadcrumbs">
          <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('dashboard')}>Home</span>
          <ChevronRight size={12} />
          <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('complaints')}>Complaint Registry</span>
          <ChevronRight size={12} />
          <span className="current">Complaint Details</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigateTo('complaints')}
          >
            <ArrowLeft size={14} /> Back to List
          </button>
          <div>
            <h1 className="page-title" style={{ fontSize: '18px' }}>
              <FileText size={20} color="#1e56d0" />
              Complaint Details
            </h1>
            <p className="page-subtitle" style={{ fontSize: '12px' }}>
              View complete information about the complaint, including its status, history and assigned details.
            </p>
          </div>
        </div>
      </div>

      {/* Top Banner Metadata Card matching Screenshot 6 */}
      <div
        className="card"
        style={{
          padding: '18px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {/* Complaint ID */}
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Complaint ID</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', fontFamily: 'monospace' }}>
                {activeComplaint.id}
              </span>
              <button
                onClick={handleCopyId}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
                title="Copy ID"
              >
                <Copy size={15} />
              </button>
              <PriorityBadge priority={activeComplaint.priority} />
            </div>
          </div>

          {/* Institution */}
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Institution</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <Building2 size={16} color="#1e56d0" />
              <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>
                {activeComplaint.institutionName}
              </span>
              <span style={{ fontSize: '11.5px', color: '#64748b' }}>({activeComplaint.aicteId})</span>
            </div>
          </div>

          {/* Category */}
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Category</div>
            <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '13px', marginTop: '2px' }}>
              {activeComplaint.category} <span style={{ color: '#64748b', fontWeight: 400 }}>({activeComplaint.subCategory})</span>
            </div>
          </div>

          {/* Bureau / Cell */}
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Bureau/Cell</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <BureauBadge bureau={activeComplaint.bureau} />
              <span style={{ fontSize: '11.5px', color: '#64748b' }}>({activeComplaint.bureauFullName || 'Regulation Bureau'})</span>
            </div>
          </div>

          {/* Status */}
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Status</div>
            <div style={{ marginTop: '2px' }}>
              <StatusBadge status={activeComplaint.status} />
            </div>
          </div>

          {/* Assigned To */}
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Assigned To</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', marginTop: '2px' }}>
              {activeComplaint.assignedTo}
            </div>
          </div>

          {/* Date Submitted */}
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Date Submitted</div>
            <div style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>
              {activeComplaint.dateSubmitted}
            </div>
          </div>
        </div>

        {/* Right Badge: Complaint Type */}
        <div
          style={{
            padding: '8px 16px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Building2 size={18} color="#2563eb" />
          <div>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase' }}>Complaint Type</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e56d0' }}>Institution Related</div>
          </div>
        </div>
      </div>

      {/* Sub Tabs Navigation */}
      <div className="tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab.split(' ')[0] ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.split(' ')[0])}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Layout matching Screenshot 6 */}
      <div className="complaint-details-grid">
        {/* Left Column: Complaint Details & Assignment */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Complaint Information Card */}
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div className="card-title">
                <FileText size={16} color="#1e56d0" />
                <span>Complaint Information</span>
              </div>
            </div>
            <div className="card-body" style={{ fontSize: '13px' }}>
              <div style={{ marginBottom: '14px' }}>
                <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '2px' }}>Title</span>
                <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '14px' }}>{activeComplaint.title}</div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <span style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '2px' }}>Description</span>
                <p style={{ color: '#334155', lineHeight: 1.5, background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                  {activeComplaint.description}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <span style={{ color: '#64748b', fontSize: '11.5px', display: 'block' }}>Category</span>
                  <strong style={{ color: '#0f172a' }}>{activeComplaint.category}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontSize: '11.5px', display: 'block' }}>Sub Category</span>
                  <strong style={{ color: '#0f172a' }}>{activeComplaint.subCategory}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontSize: '11.5px', display: 'block' }}>Priority</span>
                  <PriorityBadge priority={activeComplaint.priority} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <span style={{ color: '#64748b', fontSize: '11.5px', display: 'block' }}>Reference Number</span>
                  <span style={{ fontFamily: 'monospace', color: '#475569' }}>{activeComplaint.referenceNo}</span>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontSize: '11.5px', display: 'block' }}>Submission Date</span>
                  <span style={{ color: '#475569' }}>{activeComplaint.dateSubmitted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Current Status & Assignment Card */}
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div className="card-title">
                <UserCheck size={16} color="#059669" />
                <span>Current Status & Assignment</span>
              </div>
            </div>
            <div className="card-body" style={{ fontSize: '13px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
                <div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#64748b', fontSize: '11.5px', display: 'block' }}>Current Status</span>
                    <div style={{ marginTop: '3px' }}><StatusBadge status={activeComplaint.status} /></div>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#64748b', fontSize: '11.5px', display: 'block' }}>Assigned To</span>
                    <strong style={{ color: '#0f172a' }}>{activeComplaint.assignedTo}</strong>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#64748b', fontSize: '11.5px', display: 'block' }}>Assigned Date</span>
                    <span style={{ color: '#475569' }}>{activeComplaint.assignedDate}</span>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', fontSize: '11.5px', display: 'block' }}>Next Action</span>
                    <strong style={{ color: '#1e56d0' }}>{activeComplaint.nextAction}</strong>
                  </div>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>Bureau/Cell</span>
                    <strong style={{ color: '#0f172a' }}>{activeComplaint.bureau}</strong>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>({activeComplaint.bureauFullName || 'Regulation Bureau'})</div>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>Case Owner</span>
                    <strong style={{ color: '#0f172a' }}>{activeComplaint.caseOwner}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>Case Age</span>
                    <strong style={{ color: '#0f172a' }}>{activeComplaint.caseAge}</strong>
                  </div>
                  <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
                    <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>Expected Resolution Date</span>
                    <strong style={{ color: '#dc2626' }}>{activeComplaint.expectedResolutionDate}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attachments Card */}
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div className="card-title">
                <FileCheck2 size={16} color="#7c3aed" />
                <span>Attachments ({activeComplaint.attachments?.length || 0})</span>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => showToast('Select file to upload...', 'info')}
              >
                <UploadCloud size={14} /> Upload New
              </button>
            </div>
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Uploaded On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {activeComplaint.attachments?.map((att, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600, color: '#0f172a' }}>{att.name}</td>
                      <td><span style={{ fontSize: '11px', padding: '2px 6px', background: '#f1f5f9', borderRadius: '4px' }}>{att.type}</span></td>
                      <td style={{ color: '#64748b' }}>{att.size}</td>
                      <td style={{ color: '#64748b' }}>{att.date}</td>
                      <td>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => showToast(`Downloading ${att.name}...`, 'success')}
                        >
                          <Download size={13} /> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Institution Info, Case Timeline, Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Institution Details Card */}
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div className="card-title">
                <Building2 size={16} color="#1e56d0" />
                <span>Institution Details</span>
              </div>
              <button
                onClick={() => navigateTo('institution-profile', { institutionId: matchedInst.id })}
                style={{ background: 'transparent', border: 'none', color: '#2563eb', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                View Full Profile →
              </button>
            </div>
            <div className="card-body" style={{ fontSize: '12.5px' }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
                <img
                  src={matchedInst.photo}
                  alt={matchedInst.name}
                  style={{ width: '90px', height: '65px', borderRadius: '6px', objectFit: 'cover', objectPosition: 'center 35%' }}
                />
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{matchedInst.name}</h4>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '12px', background: '#ecfdf5', color: '#059669', fontWeight: 600 }}>
                    {matchedInst.type}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#475569' }}>
                <div><span style={{ color: '#94a3b8' }}>AICTE Permanent ID:</span> <strong>{matchedInst.aicteId}</strong></div>
                <div><span style={{ color: '#94a3b8' }}>Type:</span> {matchedInst.type}</div>
                <div><span style={{ color: '#94a3b8' }}>Location:</span> {matchedInst.location}</div>
                <div><span style={{ color: '#94a3b8' }}>Established Year:</span> {matchedInst.established}</div>
                <div><span style={{ color: '#94a3b8' }}>Website:</span> <span style={{ color: '#2563eb' }}>{matchedInst.website}</span></div>
                <div><span style={{ color: '#94a3b8' }}>Contact:</span> {matchedInst.contactNumber}</div>
                <div><span style={{ color: '#94a3b8' }}>Email:</span> {matchedInst.email}</div>
              </div>
            </div>
          </div>

          {/* Case Timeline Stepper */}
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div className="card-title">
                <Clock size={16} color="#059669" />
                <span>Case Timeline</span>
              </div>
            </div>
            <div className="card-body">
              <div className="timeline-stepper">
                {activeComplaint.timeline?.map((step, idx) => (
                  <div key={idx} className="timeline-step">
                    <div className={`timeline-node ${step.status === 'completed' ? 'completed' : 'active'}`}></div>
                    <div className="timeline-date">{step.date}</div>
                    <div className="timeline-title">{step.title}</div>
                    <div className="timeline-desc">{step.actor}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions Panel matching Screenshot 6 */}
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div className="card-title">
                <FileCheck2 size={16} color="#1e56d0" />
                <span>Quick Actions</span>
              </div>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="btn btn-primary"
                style={{ width: '100%', height: '40px', justifyContent: 'center' }}
                onClick={() => setModalState({ updateStatus: true, data: activeComplaint.id })}
              >
                <RefreshCw size={15} /> Update Status
              </button>

              <button
                className="btn btn-secondary"
                style={{ width: '100%', height: '38px', justifyContent: 'center' }}
                onClick={() => setModalState({ assignCase: true, data: activeComplaint.id })}
              >
                <UserCheck size={15} /> Assign / Transfer
              </button>

              <button
                className="btn btn-secondary"
                style={{ width: '100%', height: '38px', justifyContent: 'center' }}
                onClick={() => setModalState({ addComment: true, data: activeComplaint.id })}
              >
                <MessageSquare size={15} /> Add Comment
              </button>

              <button
                className="btn btn-secondary"
                style={{ width: '100%', height: '38px', justifyContent: 'center' }}
                onClick={() => showToast('Opening upload document window...', 'info')}
              >
                <UploadCloud size={15} /> Upload Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
