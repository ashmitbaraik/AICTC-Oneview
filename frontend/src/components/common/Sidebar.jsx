import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Building2,
  FileText,
  GitCompare,
  UserCheck,
  History,
  Bell,
  BarChart3,
  Layers,
  ShieldCheck,
  Settings,
  FolderKanban,
  CheckCircle,
  FileCheck,
  X
} from 'lucide-react';

export const Sidebar = () => {
  const { activeView, navigateTo, kpis, alerts, isSidebarOpen, setIsSidebarOpen } = useApp();

  const unreadAlerts = alerts.filter((a) => a.status === 'Unread').length;

  const mainNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'institutions',
      label: 'Institution Directory',
      icon: Building2
    },
    {
      id: 'complaints',
      label: 'Complaint Registry',
      icon: FileText
    },
    {
      id: 'overlap-detection',
      label: 'Potential Overlaps',
      icon: GitCompare,
      badge: 18,
      badgeType: 'danger'
    },
    {
      id: 'case-assignments',
      label: 'Case Assignments',
      icon: UserCheck
    },
    {
      id: 'action-history',
      label: 'Action History',
      icon: History
    },
    {
      id: 'alerts',
      label: 'Alerts & Notifications',
      icon: Bell,
      badge: unreadAlerts || 7,
      badgeType: 'danger'
    },
    {
      id: 'analytics',
      label: 'Analytics & Reports',
      icon: BarChart3
    },
    {
      id: 'bureau-cell',
      label: 'Bureau/Cell Views',
      icon: Layers
    },
    {
      id: 'users',
      label: 'Users & Permissions',
      icon: ShieldCheck
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings
    }
  ];

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isSidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${isSidebarOpen ? 'mobile-open' : ''}`}>
        <div>
          {/* Brand Header */}
          <div className="sidebar-brand">
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, cursor: 'pointer' }}
              onClick={() => navigateTo('dashboard')}
            >
              <div className="brand-emblem">
                <img
                  src="/aicte-logo.png"
                  alt="AICTE Logo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                />
              </div>
              <div className="brand-info">
                <h1>AICTE OneView</h1>
                <p>Integrated Complaint Monitoring</p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              className="sidebar-close-btn"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close Navigation"
            >
              <X size={18} />
            </button>
          </div>

        {/* Main Navigation Menu */}
        <nav className="sidebar-nav">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id || 
              (item.id === 'institutions' && activeView === 'institution-profile') ||
              (item.id === 'complaints' && activeView === 'complaint-details');

            return (
              <div
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => navigateTo(item.id)}
              >
                <Icon className="nav-icon" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`nav-badge ${item.badgeType}`}>
                    {item.badge}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Building Sketch Illustration Footer */}
      <div className="sidebar-footer-widget">
        <svg
          className="building-illustration"
          viewBox="0 0 200 120"
          fill="none"
          stroke="#93c5fd"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Main University Building Sketch */}
          <path d="M100 15 L160 45 L40 45 Z" fill="rgba(37, 99, 235, 0.2)" />
          <path d="M100 10 L100 15" strokeWidth="2" />
          <path d="M96 10 L104 10" strokeWidth="2" />
          <rect x="50" y="45" width="100" height="65" fill="rgba(15, 23, 42, 0.4)" />
          {/* Pillars */}
          <line x1="65" y1="45" x2="65" y2="110" />
          <line x1="85" y1="45" x2="85" y2="110" />
          <line x1="115" y1="45" x2="115" y2="110" />
          <line x1="135" y1="45" x2="135" y2="110" />
          {/* Windows */}
          <rect x="70" y="55" width="10" height="15" />
          <rect x="95" y="55" width="10" height="15" />
          <rect x="120" y="55" width="10" height="15" />
          <rect x="70" y="80" width="10" height="15" />
          <rect x="120" y="80" width="10" height="15" />
          {/* Arched Central Door */}
          <path d="M92 110 V90 A8 8 0 0 1 108 90 V110 Z" fill="rgba(37, 99, 235, 0.3)" />
          {/* Wings */}
          <rect x="15" y="60" width="35" height="50" />
          <rect x="150" y="60" width="35" height="50" />
          <line x1="5" y1="110" x2="195" y2="110" strokeWidth="2" />
          {/* Windows on wings */}
          <line x1="25" y1="70" x2="35" y2="70" />
          <line x1="25" y1="85" x2="35" y2="85" />
          <line x1="165" y1="70" x2="175" y2="70" />
          <line x1="165" y1="85" x2="175" y2="85" />
        </svg>

        <div className="sidebar-tagline">
          <strong>AICTE OneView</strong>
          Better Coordination for a Stronger Technical Education System
        </div>
      </div>
    </aside>
    </>
  );
};
