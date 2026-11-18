export type GuestStatus =
  | "CHECKING_IN"
  | "VEHICLE_IN_DETAIL"
  | "VEHICLE_ON_STANDBY"
  | "VEHICLE_READY"
  | "VEHICLE_NOT_READY";

export type SpecialistAvailability = "READY" | "WITH_GUEST" | "WRAPPING_UP";

export interface Specialist {
  id: string;
  name: string;
  initials: string;
  availability: SpecialistAvailability;
  currentGuest: string | null;
}

export interface Guest {
  id: string;
  displayName: string;
  status: GuestStatus;
  appointmentTime: string;
  checkedInAt: string;
  estimatedWaitMinutes: number;
  progressLabel: string;
  progressPercent: number;
  specialist: Specialist | null;
}

export interface DashboardMetrics {
  deliveriesToday: number;
  vehiclesReady: number;
  checkedIn: number;
  averageWaitMinutes: number;
}

export interface InboundDashboardData {
  location: string;
  updatedAt: string;
  featuredGuestId: string;
  metrics: DashboardMetrics;
  guests: Guest[];
  specialistsOnDeck: Specialist[];
}

export interface InboundDashboardQueryData {
  inboundDashboard: InboundDashboardData;
}

export interface FeedbackInput {
  rating: number;
  comment: string;
}

export interface Feedback extends FeedbackInput {
  id: string;
  createdAt: string;
}

export interface SubmitFeedbackData {
  submitFeedback: Feedback;
}

export interface SubmitFeedbackVariables {
  input: FeedbackInput;
}
