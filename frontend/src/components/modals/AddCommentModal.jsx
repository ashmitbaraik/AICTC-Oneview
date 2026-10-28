import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, MessageSquarePlus } from 'lucide-react';

export const AddCommentModal = ({ isOpen, onClose, complaintId }) => {
  const { complaints, addCommentToComplaint } = useApp();
  const [commentText, setCommentText] = useState('');

  const complaint = complaints.find((c) => c.id === complaintId) || complaints[0];

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (complaint && commentText.trim()) {
      addCommentToComplaint(complaint.id, commentText);
    }
    setCommentText('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div>
            <h3>Add Case Comment / Observation</h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Case: <strong>{complaint?.id}</strong>
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Official Observation / Communication *</label>
              <textarea
                className="form-control"
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Enter remarks, communication details with the institution, or notes on overlap resolution..."
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <MessageSquarePlus size={16} /> Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
