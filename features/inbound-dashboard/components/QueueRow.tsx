"use client";

import { useState, type CSSProperties } from "react";
import type { Guest } from "../types";
import { waitColor } from "../lib/formatters";
import { statusDetails } from "../lib/statusTokens";
import { GuestRowScene } from "./GuestRowScene";

export function QueueRow({ guest }: { guest: Guest }) {
  const status = statusDetails[guest.status];
  const [active, setActive] = useState(false);

  return (
    <div
      className="queue-grid-row"
      role="row"
      tabIndex={0}
      aria-label={`${guest.displayName}, ${status.label}, ${guest.estimatedWaitMinutes} minute estimated wait, ${guest.progressPercent} percent complete`}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <GuestRowScene
        accent={status.progressColor}
        active={active}
        surfaceColor={status.surfaceColor}
        activeSurfaceColor={status.activeSurfaceColor}
      />
      <div className="queue-cell guest-name" role="cell">
        <span className="guest-monogram" aria-hidden="true">
          {guest.displayName.charAt(0)}
        </span>
        {guest.displayName}
      </div>
      <div className="queue-cell" role="cell">
        <span className="status">
          <span
            className="status-dot"
            style={{ "--status-color": status.color } as CSSProperties}
          />
          {status.label}
        </span>
      </div>
      <div className="queue-cell" role="cell">
        <span
          className="wait"
          style={
            {
              "--wait-color": waitColor(guest.estimatedWaitMinutes),
            } as CSSProperties
          }
        >
          {guest.estimatedWaitMinutes} min
        </span>
      </div>
      <div className="queue-cell progress-cell" role="cell">
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
      <div className="queue-cell guest-name specialist-cell" role="cell">
        {guest.specialist?.name ?? "Assigning now"}
      </div>
    </div>
  );
}
