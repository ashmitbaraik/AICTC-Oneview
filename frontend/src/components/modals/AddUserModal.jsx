import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UserPlus } from 'lucide-react';

export const AddUserModal = ({ isOpen, onClose }) => {
  const { addUser } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Reviewer');
  const [department, setDepartment] = useState('Academic Cell');
  const [institution, setInstitution] = useState('BIT Sindri');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    addUser({
      name,
      email,
      role,
      department,
      institution
    });

    onClose();
    setName('');
    setEmail('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <div>
            <h3>Add New System User</h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Assign role & Bureau/Cell permissions
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@aicte.gov.in"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">System Role *</label>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="Admin">Admin</option>
                <option value="Institute Admin">Institute Admin</option>
                <option value="Reviewer">Reviewer / Bureau Officer</option>
                <option value="Data Entry Operator">Data Entry Operator</option>
                <option value="Viewer">Viewer (Senior Management)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Institute / Department</label>
              <input
                type="text"
                className="form-control"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Regulation Bureau / IT Department"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Attached Institution</label>
              <input
                type="text"
                className="form-control"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="e.g. BIT Sindri (or AICTE HQ)"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <UserPlus size={16} /> Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
