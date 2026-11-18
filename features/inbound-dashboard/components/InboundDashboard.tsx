"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { CarFront, RefreshCw, UsersRound } from "lucide-react";
import { GET_INBOUND_DASHBOARD } from "../graphql/operations";
import type { Specialist } from "../types";
import { useClock } from "../hooks/useClock";
import { formatClock } from "../lib/formatters";
import { getSpecialistProfile } from "../lib/specialistProfile";
import { FeaturedGuestCard } from "./FeaturedGuestCard";
import { FeedbackModal } from "./FeedbackModal";
import { FooterStrip } from "./FooterStrip";
import { MetricsPanel } from "./MetricsPanel";
import { QueueRow } from "./QueueRow";
import { SpecialistList } from "./SpecialistList";
import { SpecialistModal } from "./SpecialistModal";

const POLL_INTERVAL_MS = 15_000;

export function InboundDashboard() {
  const { data, loading, error, refetch } = useQuery(GET_INBOUND_DASHBOARD, {
    pollInterval: POLL_INTERVAL_MS,
  });
  const now = useClock();
  const [selectedSpecialist, setSelectedSpecialist] =
    useState<Specialist | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const dashboard = data?.inboundDashboard;
  const featuredGuest = useMemo(
    () =>
      dashboard?.guests.find((guest) => guest.id === dashboard.featuredGuestId),
    [dashboard],
  );

  if (loading && !dashboard) {
    return <div className="empty-state">Loading the board…</div>;
  }

  if (error || !dashboard) {
    return (
      <div className="empty-state">
        <div>
          <h1>We couldn’t load the board.</h1>
          <button className="refresh-button" onClick={() => void refetch()}>
            <RefreshCw size={15} aria-hidden="true" />
            Try again
          </button>
        </div>
      </div>
    );
  }

  const selectedIndex = selectedSpecialist
    ? dashboard.specialistsOnDeck.findIndex(
        (specialist) => specialist.id === selectedSpecialist.id,
      )
    : -1;
  const selectedGuest = selectedSpecialist?.currentGuest
    ? (dashboard.guests.find(
        (guest) => guest.displayName === selectedSpecialist.currentGuest,
      ) ?? null)
    : null;

  return (
    <main className="dashboard-shell">
      <section className="dashboard-frame" aria-label="Check-in board">
        <header className="topbar">
          <div className="brand" aria-label="Pickup Point">
            <span className="brand-mark">
              <CarFront size={29} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <span>PICKUP POINT</span>
          </div>

          <div className="welcome-copy">
            <p className="eyebrow">Vehicle pickup center</p>
            <h1>Welcome to Pickup Point.</h1>
            <p className="subhead">You’re checked in. We’ll keep you moving.</p>
          </div>

          <div className="location-card">
            <p className="location">{dashboard.location}</p>
            <p className="clock">{formatClock(now)}</p>
            <p className="updated">
              Live board · refreshed {formatClock(new Date(dashboard.updatedAt))}
            </p>
          </div>
        </header>

        <div className="main-grid">
          <MetricsPanel metrics={dashboard.metrics} />

          <section className="panel queue-panel">
            <h2 className="panel-title">
              <span>
                <UsersRound size={16} aria-hidden="true" />
                Checked-in guests
              </span>
              <button
                className="refresh-button"
                type="button"
                onClick={() => void refetch()}
              >
                <RefreshCw size={13} aria-hidden="true" />
                Refresh
              </button>
            </h2>
            <div
              className="queue-grid"
              role="table"
              aria-label="Checked-in guests"
            >
              <div className="queue-grid-header" role="row">
                <div role="columnheader">Guest</div>
                <div role="columnheader">Status</div>
                <div role="columnheader">Est. wait</div>
                <div role="columnheader">Progress</div>
                <div role="columnheader">Specialist</div>
              </div>
              <div className="queue-grid-body" role="rowgroup">
                {dashboard.guests.map((guest) => (
                  <QueueRow guest={guest} key={guest.id} />
                ))}
              </div>
            </div>
          </section>

          <SpecialistList
            specialists={dashboard.specialistsOnDeck}
            onSelect={setSelectedSpecialist}
          />

          {featuredGuest && <FeaturedGuestCard guest={featuredGuest} />}
        </div>

        <FooterStrip onFeedbackClick={() => setFeedbackOpen(true)} />
      </section>

      {selectedSpecialist && (
        <SpecialistModal
          specialist={selectedSpecialist}
          profile={getSpecialistProfile(
            selectedSpecialist,
            Math.max(selectedIndex, 0),
          )}
          currentGuest={selectedGuest}
          onClose={() => setSelectedSpecialist(null)}
        />
      )}

      {feedbackOpen && <FeedbackModal onClose={() => setFeedbackOpen(false)} />}
    </main>
  );
}
