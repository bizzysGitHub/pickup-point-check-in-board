import { makeExecutableSchema } from "@graphql-tools/schema";
import { GraphQLError } from "graphql";
import { mockDashboard } from "../data/mockDashboard";
import type { Feedback, FeedbackInput } from "../types";

export const FEEDBACK_COMMENT_MAX_LENGTH = 600;

const typeDefs = `#graphql
  enum GuestStatus {
    CHECKING_IN
    VEHICLE_IN_DETAIL
    VEHICLE_ON_STANDBY
    VEHICLE_READY
    VEHICLE_NOT_READY
  }

  enum SpecialistAvailability {
    READY
    WITH_GUEST
    WRAPPING_UP
  }

  type DashboardMetrics {
    deliveriesToday: Int!
    vehiclesReady: Int!
    checkedIn: Int!
    averageWaitMinutes: Int!
  }

  type Specialist {
    id: ID!
    name: String!
    initials: String!
    availability: SpecialistAvailability!
    currentGuest: String
  }

  type Guest {
    id: ID!
    displayName: String!
    status: GuestStatus!
    appointmentTime: String!
    checkedInAt: String!
    estimatedWaitMinutes: Int!
    progressLabel: String!
    progressPercent: Int!
    specialist: Specialist
  }

  type InboundDashboard {
    location: String!
    updatedAt: String!
    featuredGuestId: ID!
    metrics: DashboardMetrics!
    guests: [Guest!]!
    specialistsOnDeck: [Specialist!]!
  }

  type Feedback {
    id: ID!
    rating: Int!
    comment: String!
    createdAt: String!
  }

  input FeedbackInput {
    """0 means no star rating was given."""
    rating: Int!
    comment: String!
  }

  type Query {
    inboundDashboard: InboundDashboard!
  }

  type Mutation {
    submitFeedback(input: FeedbackInput!): Feedback!
  }
`;

function validateFeedback({ rating, comment }: FeedbackInput) {
  if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
    throw new GraphQLError("rating must be a whole number from 0 to 5", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }
  if (comment.length > FEEDBACK_COMMENT_MAX_LENGTH) {
    throw new GraphQLError(
      `comment must be at most ${FEEDBACK_COMMENT_MAX_LENGTH} characters`,
      { extensions: { code: "BAD_USER_INPUT" } },
    );
  }
  if (rating === 0 && comment.trim().length === 0) {
    throw new GraphQLError("provide a rating or a comment", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }
}

/**
 * Builds a mock schema with its own in-memory feedback store, so tests (and
 * separate clients) never share state. Swap for the real API via
 * NEXT_PUBLIC_GRAPHQL_URL.
 */
export function createMockSchema(store: Feedback[] = []) {
  const resolvers = {
    Query: {
      inboundDashboard: () => ({
        ...mockDashboard,
        updatedAt: new Date().toISOString(),
      }),
    },
    Mutation: {
      submitFeedback: (_: unknown, { input }: { input: FeedbackInput }) => {
        validateFeedback(input);

        const feedback: Feedback = {
          id: `feedback-${store.length + 1}`,
          rating: input.rating,
          comment: input.comment.trim(),
          createdAt: new Date().toISOString(),
        };
        store.push(feedback);
        return feedback;
      },
    },
  };

  return makeExecutableSchema({ typeDefs, resolvers });
}

export const mockSchema = createMockSchema();
