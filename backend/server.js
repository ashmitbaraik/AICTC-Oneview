// AICTE OneView - Backend Server & AI Overlap Detection Engine
// Problem Statement: SIH26264 (Smart India Hackathon 2026)
// Team: TENET

import http from 'node:http';
import url from 'node:url';

const PORT = process.env.PORT || 5000;

// In-Memory Seed Data matching SIH Blueprint
let institutions = [
  {
    id: 'inst-1',
    name: 'BIT Sindri',
    subtitle: 'Government Engineering College',
    aicteId: '1-1000001',
    type: 'Government',
    location: 'Sindri, Dhanbad, Jharkhand - 828123',
    city: 'Dhanbad',
    state: 'Jharkhand',
    region: 'Eastern',
    established: '1949',
    affiliatedUniversity: 'Jharkhand University of Technology',
    website: 'www.bitsindri.ac.in',
    contactNumber: '+91-326-222-XXXX',
    email: 'principal@bitsindri.ac.in',
    principalName: 'Dr. S. K. Verma',
    status: 'Approved',
    activeComplaints: 12,
    totalComplaints: 18,
    disposedComplaints: 6,
    transferredComplaints: 0,
    underProcessComplaints: 5,
    primaryBureau: 'RB',
    associatedBureaus: ['Regulation Bureau (RB)', 'Public Grievance Redressal Cell (PGRC)', 'Academic Planning']
  },
  {
    id: 'inst-2',
    name: 'Global Tech Institute',
    subtitle: 'Engineering College',
    aicteId: '1-1000001',
    type: 'Private-Self Financing',
    location: 'Delhi, Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    region: 'Northern',
    established: '2010',
    status: 'Active',
    activeComplaints: 12,
    totalComplaints: 35,
    disposedComplaints: 18,
    transferredComplaints: 3,
    underProcessComplaints: 5,
    primaryBureau: 'RB',
    associatedBureaus: ['Regulation Bureau (RB)', 'Public Grievance Redressal Cell (PGRC)']
  },
  {
    id: 'inst-3',
    name: 'Sunrise Engineering College',
    subtitle: 'Engineering College',
    aicteId: '1-1000002',
    type: 'Private',
    location: 'Noida, Uttar Pradesh',
    city: 'Noida',
    state: 'Uttar Pradesh',
    region: 'Northern',
    established: '2005',
    status: 'Active',
    activeComplaints: 8,
    totalComplaints: 98,
    disposedComplaints: 68,
    transferredComplaints: 2,
    underProcessComplaints: 6,
    primaryBureau: 'PGRC',
    associatedBureaus: ['Public Grievance Redressal Cell (PGRC)', 'Regional Offices']
  }
];

let complaints = [
  {
    id: 'C-2024-0789',
    referenceNo: 'Ref-2024-0789',
    institutionId: 'inst-1',
    institutionName: 'BIT Sindri',
    aicteId: '1-1000001',
    title: 'Delay in Grant of Affiliation for New B.Tech Programmes',
    description: 'The Institute has not received affiliation approval for academic year 2024-25 despite fulfilling all required norms and submitting documents on time.',
    category: 'Academic',
    subCategory: 'Affiliation',
    bureau: 'RB',
    status: 'Under Process',
    priority: 'High',
    dateSubmitted: '22 Apr 2025',
    assignedTo: 'Dr. R. Kumar (RB)',
    assignedDate: '22 Apr 2025',
    nextAction: 'Review documents and verify compliance',
    expectedResolutionDate: '30 Apr 2025'
  },
  {
    id: 'C-2024-0823',
    referenceNo: 'Ref-2024-0823',
    institutionId: 'inst-1',
    institutionName: 'BIT Sindri',
    aicteId: '1-1000001',
    title: 'Grievance regarding syllabus approval and affiliation delay',
    description: 'Student body and management grievance regarding pending approvals for syllabus and affiliation timeline delays leading to academic uncertainty.',
    category: 'Affiliation',
    subCategory: 'Academic',
    bureau: 'PGRC',
    status: 'Under Review',
    priority: 'High',
    dateSubmitted: '20 Apr 2025',
    assignedTo: 'Ms. P. Singh (PGRC)',
    assignedDate: '20 Apr 2025',
    nextAction: 'Joint review with Regulation Bureau',
    expectedResolutionDate: '28 Apr 2025'
  }
];

