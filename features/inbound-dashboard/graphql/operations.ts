import { gql, TypedDocumentNode } from "@apollo/client";
import type {
  InboundDashboardQueryData,
  SubmitFeedbackData,
  SubmitFeedbackVariables,
} from "../types";

export const GET_INBOUND_DASHBOARD: TypedDocumentNode<
  InboundDashboardQueryData,
  Record<string, never>
> = gql`
  query GetInboundDashboard {
    inboundDashboard {
      location
      updatedAt
      featuredGuestId
      metrics {
        deliveriesToday
        vehiclesReady
        checkedIn
        averageWaitMinutes
      }
      guests {
        id
        displayName
        status
        appointmentTime
        checkedInAt
        estimatedWaitMinutes
        progressLabel
        progressPercent
        specialist {
          id
          name
          initials
          availability
          currentGuest
        }
      }
      specialistsOnDeck {
        id
        name
        initials
        availability
        currentGuest
      }
    }
  }
`;

export const SUBMIT_FEEDBACK: TypedDocumentNode<
  SubmitFeedbackData,
  SubmitFeedbackVariables
> = gql`
  mutation SubmitFeedback($input: FeedbackInput!) {
    submitFeedback(input: $input) {
      id
      rating
      comment
      createdAt
    }
  }
`;
