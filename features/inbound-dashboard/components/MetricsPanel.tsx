import { CalendarDays, CarFront, Clock3, Sparkles, UsersRound } from "lucide-react";
import type { DashboardMetrics } from "../types";

export function MetricsPanel({ metrics }: { metrics: DashboardMetrics }) {
  const items = [
    {
      label: "Deliveries today",
      value: metrics.deliveriesToday,
      detail: "On track for today",
      icon: <CalendarDays size={22} aria-hidden="true" />,
    },
    {
      label: "Vehicles ready",
      value: metrics.vehiclesReady,
      detail: "Ready for delivery",
      icon: <CarFront size={22} aria-hidden="true" />,
    },
    {
      label: "Customers checked in",
      value: metrics.checkedIn,
      detail: "Across inbound",
      icon: <UsersRound size={22} aria-hidden="true" />,
    },
    {
      label: "Average wait",
      value: `${metrics.averageWaitMinutes}m`,
      detail: "Updated in real time",
      icon: <Clock3 size={22} aria-hidden="true" />,
    },
  ];

  return (
    <aside className="panel metrics-panel">
      <h2 className="panel-title">
        <span>
          <Sparkles size={16} aria-hidden="true" />
          Today at a glance
        </span>
      </h2>
      <div className="metric-list">
        {items.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span className="metric-icon">{metric.icon}</span>
            <div>
              <p className="metric-label">{metric.label}</p>
              <p className="metric-value">{metric.value}</p>
              <p className="metric-detail">{metric.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}
