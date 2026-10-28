import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Calendar,
  ChevronDown,
  User,
  Shield,
  Briefcase,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Menu
} from 'lucide-react';

export const Header = () => {
  const {
    currentUser,
    switchRole,
    alerts,
    markAlertAsRead,
    markAllAlertsAsRead,
    navigateTo,
    globalSearch,
    setGlobalSearch,
    setIsAuthenticated,
    isSidebarOpen,
    setIsSidebarOpen
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifRef = useRef(null);
  const userRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadAlerts = alerts.filter((a) => a.status === 'Unread');

  // Formatted current date
  const todayDate = 'Thu, 24 Apr 2025';

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          className="mobile-menu-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className="mobile-only-logo" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
          <img
            src="/aicte-logo.png"
            alt="AICTE Logo"
            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #e2e8f0' }}
          />
        </div>

        {/* Global Universal Search */}
        <div className="topbar-search">
          <Search className="filter-input-icon" size={17} />
          <input
            type="text"
            placeholder="Search complaint ID, institution, category..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
          />
          {globalSearch && (
            <button
              onClick={() => setGlobalSearch('')}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8', fontSize: '13px' }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="topbar-right">
        {/* Date Display */}
        <div className="date-indicator">
          <Calendar size={15} color="#2563eb" />
          <span>{todayDate}</span>
        </div>

        {/* Alerts & Notifications Bell */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            className="header-icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Alerts & Notifications"
          >
            <Bell size={19} />
            {unreadAlerts.length > 0 && (
              <span className="icon-badge">{unreadAlerts.length}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div
                style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>
                    Notifications & Alerts
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    {unreadAlerts.length} unread alerts
                  </div>
                </div>
                {unreadAlerts.length > 0 && (
                  <button
                    onClick={markAllAlertsAsRead}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#2563eb',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
                {alerts.slice(0, 5).map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => {
                      markAlertAsRead(alert.id);
                      navigateTo('alerts');
                      setShowNotifications(false);
                    }}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid #f8fafc',
                      backgroundColor: alert.status === 'Unread' ? '#f0f7ff' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start'
                    }}
                  >
                    <div style={{ marginTop: '2px' }}>
                      {alert.type === 'Alert' ? (
                        <AlertTriangle size={16} color="#ef4444" />
                      ) : alert.type === 'Notification' ? (
                        <Bell size={16} color="#2563eb" />
                      ) : (
                        <CheckCircle2 size={16} color="#10b981" />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: '12.5px',
                          fontWeight: 600,
                          color: '#0f172a',
                          marginBottom: '2px'
                        }}
                      >
                        {alert.title}
                      </div>
                      <div
                        style={{
                          fontSize: '11.5px',
                          color: '#475569',
                          lineHeight: '1.4',
                          marginBottom: '4px'
                        }}
                      >
                        {alert.message}
                      </div>
                      <div
                        style={{
                          fontSize: '10.5px',
                          color: '#94a3b8',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Clock size={11} /> {alert.dateTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                onClick={() => {
                  navigateTo('alerts');
                  setShowNotifications(false);
                }}
                style={{
                  padding: '11px',
                  textAlign: 'center',
                  background: '#f8fafc',
                  borderTop: '1px solid #e2e8f0',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#2563eb',
                  cursor: 'pointer'
                }}
              >
                View All Notifications →
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Demo Persona Switcher */}
        <div style={{ position: 'relative' }} ref={userRef}>
          <div
            className="user-profile-menu"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">{currentUser.avatar}</div>
            <div className="user-details">
              <div className="user-name">{currentUser.name}</div>
              <div className="user-role-badge">{currentUser.role}</div>
            </div>
            <ChevronDown size={14} color="#64748b" />
          </div>

          {showUserMenu && (
            <div className="user-menu-dropdown">
              <div style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  {currentUser.email}
                </div>
                <div style={{ marginTop: '4px' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      background: '#eff6ff',
                      color: '#1e56d0',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontWeight: 600
                    }}
                  >
                    {currentUser.department}
                  </span>
                </div>
              </div>

              <div style={{ padding: '8px 16px 4px', fontSize: '10.5px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                Switch Demo Persona
              </div>

              <div
                className={`user-menu-item ${currentUser.role === 'Admin' ? 'active' : ''}`}
                onClick={() => {
                  switchRole('Admin');
                  setShowUserMenu(false);
                }}
              >
                <Shield size={15} color="#2563eb" />
                <div>
                  <div style={{ fontWeight: 600 }}>Ashmit Baraik</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Admin (AICTE HQ)</div>
                </div>
              </div>

              <div
                className={`user-menu-item ${currentUser.role === 'Bureau Officer' ? 'active' : ''}`}
                onClick={() => {
                  switchRole('Bureau Officer');
                  setShowUserMenu(false);
                }}
              >
                <Briefcase size={15} color="#059669" />
                <div>
                  <div style={{ fontWeight: 600 }}>Dr. R. Kumar</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Regulation Bureau (RB) Officer</div>
                </div>
              </div>

              <div
                className={`user-menu-item ${currentUser.role === 'Senior Management' ? 'active' : ''}`}
                onClick={() => {
                  switchRole('Senior Management');
                  setShowUserMenu(false);
                }}
              >
                <User size={15} color="#7c3aed" />
                <div>
                  <div style={{ fontWeight: 600 }}>Dr. Aarav Sharma</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Senior Management (View Only)</div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '6px' }}>
                <div
                  className="user-menu-item"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigateTo('users');
                  }}
                >
                  <User size={15} />
                  <span>Manage Users & Roles</span>
                </div>

                <div
                  className="user-menu-item"
                  style={{ color: '#dc2626' }}
                  onClick={() => {
                    setShowUserMenu(false);
                    setIsAuthenticated(false);
                  }}
                >
                  <LogOut size={15} />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
