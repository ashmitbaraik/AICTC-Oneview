import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { InstitutionDirectoryView } from './views/InstitutionDirectoryView';
import { InstitutionProfileView } from './views/InstitutionProfileView';
import { ComplaintRegistryView } from './views/ComplaintRegistryView';
import { ComplaintDetailsView } from './views/ComplaintDetailsView';
import { OverlapDetectionView } from './views/OverlapDetectionView';
import { CaseAssignmentsView } from './views/CaseAssignmentsView';
import { ActionHistoryView } from './views/ActionHistoryView';
import { AnalyticsReportsView } from './views/AnalyticsReportsView';
import { BureauCellDashboardView } from './views/BureauCellDashboardView';
import { UserManagementView } from './views/UserManagementView';
import { AlertsNotificationsView } from './views/AlertsNotificationsView';
import { SettingsView } from './views/SettingsView';

import { RegisterComplaintModal } from './components/modals/RegisterComplaintModal';
import { UpdateStatusModal } from './components/modals/UpdateStatusModal';
import { AssignCaseModal } from './components/modals/AssignCaseModal';
import { AddCommentModal } from './components/modals/AddCommentModal';
import { AddUserModal } from './components/modals/AddUserModal';

import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export function MainApp() {
  const {
    isAuthenticated,
    activeView,
    modalState,
    setModalState,
    toasts,
    removeToast
  } = useApp();

  if (!isAuthenticated) {
    return <LoginView />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'institutions':
        return <InstitutionDirectoryView />;
      case 'institution-profile':
        return <InstitutionProfileView />;
      case 'complaints':
        return <ComplaintRegistryView />;
      case 'complaint-details':
        return <ComplaintDetailsView />;
      case 'overlap-detection':
        return <OverlapDetectionView />;
      case 'case-assignments':
        return <CaseAssignmentsView />;
      case 'action-history':
        return <ActionHistoryView />;
      case 'analytics':
        return <AnalyticsReportsView />;
      case 'bureau-cell':
        return <BureauCellDashboardView />;
      case 'users':
        return <UserManagementView />;
      case 'alerts':
        return <AlertsNotificationsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main App Content */}
      <div className="main-wrapper">
        <Header />
        <main>{renderActiveView()}</main>
      </div>

      {/* Global Interactive Modals */}
      <RegisterComplaintModal
        isOpen={!!modalState.registerComplaint}
        onClose={() => setModalState({})}
      />
      <UpdateStatusModal
        isOpen={!!modalState.updateStatus}
        complaintId={modalState.data}
        onClose={() => setModalState({})}
      />
      <AssignCaseModal
        isOpen={!!modalState.assignCase}
        complaintId={modalState.data}
        onClose={() => setModalState({})}
      />
      <AddCommentModal
        isOpen={!!modalState.addComment}
        complaintId={modalState.data}
        onClose={() => setModalState({})}
      />
      <AddUserModal
        isOpen={!!modalState.addUser}
        onClose={() => setModalState({})}
      />

      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast ${toast.type}`}>
            <div>
              {toast.type === 'success' && <CheckCircle2 size={16} color="#10b981" />}
              {toast.type === 'warning' && <AlertTriangle size={16} color="#f59e0b" />}
              {toast.type === 'info' && <Info size={16} color="#3b82f6" />}
              {toast.type === 'danger' && <AlertTriangle size={16} color="#ef4444" />}
            </div>
            <div style={{ flex: 1 }}>{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return <MainApp />;
}
