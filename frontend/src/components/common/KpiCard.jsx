import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const KpiCard = ({
  label,
  value,
  trend,
  trendType = 'positive',
  trendPeriod = 'vs. last month',
  icon: Icon,
  iconBg = '#eff6ff',
  iconColor = '#2563eb',
  onClick
}) => {
  return (
    <div
      className="kpi-card"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="kpi-header">
        <div className="kpi-label">{label}</div>
        {Icon && (
          <div className="kpi-icon-wrapper" style={{ backgroundColor: iconBg }}>
            <Icon size={17} color={iconColor} />
          </div>
        )}
      </div>

      <div className="kpi-value">{value}</div>

      {trend && (
        <div className={`kpi-trend ${trendType}`}>
          {trendType === 'positive' ? (
            <ArrowUpRight size={13} />
          ) : (
            <ArrowDownRight size={13} />
          )}
          <span>{trend}</span>
          {trendPeriod && <span className="kpi-trend-sub">{trendPeriod}</span>}
        </div>
      )}
    </div>
  );
};
