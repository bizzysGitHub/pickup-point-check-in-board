"use client";

import type { CSSProperties } from "react";
import {
  Award,
  CalendarDays,
  Clock3,
  Star,
  UserRoundCheck,
  UsersRound,
  X,
} from "lucide-react";
import type { Guest, Specialist } from "../types";
import { useModalBehavior } from "../hooks/useModalBehavior";
import { specialistDetails } from "../lib/statusTokens";
import type { SpecialistProfile } from "../lib/specialistProfile";
import { CheckInTimer } from "./CheckInTimer";

interface SpecialistModalProps {
  specialist: Specialist;
  profile: SpecialistProfile;
  currentGuest: Guest | null;
  onClose: () => void;
}

export function SpecialistModal({
  specialist,
  profile,
  currentGuest,
  onClose,
}: SpecialistModalProps) {
  const dialogRef = useModalBehavior<HTMLElement>(true, onClose);
  const availability = specialistDetails[specialist.availability];

  return (
    <div
      className="specialist-modal-backdrop"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="specialist-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="specialist-modal-title"
        tabIndex={-1}
        ref={dialogRef}
      >
        <button
          className="specialist-modal-close"
          type="button"
          aria-label="Close specialist profile"
          onClick={onClose}
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="specialist-modal-hero">
          <span className="avatar specialist-modal-avatar">
            {specialist.initials}
          </span>
          <div>
            <p className="modal-eyebrow">Specialist profile</p>
            <h2 id="specialist-modal-title">{specialist.name}</h2>
            <p className="specialist-role">{profile.role}</p>
            <span
              className="specialist-availability-pill"
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
          </div>
        </div>

        <div className="specialist-rating">
          <div>
            <p>Guest rating</p>
            <strong>{profile.rating}</strong>
            <span>out of 5</span>
          </div>
          <div>
            <span
              className="rating-stars"
              aria-label={`${profile.rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={20}
                  className={
                    index < Math.round(profile.rating) ? "star-filled" : ""
                  }
                  aria-hidden="true"
                />
              ))}
            </span>
            <p>{profile.reviews} guest reviews</p>
          </div>
        </div>

        <div className="specialist-modal-metrics">
          <article>
            <UsersRound size={19} aria-hidden="true" />
            <strong>{profile.customersToday}</strong>
            <span>Customers today</span>
          </article>
          <article>
            <UserRoundCheck size={19} aria-hidden="true" />
            <strong>{profile.assistedToday}</strong>
            <span>Already assisted</span>
          </article>
          <article>
            <Award size={19} aria-hidden="true" />
            <strong>{profile.specialty}</strong>
            <span>Specialty</span>
          </article>
        </div>

        <div className="current-assignment">
          <div>
            <p>Currently assisting</p>
            <h3>{specialist.currentGuest ?? "Available for next guest"}</h3>
          </div>
          <div className="assignment-timing">
            <span>
              <CalendarDays size={16} aria-hidden="true" />
              Appointment {currentGuest?.appointmentTime ?? "—"}
            </span>
            <span className="checkin-timer">
              <Clock3 size={16} aria-hidden="true" />
              Checked in{" "}
              {currentGuest ? (
                <CheckInTimer checkedInAt={currentGuest.checkedInAt} />
              ) : (
                "—"
              )}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
