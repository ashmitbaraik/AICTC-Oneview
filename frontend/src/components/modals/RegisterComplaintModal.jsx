import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, AlertTriangle, UploadCloud, CheckCircle2 } from 'lucide-react';

export const RegisterComplaintModal = ({ isOpen, onClose }) => {
  const { institutions, complaints, registerComplaint } = useApp();

  const [institutionName, setInstitutionName] = useState('BIT Sindri');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Academic');
  const [subCategory, setSubCategory] = useState('Affiliation');
  const [bureau, setBureau] = useState('RB');
  const [priority, setPriority] = useState('High');

  if (!isOpen) return null;

  // Real-time simulated AI overlap check
  const potentialOverlapMatch = complaints.find(
    (c) =>
      c.institutionName.toLowerCase() === institutionName.toLowerCase() &&
      (c.bureau !== bureau || c.category.toLowerCase() === category.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const matchedInst = institutions.find((i) => i.name === institutionName);

    registerComplaint({
      title,
      description,
      category,
      subCategory,
      bureau,
      priority,
      institutionName,
      institutionId: matchedInst ? matchedInst.id : 'inst-1',
      aicteId: matchedInst ? matchedInst.aicteId : '1-1000001'
    });

    onClose();
    setTitle('');
    setDescription('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <div>
            <h3>Register New Institution Complaint</h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Consolidated intake across Regulation Bureau (RB) & PGRC
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Institution Selection */}
            <div className="form-group">
              <label className="form-label">Technical Institution *</label>
              <select
                className="form-control"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                required
              >
                {institutions.map((inst) => (
                  <option key={inst.id} value={inst.name}>
                    {inst.name} ({inst.aicteId}) - {inst.location}
                  </option>
                ))}
              </select>
            </div>

            {/* AI Potential Overlap Banner Preview */}
            {potentialOverlapMatch && (
              <div
                style={{
                  backgroundColor: '#fffbeb',
                  border: '1px solid #fde68a',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  marginBottom: '16px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start'
                }}
              >
                <AlertTriangle size={18} color="#d97706" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div style={{ fontSize: '12px', color: '#92400e' }}>
                  <strong>Cross-Bureau Overlap Alert Detected!</strong>
                  <div style={{ marginTop: '2px' }}>
                    An active case <strong>{potentialOverlapMatch.id}</strong> ({potentialOverlapMatch.category}) already exists for <strong>{institutionName}</strong> handled by <strong>{potentialOverlapMatch.bureau}</strong>. Submitting this will automatically link the cases in the Cross-Bureau Overlap Registry.
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {/* Bureau / Cell */}
              <div className="form-group">
                <label className="form-label">Receiving Bureau / Cell *</label>
                <select
                  className="form-control"
                  value={bureau}
                  onChange={(e) => setBureau(e.target.value)}
                >
                  <option value="RB">Regulation Bureau (RB)</option>
                  <option value="PGRC">Public Grievance Redressal Cell (PGRC)</option>
                  <option value="Academic Planning">Academic Planning</option>
                  <option value="Regional Office">Regional Offices</option>
                  <option value="Other Cells">Other Cells</option>
                </select>
              </div>

              {/* Priority */}
              <div className="form-group">
                <label className="form-label">Priority Level *</label>
                <select
                  className="form-control"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {/* Category */}
              <div className="form-group">
                <label className="form-label">Complaint Category *</label>
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Academic">Academic</option>
                  <option value="Affiliation">Affiliation</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Faculty">Faculty & Staff</option>
                  <option value="Examination">Examination</option>
                  <option value="Fees">Fees / Capitation</option>
                  <option value="Compliance">Regulatory Compliance</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              {/* Sub Category */}
              <div className="form-group">
                <label className="form-label">Sub-Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  placeholder="e.g. Norm clearance, Lab safety"
                />
              </div>
            </div>

            {/* Title */}
            <div className="form-group">
              <label className="form-label">Complaint Subject / Title *</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief summary of the issue or non-compliance"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Detailed Description *</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Specify grievance details, relevant dates, affected stakeholders, and requested AICTE action..."
                required
              />
            </div>

            {/* File Upload Zone */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Supporting Documents</label>
              <div
                style={{
                  border: '2px dashed #cbd5e1',
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'center',
                  background: '#f8fafc',
                  cursor: 'pointer'
                }}
              >
                <UploadCloud size={24} color="#64748b" style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
                  Click to upload representation, orders or PDFs
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                  Max size: 10MB (PDF, JPG, PNG)
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Register Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
