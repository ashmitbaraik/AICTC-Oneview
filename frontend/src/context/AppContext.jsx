import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  currentUsers,
  institutionsData,
  complaintsData,
  potentialOverlapsData,
  caseAssignmentsData,
  actionHistoryData,
  alertsData,
  bureauApplicationsData
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication & User Role
  const [currentUser, setCurrentUser] = useState(currentUsers[0]); // Ashmit Baraik (Admin)
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Active View Navigation
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Selection states for detail drawers / views
  const [selectedInstitutionId, setSelectedInstitutionId] = useState('inst-1');
  const [selectedComplaintId, setSelectedComplaintId] = useState('C-2024-0789');
  const [selectedOverlapId, setSelectedOverlapId] = useState('ov-1');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('C-2024-0789');
  const [selectedActionId, setSelectedActionId] = useState('act-1');

  // Core Data Collections (mutable in-memory)
  const [institutions, setInstitutions] = useState(institutionsData);
  const [complaints, setComplaints] = useState(complaintsData);
  const [overlaps, setOverlaps] = useState(potentialOverlapsData);
  const [assignments, setAssignments] = useState(caseAssignmentsData);
  const [actions, setActions] = useState(actionHistoryData);
  const [users, setUsers] = useState(currentUsers);
  const [alerts, setAlerts] = useState(alertsData);
  const [bureauApps, setBureauApps] = useState(bureauApplicationsData);

  // Search & Global filters
  const [globalSearch, setGlobalSearch] = useState('');

  // Modals state
  const [modalState, setModalState] = useState({
    registerComplaint: false,
    updateStatus: false,
    assignCase: false,
    addComment: false,
    addUser: false,
    data: null
  });

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Switch role handler for quick demo personas
  const switchRole = (roleType) => {
    if (roleType === 'Admin') {
      setCurrentUser(currentUsers[0]);
      showToast('Switched persona to Ashmit Baraik (AICTE Administrator)', 'info');
    } else if (roleType === 'Bureau Officer' || roleType === 'RB') {
      setCurrentUser(currentUsers[1]);
      showToast('Switched persona to Dr. R. Kumar (Regulation Bureau Officer)', 'info');
    } else if (roleType === 'Senior Management') {
      setCurrentUser(currentUsers[2]);
      showToast('Switched persona to Dr. Aarav Sharma (Senior Management - View Only)', 'info');
    }
  };

  // Navigation helpers
  const navigateTo = (view, extra = {}) => {
    if (extra.institutionId) setSelectedInstitutionId(extra.institutionId);
    if (extra.complaintId) setSelectedComplaintId(extra.complaintId);
    if (extra.overlapId) setSelectedOverlapId(extra.overlapId);
    setActiveView(view);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add a new complaint
  const registerComplaint = (newComplaint) => {
    const complaintId = `C-2025-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const fullComplaint = {
      id: complaintId,
      referenceNo: `Ref-${complaintId}`,
      institutionId: newComplaint.institutionId || 'inst-1',
      institutionName: newComplaint.institutionName || 'BIT Sindri',
      aicteId: newComplaint.aicteId || '1-1000001',
      title: newComplaint.title,
      description: newComplaint.description,
      category: newComplaint.category || 'Academic',
      subCategory: newComplaint.subCategory || 'General',
      bureau: newComplaint.bureau || 'RB',
      bureauFullName: newComplaint.bureau === 'RB' ? 'Regulation Bureau (RB)' : 'Public Grievance Redressal Cell (PGRC)',
      status: 'Pending',
      priority: newComplaint.priority || 'Medium',
      dateSubmitted: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      assignedTo: 'Not Assigned',
      assignedDate: '-',
      caseOwner: 'Unassigned',
      caseAge: '0 days',
      nextAction: 'Initial screening and cell assignment',
      expectedResolutionDate: 'Within 15 days',
      complaintType: 'Institution Related',
      attachments: newComplaint.attachments || [],
      timeline: [
        {
          date: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          title: 'Complaint Registered',
          actor: `By ${currentUser.name} (${currentUser.role})`,
          status: 'completed',
          color: '#10b981'
        }
      ],
      comments: [],
      relatedCaseIds: []
    };

    setComplaints((prev) => [fullComplaint, ...prev]);

    // Check potential overlap with existing complaints
    const existingSameInst = complaints.filter(c => c.institutionName.toLowerCase() === fullComplaint.institutionName.toLowerCase());
    if (existingSameInst.length > 0) {
      const targetCase = existingSameInst[0];
      const newOverlap = {
        id: `ov-${Date.now()}`,
        caseA: fullComplaint.id,
        caseB: targetCase.id,
        institution: fullComplaint.institutionName,
        institutionId: fullComplaint.institutionId,
        bureauA: fullComplaint.bureau,
        bureauB: targetCase.bureau,
        categories: [fullComplaint.category, targetCase.category],
        categoryA: fullComplaint.category,
        categoryB: targetCase.category,
        dateA: fullComplaint.dateSubmitted,
        dateB: targetCase.dateSubmitted,
        similarityScore: Math.floor(75 + Math.random() * 20),
        priority: 'High',
        status: 'Under Review',
        matchingReasons: [
          `Same institution (${fullComplaint.institutionName})`,
          'Identified multiple submissions across bureaus/cells',
          'Potential duplication of inquiry actions'
        ],
        recommendedAction: 'Coordinate joint review before initiating duplicate site inspection or formal order.',
        decision: null,
        reason: ''
      };
      setOverlaps(prev => [newOverlap, ...prev]);
      showToast(`Overlap alert triggered! Similarity detected with case ${targetCase.id}`, 'warning');
    }

    // Add to action history
    const newAction = {
      id: `act-${Date.now()}`,
      dateTime: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      complaintId: fullComplaint.id,
      institutionName: fullComplaint.institutionName,
      actionType: 'Status Update',
      performedBy: `${currentUser.name} (${currentUser.role})`,
      status: 'Pending',
      remarks: 'Complaint lodged in AICTE OneView central registry.'
    };
    setActions(prev => [newAction, ...prev]);

    showToast(`Complaint ${complaintId} registered successfully!`, 'success');
    return fullComplaint;
  };

  // Update complaint status
  const updateComplaintStatus = (complaintId, newStatus, remarks = '') => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          const updatedTimeline = [
            ...c.timeline,
            {
              date: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
              title: `Status Updated to ${newStatus}`,
              actor: `By ${currentUser.name} (${currentUser.role})`,
              status: 'completed',
              color: '#2563eb'
            }
          ];
          return { ...c, status: newStatus, timeline: updatedTimeline };
        }
        return c;
      })
    );

    // Add audit entry
    const comp = complaints.find(c => c.id === complaintId);
    setActions((prev) => [
      {
        id: `act-${Date.now()}`,
        dateTime: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        complaintId,
        institutionName: comp ? comp.institutionName : 'Institution',
        actionType: 'Status Update',
        performedBy: `${currentUser.name} (${currentUser.role})`,
        status: newStatus,
        remarks: remarks || `Status changed to ${newStatus}.`
      },
      ...prev
    ]);

    showToast(`Case ${complaintId} status updated to "${newStatus}"`, 'success');
  };

  // Assign or transfer case
  const assignComplaint = (complaintId, officerName, bureauName, instructions = '') => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          const updatedTimeline = [
            ...c.timeline,
            {
              date: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
              title: `Assigned / Transferred to ${officerName} (${bureauName})`,
              actor: `By ${currentUser.name} (${currentUser.role})`,
              status: 'completed',
              color: '#0ea5e9'
            }
          ];
          return {
            ...c,
            assignedTo: `${officerName} (${bureauName})`,
            bureau: bureauName,
            status: c.status === 'Pending' ? 'Assigned' : c.status,
            timeline: updatedTimeline
          };
        }
        return c;
      })
    );

    setActions((prev) => [
      {
        id: `act-${Date.now()}`,
        dateTime: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        complaintId,
        institutionName: 'AICTE Institution',
        actionType: 'Assignment',
        performedBy: `${currentUser.name} (${currentUser.role})`,
        status: 'Assigned',
        remarks: `Assigned to ${officerName} (${bureauName}). Instructions: ${instructions || 'Review case documents'}`
      },
      ...prev
    ]);

    showToast(`Case ${complaintId} assigned to ${officerName}`, 'success');
  };

  // Add comment to complaint
  const addCommentToComplaint = (complaintId, commentText) => {
    if (!commentText.trim()) return;
    const newComment = {
      id: `cm-${Date.now()}`,
      author: `${currentUser.name} (${currentUser.role})`,
      date: `${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      message: commentText
    };

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          return {
            ...c,
            comments: [...(c.comments || []), newComment]
          };
        }
        return c;
      })
    );

    setActions((prev) => [
      {
        id: `act-${Date.now()}`,
        dateTime: newComment.date,
        complaintId,
        institutionName: 'Institution',
        actionType: 'Comment',
        performedBy: newComment.author,
        status: 'Under Review',
        remarks: commentText
      },
      ...prev
    ]);

    showToast('Comment added to case audit trail', 'info');
  };

  // Submit Overlap Decision
  const submitOverlapDecision = (overlapId, decision, reason) => {
    setOverlaps((prev) =>
      prev.map((ov) => {
        if (ov.id === overlapId) {
          return {
            ...ov,
            status: decision === 'Mark as Related' ? 'Marked as Related' : 'Dismissed',
            decision,
            reason
          };
        }
        return ov;
      })
    );

    showToast(`Overlap decision saved: "${decision}"`, 'success');
  };

  // Add User
  const addUser = (userData) => {
    const newUser = {
      id: `u-${Date.now()}`,
      name: userData.name,
      username: userData.username || userData.name.toLowerCase().replace(/\s+/g, '.'),
      email: userData.email,
      role: userData.role || 'Reviewer',
      department: userData.department || 'General',
      institution: userData.institution || 'BIT Sindri',
      status: 'Active',
      lastLogin: 'Never',
      avatar: userData.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
      bureau: userData.bureau || 'RB'
    };

    setUsers((prev) => [newUser, ...prev]);
    showToast(`User ${newUser.name} added successfully!`, 'success');
  };

  // Mark alert as read
  const markAlertAsRead = (alertId) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: 'Read' } : a))
    );
  };

  const markAllAlertsAsRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, status: 'Read' })));
    showToast('All notifications marked as read', 'info');
  };

  // Active institution object
  const activeInstitution = useMemo(() => {
    return institutions.find((i) => i.id === selectedInstitutionId) || institutions[0];
  }, [institutions, selectedInstitutionId]);

  // Active complaint object
  const activeComplaint = useMemo(() => {
    return complaints.find((c) => c.id === selectedComplaintId) || complaints[0];
  }, [complaints, selectedComplaintId]);

  // Active overlap object
  const activeOverlap = useMemo(() => {
    return overlaps.find((o) => o.id === selectedOverlapId) || overlaps[0];
  }, [overlaps, selectedOverlapId]);

  // Calculations for System KPIs
  const kpis = useMemo(() => {
    const total = 1248;
    const pending = 412;
    const underProcess = 336;
    const disposed = 438;
    const transferred = 62;
    const overdue = 54;
    const potentialOverlaps = 18;
    const activeInstitutionsCount = institutions.length;
    const unreadAlertsCount = alerts.filter((a) => a.status === 'Unread').length;

    return {
      total,
      pending,
      underProcess,
      disposed,
      transferred,
      overdue,
      potentialOverlaps,
      activeInstitutionsCount,
      unreadAlertsCount
    };
  }, [institutions, alerts]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAuthenticated,
        setIsAuthenticated,
        switchRole,
        activeView,
        setActiveView,
        isSidebarOpen,
        setIsSidebarOpen,
        navigateTo,
        selectedInstitutionId,
        setSelectedInstitutionId,
        activeInstitution,
        selectedComplaintId,
        setSelectedComplaintId,
        activeComplaint,
        selectedOverlapId,
        setSelectedOverlapId,
        activeOverlap,
        selectedAssignmentId,
        setSelectedAssignmentId,
        selectedActionId,
        setSelectedActionId,
        institutions,
        complaints,
        overlaps,
        assignments,
        actions,
        users,
        alerts,
        bureauApps,
        globalSearch,
        setGlobalSearch,
        registerComplaint,
        updateComplaintStatus,
        assignComplaint,
        addCommentToComplaint,
        submitOverlapDecision,
        addUser,
        markAlertAsRead,
        markAllAlertsAsRead,
        kpis,
        modalState,
        setModalState,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
