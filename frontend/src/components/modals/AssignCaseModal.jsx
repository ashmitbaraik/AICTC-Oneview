import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UserCheck } from 'lucide-react';

export const AssignCaseModal = ({ isOpen, onClose, complaintId }) => {
  const { complaints, assignComplaint } = useApp();

  const complaint = complaints.find((c) => c.id === complaintId) || complaints[0];

  const officers = [
    { name: 'Dr. R. Kumar', bureau: 'RB' },
    { name: 'Ms. P. Singh', bureau: 'PGRC' },
    { name: 'Mr. S. Verma', bureau: 'RB' },
    { name: 'Dr. A. Khan', bureau: 'Regional Office' },
    { name: 'Ms. R. Mehta', bureau: 'PGRC' },
    { name: 'Mr. V. Sharma', bureau: 'RB' },
    { name: 'Dr. P. Das', bureau: 'Regional Office' },
    { name: 'Ms. N. Gupta', bureau: 'PGRC' },
    { name: 'Mr. D. Yadav', bureau: 'RB' }
  ];

  const [selectedOfficer, setSelectedOfficer] = useState(officers[0].name);
  const [bureau, setBureau] = useState(officers[0].bureau);
  const [instructions, setInstructions] = useState('');

  if (!isOpen) return null;

  const handleOfficerChange = (name) => {
    setSelectedOfficer(name);
    const found = officers.find((o) => o.name === name);
    if (found) setBureau(found.bureau);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (complaint) {
      assignComplaint(complaint.id, selectedOfficer, bureau, instructions);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div>
            <h3>Assign / Transfer Case</h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Case: <strong>{complaint?.id}</strong> - {complaint?.institutionName}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Assign To AICTE Officer *</label>
              <select
                className="form-control"
                value={selectedOfficer}
                onChange={(e) => handleOfficerChange(e.target.value)}
                required
              >
                {officers.map((off) => (
                  <option key={off.name} value={off.name}>
                    {off.name} ({off.bureau})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Bureau / Cell *</label>
              <select
                className="form-control"
                value={bureau}
                onChange={(e) => setBureau(e.target.value)}
                required
              >
                <option value="RB">Regulation Bureau (RB)</option>
                <option value="PGRC">Public Grievance Redressal Cell (PGRC)</option>
                <option value="Regional Office">Regional Office</option>
                <option value="Academic Planning">Academic Planning</option>
                <option value="Other Cells">Other Cells</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Assignment Directives / Next Action *</label>
              <textarea
                className="form-control"
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g. Conduct compliance review, verify NAD certificates, check with state committee..."
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <UserCheck size={16} /> Confirm Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
