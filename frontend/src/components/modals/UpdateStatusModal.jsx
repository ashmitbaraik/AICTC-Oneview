import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2 } from 'lucide-react';

export const UpdateStatusModal = ({ isOpen, onClose, complaintId }) => {
  const { complaints, updateComplaintStatus } = useApp();

  const complaint = complaints.find((c) => c.id === complaintId) || complaints[0];

  const [status, setStatus] = useState(complaint ? complaint.status : 'Under Process');
  const [remarks, setRemarks] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (complaint) {
      updateComplaintStatus(complaint.id, status, remarks);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div>
            <h3>Update Case Status</h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Case ID: <strong>{complaint?.id}</strong> ({complaint?.institutionName})
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Current Status</label>
              <input
                type="text"
                className="form-control"
                value={complaint?.status}
                disabled
                style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">New Status *</label>
              <select
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="Under Process">Under Process</option>
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Assigned">Assigned</option>
                <option value="Resolved">Resolved</option>
                <option value="Disposed">Disposed</option>
                <option value="Transferred">Transferred</option>
                <option value="Overdue">Overdue</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Action Remarks / Notes *</label>
              <textarea
                className="form-control"
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Detail rationale, official observations or compliance notes for the audit trail..."
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} /> Save Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