let overlaps = [
  {
    id: 'ov-1',
    caseA: 'C-2024-0789',
    caseB: 'C-2024-0823',
    institution: 'BIT Sindri',
    institutionId: 'inst-1',
    bureauA: 'RB',
    bureauB: 'PGRC',
    categories: ['Academic', 'Affiliation'],
    dateA: '22 Apr 2025',
    dateB: '20 Apr 2025',
    similarityScore: 87,
    priority: 'High',
    status: 'Under Review',
    matchingReasons: [
      'Same institution (BIT Sindri)',
      'Similar complaint description regarding syllabus & affiliation delays',
      'Matching keywords (affiliation, academic, norm clearance)',
      'Same category (Academic / Affiliation)'
    ],
    recommendedAction: 'Please review the details and decide whether these cases are related. Do not merge or close automatically.'
  }
];

let actions = [
  {
    id: 'act-1',
    dateTime: '24 Apr 2025 11:32 AM',
    complaintId: 'C-2024-0789',
    institutionName: 'BIT Sindri',
    actionType: 'Status Update',
    performedBy: 'Dr. R. Kumar (RB)',
    status: 'Under Process',
    remarks: 'Sent to institute for additional documents.'
  }
];

// NLP & Rule-Based Similarity Engine (PPT Slide 3 Algorithm)
function computeOverlapScore(c1, c2) {
  let score = 0;
  const reasons = [];

  // Criterion 1: Same Institution / AICTE Permanent ID (40 points)
  if (c1.aicteId && c2.aicteId && c1.aicteId === c2.aicteId) {
    score += 40;
    reasons.push(`Exact AICTE Permanent ID Match (${c1.aicteId})`);
  } else if (c1.institutionName.toLowerCase() === c2.institutionName.toLowerCase()) {
    score += 35;
    reasons.push(`Same institution name (${c1.institutionName})`);
  }

  // Criterion 2: Cross-Bureau handling (RB vs PGRC vs Others) (15 points)
  if (c1.bureau !== c2.bureau) {
    score += 15;
    reasons.push(`Multiple Bureaus involved: ${c1.bureau} & ${c2.bureau}`);
  }

  // Criterion 3: Category / Subcategory similarity (20 points)
  if (c1.category.toLowerCase() === c2.category.toLowerCase()) {
    score += 20;
    reasons.push(`Identical regulatory category: ${c1.category}`);
  } else if (
    (c1.category === 'Academic' && c2.category === 'Affiliation') ||
    (c1.category === 'Affiliation' && c2.category === 'Academic')
  ) {
    score += 15;
    reasons.push(`Closely related categories (${c1.category} / ${c2.category})`);
  }

  // Criterion 4: NLP Keyword Tokenization & Jaccard match on description (25 points)
  const extractTokens = (text) =>
    (text || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 3);

  const t1 = new Set(extractTokens(c1.title + ' ' + c1.description));
  const t2 = new Set(extractTokens(c2.title + ' ' + c2.description));

  const intersection = [...t1].filter((x) => t2.has(x));
  const union = new Set([...t1, ...t2]);
  const jaccard = union.size > 0 ? intersection.length / union.size : 0;

  if (jaccard > 0.15) {
    const nlpScore = Math.min(25, Math.round(jaccard * 60));
    score += nlpScore;
    reasons.push(`NLP semantic keyword overlap (${intersection.slice(0, 4).join(', ')})`);
  }

  return {
    score: Math.min(98, score),
    reasons
  };
}

