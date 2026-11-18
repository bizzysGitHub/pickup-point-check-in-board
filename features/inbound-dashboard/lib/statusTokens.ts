import type { GuestStatus, SpecialistAvailability } from "../types";

export interface StatusDetail {
  label: string;
  color: string;
  progressColor: string;
  surfaceColor?: string;
  activeSurfaceColor?: string;
}

export const statusDetails: Record<GuestStatus, StatusDetail> = {
  CHECKING_IN: {
    label: "Checking in",
    color: "#f7fbff",
    progressColor: "#f7fbff",
  },
  VEHICLE_IN_DETAIL: {
    label: "Vehicle in detail",
    color: "#ffc928",
    progressColor: "#ffc928",
  },
  VEHICLE_ON_STANDBY: {
    label: "Vehicle on standby",
    color: "#ffb340",
    progressColor: "#ff9f1c",
    surfaceColor: "#2d1c08",
    activeSurfaceColor: "#42300f",
  },
  VEHICLE_READY: {
    label: "Vehicle ready",
    color: "#70d94f",
    progressColor: "#70d94f",
  },
  VEHICLE_NOT_READY: {
    label: "Vehicle not ready",
    color: "#ff5f61",
    progressColor: "#e33f46",
    surfaceColor: "#2e1519",
    activeSurfaceColor: "#442027",
  },
};

export const specialistDetails: Record<
  SpecialistAvailability,
  { label: string; color: string }
> = {
  READY: { label: "Ready to assist", color: "#70d94f" },
  WITH_GUEST: { label: "With a guest", color: "#45c1ff" },
  WRAPPING_UP: { label: "Wrapping up", color: "#ffc928" },
};
