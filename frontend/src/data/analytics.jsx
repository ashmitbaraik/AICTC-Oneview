export const dashboardTrends = [
  { month: "Nov 2024", total: 60, resolved: 30, pending: 20 },
  { month: "Dec 2024", total: 110, resolved: 70, pending: 35 },
  { month: "Jan 2025", total: 105, resolved: 65, pending: 30 },
  { month: "Feb 2025", total: 135, resolved: 85, pending: 42 },
  { month: "Mar 2025", total: 165, resolved: 110, pending: 45 },
  { month: "Apr 2025", total: 175, resolved: 120, pending: 52 }
];

export const bureauDistributionData = [
  { name: "RB (Regulation Bureau)", value: 399, percentage: "32%", color: "#2563eb" },
  { name: "PGRC", value: 299, percentage: "24%", color: "#06b6d4" },
  { name: "Other Cells", value: 225, percentage: "18%", color: "#10b981" },
  { name: "Regional Offices", value: 175, percentage: "14%", color: "#f59e0b" },
  { name: "Academic Planning", value: 100, percentage: "8%", color: "#6366f1" },
  { name: "Others", value: 50, percentage: "4%", color: "#8b5cf6" }
];

export const bureauWorkloadData = [
  { bureau: "RB", pending: 120, disposed: 200, total: 320 },
  { bureau: "PGRC", pending: 110, disposed: 170, total: 280 },
  { bureau: "Other Cells", pending: 70, disposed: 140, total: 210 },
  { bureau: "Regional Offices", pending: 50, disposed: 110, total: 160 },
  { bureau: "Academic Planning", pending: 30, disposed: 65, total: 95 },
  { bureau: "Others", pending: 20, disposed: 45, total: 65 }
];

export const analyticsTrendData = [
  { date: "17 Apr", complaints: 60 },
  { date: "18 Apr", complaints: 95 },
  { date: "19 Apr", complaints: 80 },
  { date: "20 Apr", complaints: 90 },
  { date: "21 Apr", complaints: 75 },
  { date: "22 Apr", complaints: 110 },
  { date: "23 Apr", complaints: 108 },
  { date: "24 Apr", complaints: 148 }
];

export const analyticsCategoriesData = [
  { name: "Academic", value: 349, percentage: "28%", color: "#2563eb" },
  { name: "Infrastructure", value: 224, percentage: "18%", color: "#0ea5e9" },
  { name: "Affiliation", value: 187, percentage: "15%", color: "#f59e0b" },
  { name: "Faculty", value: 150, percentage: "12%", color: "#10b981" },
  { name: "Examination", value: 125, percentage: "10%", color: "#8b5cf6" },
  { name: "Others", value: 213, percentage: "17%", color: "#94a3b8" }
];

export const analyticsBureauData = [
  { bureau: "Academic", count: 312, color: "#3b82f6" },
  { bureau: "Affiliation", count: 248, color: "#10b981" },
  { bureau: "Regulation", count: 196, color: "#8b5cf6" },
  { bureau: "Examination", count: 142, color: "#f59e0b" },
  { bureau: "Others", count: 118, color: "#06b6d4" }
];

export const topInstitutionsByComplaints = [
  { id: "1", name: "BIT Sindri", total: 156, resolved: 112, pending: 44 },
  { id: "2", name: "Sunrise Engineering College", total: 98, resolved: 68, pending: 30 },
  { id: "3", name: "Royal College of Science", total: 76, resolved: 54, pending: 22 },
  { id: "4", name: "Zenith Polytechnic", total: 64, resolved: 47, pending: 17 },
  { id: "5", name: "Green Valley University", total: 58, resolved: 42, pending: 16 }
];

export const recentReportsList = [
  { name: "Monthly Complaint Summary", format: "PDF", size: "2.4 MB", date: "24 Apr 2025" },
  { name: "Bureau-wise Analysis Report", format: "PDF", size: "1.8 MB", date: "22 Apr 2025" },
  { name: "Institution-wise Report", format: "Excel", size: "1.2 MB", date: "20 Apr 2025" },
  { name: "Category-wise Report", format: "PDF", size: "1.6 MB", date: "18 Apr 2025" },
  { name: "Resolution Time Analysis", format: "PDF", size: "1.9 MB", date: "15 Apr 2025" }
];

export const bureauApplicationsTrend = [
  { date: "Jun 1", total: 75, approved: 40, rejected: 10 },
  { date: "Jun 7", total: 100, approved: 65, rejected: 15 },
  { date: "Jun 14", total: 140, approved: 80, rejected: 20 },
  { date: "Jun 21", total: 150, approved: 85, rejected: 18 },
  { date: "Jun 28", total: 180, approved: 115, rejected: 22 }
];

export const bureauCellWiseDistribution = [
  { name: "Academic Cell", count: 68, percentage: "27%", color: "#3b82f6" },
  { name: "Examination Cell", count: 54, percentage: "22%", color: "#10b981" },
  { name: "Affiliation Cell", count: 46, percentage: "19%", color: "#f59e0b" },
  { name: "Administration Cell", count: 38, percentage: "15%", color: "#8b5cf6" },
  { name: "Others", count: 42, percentage: "17%", color: "#94a3b8" }
];

export const analyticsData = {
  dashboardTrends,
  bureauDistributionData,
  bureauWorkloadData,
  analyticsTrendData,
  analyticsCategoriesData,
  analyticsBureauData,
  topInstitutionsByComplaints,
  recentReportsList,
  bureauApplicationsTrend,
  bureauCellWiseDistribution
};

export default analyticsData;
