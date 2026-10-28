import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/common/KpiCard';
import { StatusBadge } from '../components/common/Badge';
import {
  ShieldCheck,
  UserCheck,
  UserX,
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  Shield,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

export const UserManagementView = () => {
  const { users, navigateTo, setModalState, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('Users');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === 'All' || u.role === roleFilter;
    const matchStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case 'Admin':
        return { bg: '#eff6ff', color: '#1d4ed8' };
      case 'Institute Admin':
        return { bg: '#f5f3ff', color: '#6d28d9' };
      case 'Reviewer':
      case 'Bureau Officer':
        return { bg: '#fff7ed', color: '#c2410c' };
      case 'Data Entry Operator':
        return { bg: '#ecfeff', color: '#0e7490' };
      case 'Viewer':
      case 'Senior Management':
        return { bg: '#f1f5f9', color: '#475569' };
      default:
        return { bg: '#f1f5f9', color: '#475569' };
    }
  };

  return (
    <div className="page-container">
      {/* Header & Breadcrumbs */}
      <div className="page-header">
        <div className="breadcrumbs">
          <span style={{ cursor: 'pointer' }} onClick={() => navigateTo('dashboard')}>Home</span>
          <ChevronRight size={12} />
          <span className="current">User Management & Access Control</span>
        </div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">
              <ShieldCheck size={24} color="#1e56d0" />
              User Management & Access Control
            </h1>
            <p className="page-subtitle">
              Manage users, roles and permissions for secure access to the AICTE OneView system.
            </p>
          </div>
        </div>
      </div>

      {/* 4 KPI Cards matching Screenshot 11 */}
      <div className="kpi-grid-4">
        <KpiCard
          label="Total Users"
          value="24"
          icon={Users}
          iconBg="#eff6ff"
          iconColor="#2563eb"
        />
        <KpiCard
          label="Active Users"
          value="21"
          icon={UserCheck}
          iconBg="#ecfdf5"
          iconColor="#059669"
        />
        <KpiCard
          label="Inactive Users"
          value="3"
          icon={UserX}
          iconBg="#fef2f2"
          iconColor="#dc2626"
        />
        <KpiCard
          label="Roles"
          value="5"
          icon={Shield}
          iconBg="#f5f3ff"
          iconColor="#7c3aed"
        />
      </div>

      {/* Sub Tabs: Users, Roles & Permissions, Access Logs */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'Users' ? 'active' : ''}`}
          onClick={() => setActiveTab('Users')}
        >
          Users
        </button>
        <button
          className={`tab-btn ${activeTab === 'Roles & Permissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('Roles & Permissions')}
        >
          Roles & Permissions
        </button>
        <button
          className={`tab-btn ${activeTab === 'Access Logs' ? 'active' : ''}`}
          onClick={() => setActiveTab('Access Logs')}
        >
          Access Logs
        </button>
      </div>

      {/* Filter and Add New User Bar */}
      <div className="filter-bar">
        <div className="filter-input-wrapper">
          <input
            type="text"
            className="filter-input"
            style={{ paddingLeft: '14px' }}
            placeholder="Search by name, email or username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Institute Admin">Institute Admin</option>
          <option value="Reviewer">Reviewer</option>
          <option value="Data Entry Operator">Data Entry Operator</option>
          <option value="Viewer">Viewer</option>
        </select>

        <select
          className="filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          className="btn btn-primary"
          style={{ marginLeft: 'auto' }}
          onClick={() => setModalState({ addUser: true })}
        >
          <Plus size={15} /> Add New User
        </button>
      </div>

      {/* Users Table matching Screenshot 11 */}
      {activeTab === 'Users' && (
        <div className="card">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '30px' }}><input type="checkbox" /></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Institute/Department</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => {
                  const roleStyle = getRoleBadgeStyle(u.role);
                  return (
                    <tr key={u.id}>
                      <td><input type="checkbox" /></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: '#eff6ff',
                              color: '#1e56d0',
                              fontWeight: 700,
                              fontSize: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            {u.avatar}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: '#0f172a' }}>{u.name}</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>{u.username}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: '#475569', fontSize: '12.5px' }}>{u.email}</td>
                      <td>
                        <span
                          style={{
                            fontSize: '11.5px',
                            fontWeight: 600,
                            padding: '3px 9px',
                            borderRadius: '12px',
                            backgroundColor: roleStyle.bg,
                            color: roleStyle.color
                          }}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '12.5px', color: '#0f172a', fontWeight: 500 }}>
                          {u.institution}
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>
                          ({u.department})
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge ${u.status === 'Active' ? 'badge-active' : 'badge-overdue'}`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td style={{ color: '#64748b', fontSize: '11.5px' }}>{u.lastLogin}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#3b82f6' }}
                            title="Edit User"
                            onClick={() => showToast(`Edit user ${u.name}`, 'info')}
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}
                            title="Permissions"
                            onClick={() => showToast(`View permissions for ${u.name}`, 'info')}
                          >
                            <Shield size={15} />
                          </button>
                          <button
                            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                            title="Deactivate / Delete"
                            onClick={() => showToast(`Deactivate user ${u.name}`, 'warning')}
                          >
                            <Trash2 size={15} />
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
            <div>Showing 1-{filteredUsers.length} of 24 users</div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>‹</button>
              <button className="btn btn-primary btn-sm" style={{ padding: '3px 8px' }}>1</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>2</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>3</button>
              <button className="btn btn-secondary btn-sm" style={{ padding: '3px 8px' }}>›</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Roles & Permissions' && (
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>AICTE OneView Role Hierarchy</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
              <div style={{ fontWeight: 700, color: '#1e56d0', marginBottom: '6px' }}>Administrator</div>
              <p style={{ fontSize: '12px', color: '#64748b' }}>Full control across all bureaus, user management, system configs, case reassignment, and audit oversight.</p>
            </div>
            <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
              <div style={{ fontWeight: 700, color: '#059669', marginBottom: '6px' }}>Bureau / Cell Officer (RB/PGRC)</div>
              <p style={{ fontSize: '12px', color: '#64748b' }}>Process assigned cases, review compliance documents, resolve cross-bureau overlaps, update hearing records.</p>
            </div>
            <div style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
              <div style={{ fontWeight: 700, color: '#7c3aed', marginBottom: '6px' }}>Senior Management</div>
              <p style={{ fontSize: '12px', color: '#64748b' }}>Executive read-only access to institution portfolios, cross-cell performance dashboards, SLA alerts, and analytical reports.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Access Logs' && (
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>Authentication & Access Audit Log</h3>
          <p style={{ fontSize: '13px', color: '#64748b' }}>All login attempts, role elevations, and token authentications are immutably logged for cyber compliance.</p>
        </div>
      )}
    </div>
  );
};
