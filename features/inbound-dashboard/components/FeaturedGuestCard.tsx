import type { CSSProperties } from "react";
import type { Guest } from "../types";
import { specialistDetails, statusDetails } from "../lib/statusTokens";

export function FeaturedGuestCard({ guest }: { guest: Guest }) {
  const status = statusDetails[guest.status];

  return (
    <section className="mobile-focus" aria-label="Your check-in">
      <div className="mobile-focus-header">
        <div>
          <p>Your check-in</p>
          <h2>{guest.displayName}</h2>
        </div>
        <span className="checkin-badge">Checked in</span>
      </div>

      <div className="mobile-status">
        <div className="mobile-status-topline">
          <div>
            <p className="label">Current status</p>
            <h3>{status.label}</h3>
          </div>
          <div className="mobile-wait">
            <strong>{guest.estimatedWaitMinutes}</strong>
            <span>min est.</span>
          </div>
        </div>

        <div className="mobile-progress">
          <div className="progress-label">
            <span>{guest.progressLabel}</span>
            <span>{guest.progressPercent}%</span>
          </div>
          <div
            className="progress-track"
            role="progressbar"
            aria-label={`${guest.displayName} progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={guest.progressPercent}
          >
            <div
              className="progress-fill"
              style={
                {
                  "--progress": `${guest.progressPercent}%`,
                  "--progress-color": status.progressColor,
                } as CSSProperties
              }
            />
          </div>
        </div>

        {guest.specialist && (
          <div className="mobile-specialist">
            <span className="avatar">{guest.specialist.initials}</span>
            <div>
              <p className="label">Your specialist</p>
              <p className="name">{guest.specialist.name}</p>
              <p className="availability">
                {specialistDetails[guest.specialist.availability].label}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
