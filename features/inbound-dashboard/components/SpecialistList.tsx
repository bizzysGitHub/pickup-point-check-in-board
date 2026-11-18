"use client";

import { useState, type CSSProperties } from "react";
import { UserRoundCheck } from "lucide-react";
import type { Specialist } from "../types";
import { specialistDetails } from "../lib/statusTokens";
import { SpecialistListScene } from "./SpecialistListScene";

interface SpecialistListProps {
  specialists: Specialist[];
  onSelect: (specialist: Specialist) => void;
}

export function SpecialistList({ specialists, onSelect }: SpecialistListProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <aside className="panel team-panel">
      <h2 className="panel-title">
        <span>
          <UserRoundCheck size={16} aria-hidden="true" />
          Specialists on deck
        </span>
      </h2>
      <div
        className="specialist-list"
        onPointerLeave={() => setActiveIndex(null)}
      >
        <SpecialistListScene
          accents={specialists.map(
            (specialist) => specialistDetails[specialist.availability].color,
          )}
          activeIndex={activeIndex}
        />
        {specialists.map((specialist, index) => {
          const availability = specialistDetails[specialist.availability];

          return (
            <button
              className="specialist-card"
              type="button"
              key={specialist.id}
              onPointerEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex(null)}
              onClick={() => onSelect(specialist)}
              aria-label={`View ${specialist.name}'s specialist profile`}
            >
              <span className="avatar">{specialist.initials}</span>
              <span className="specialist-card-copy">
                <span className="specialist-name">{specialist.name}</span>
                <span
                  className="specialist-meta"
                  style={
                    { "--specialist-color": availability.color } as CSSProperties
                  }
                >
                  <span
                    className="status-dot"
                    style={
                      { "--status-color": availability.color } as CSSProperties
                    }
                  />
                  {availability.label}
                </span>
                <span className="specialist-guest">
                  {specialist.currentGuest
                    ? `Assisting ${specialist.currentGuest}`
                    : "Available for assignment"}
                </span>
              </span>
              <span className="specialist-view" aria-hidden="true">
                View profile
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