// Request helper
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  try {
    // Health Check
    if (pathname === '/api/health' && method === 'GET') {
      return sendJson(res, 200, {
        status: 'UP',
        service: 'AICTE OneView Core API',
        team: 'TENET',
        hackathon: 'SIH 2026',
        problemStatement: 'SIH26264'
      });
    }

    // 1. Institutions
    if (pathname === '/api/institutions' && method === 'GET') {
      return sendJson(res, 200, { count: institutions.length, data: institutions });
    }

    // 2. Complaints List & Creation
    if (pathname === '/api/complaints' && method === 'GET') {
      return sendJson(res, 200, { count: complaints.length, data: complaints });
    }

    if (pathname === '/api/complaints' && method === 'POST') {
      const payload = await parseBody(req);
      const newId = `C-2025-${Math.floor(1000 + Math.random() * 9000)}`;

      const newComplaint = {
        id: newId,
        referenceNo: `Ref-${newId}`,
        institutionId: payload.institutionId || 'inst-1',
        institutionName: payload.institutionName || 'BIT Sindri',
        aicteId: payload.aicteId || '1-1000001',
        title: payload.title || 'Untitled Complaint',
        description: payload.description || '',
        category: payload.category || 'Academic',
        subCategory: payload.subCategory || 'General',
        bureau: payload.bureau || 'RB',
        status: 'Pending',
        priority: payload.priority || 'Medium',
        dateSubmitted: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        assignedTo: 'Not Assigned',
        assignedDate: '-',
        nextAction: 'Initial screening and cell allocation',
        expectedResolutionDate: 'Within 15 days'
      };

      complaints.unshift(newComplaint);

      // Trigger AI Overlap Detection against existing database
      const detectedOverlaps = [];
      for (const existing of complaints) {
        if (existing.id === newComplaint.id) continue;
        const analysis = computeOverlapScore(newComplaint, existing);

        if (analysis.score >= 60) {
          const overlapRecord = {
            id: `ov-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            caseA: newComplaint.id,
            caseB: existing.id,
            institution: newComplaint.institutionName,
            institutionId: newComplaint.institutionId,
            bureauA: newComplaint.bureau,
            bureauB: existing.bureau,
            categories: [newComplaint.category, existing.category],
            similarityScore: analysis.score,
            priority: analysis.score >= 80 ? 'High' : 'Medium',
            status: 'Under Review',
            matchingReasons: analysis.reasons,
            recommendedAction: 'Potential Overlapping Cases – Coordination Required. Review before proceeding with parallel inquiry.'
          };
          overlaps.unshift(overlapRecord);
          detectedOverlaps.push(overlapRecord);
        }
      }

      // Add audit history
      actions.unshift({
        id: `act-${Date.now()}`,
        dateTime: `${new Date().toLocaleDateString('en-GB')} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        complaintId: newComplaint.id,
        institutionName: newComplaint.institutionName,
        actionType: 'Status Update',
        performedBy: 'System Intake Service',
        status: 'Pending',
        remarks: 'Complaint lodged in AICTE OneView central registry.'
      });

      return sendJson(res, 201, {
        success: true,
        complaint: newComplaint,
        overlapsTriggered: detectedOverlaps
      });
    }

    // 3. Potential Overlaps Endpoints
    if (pathname === '/api/overlaps' && method === 'GET') {
      return sendJson(res, 200, { count: overlaps.length, data: overlaps });
    }

    if (pathname.startsWith('/api/overlaps/') && pathname.endsWith('/decision') && method === 'POST') {
      const parts = pathname.split('/');
      const overlapId = parts[3];
      const payload = await parseBody(req);

      const target = overlaps.find((o) => o.id === overlapId);
      if (!target) return sendJson(res, 404, { error: 'Overlap alert not found' });

      target.status = payload.decision === 'Mark as Related' ? 'Marked as Related' : 'Dismissed';
      target.decision = payload.decision;
      target.reason = payload.reason || '';

      return sendJson(res, 200, { success: true, overlap: target });
    }

    // 4. Action History
    if (pathname === '/api/actions' && method === 'GET') {
      return sendJson(res, 200, { count: actions.length, data: actions });
    }

    // Fallback
    sendJson(res, 404, { error: 'Route not found' });
  } catch (err) {
    sendJson(res, 500, { error: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(` AICTE OneView Core Engine running on port ${PORT}`);
  console.log(` Smart India Hackathon 2026 - Team TENET`);
  console.log(` Problem Statement ID: SIH26264`);
  console.log(`=================================================`);
});
