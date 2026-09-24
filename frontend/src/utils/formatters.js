/**
 * Formatting and utility helpers for dates, durations, and status badges.
 */

export function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return '0.0s';
  if (seconds < 1) {
    return `${Math.round(seconds * 1000)}ms`;
  }
  return `${Number(seconds).toFixed(1)}s`;
}

export function formatDate(timestamp) {
  if (!timestamp) return 'Just now';
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatNumber(num) {
  if (num === null || num === undefined) return '0';
  return new Intl.NumberFormat().format(num);
}

export function formatRelativeTime(dateString) {
  if (!dateString) return 'Just now';
  const date = new Date(dateString);
  const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);

  if (diffSec < 60) return 'Just now';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hours ago`;
  return `${Math.floor(diffSec / 86400)} days ago`;
}

