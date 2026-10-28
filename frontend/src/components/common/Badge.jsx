import React from 'react';

export const StatusBadge = ({ status }) => {
  const norm = (status || '').toLowerCase();

  let className = 'badge ';
  if (norm.includes('process')) {
    className += 'badge-process';
  } else if (norm.includes('pending')) {
    className += 'badge-pending';
  } else if (norm.includes('disposed') || norm.includes('resolved') || norm.includes('active') || norm.includes('approved') || norm.includes('closed')) {
    className += 'badge-disposed';
  } else if (norm.includes('transfer')) {
    className += 'badge-transferred';
  } else if (norm.includes('overdue') || norm.includes('rejected') || norm.includes('dismissed')) {
    className += 'badge-overdue';
  } else if (norm.includes('assign')) {
    className += 'badge-assigned';
  } else if (norm.includes('review')) {
    className += 'badge-process';
  } else {
    className += 'badge-process';
  }

  return <span className={className}>{status}</span>;
};

export const PriorityBadge = ({ priority }) => {
  const norm = (priority || '').toLowerCase();
  let className = 'badge ';

  if (norm === 'high') {
    className += 'badge-high';
  } else if (norm === 'medium') {
    className += 'badge-medium';
  } else {
    className += 'badge-low';
  }

  return <span className={className}>{priority}</span>;
};

export const BureauBadge = ({ bureau }) => {
  return <span className="badge badge-bureau">{bureau}</span>;
};
