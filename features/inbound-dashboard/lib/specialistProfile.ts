import type { Specialist } from "../types";

export interface SpecialistProfile {
  role: string;
  customersToday: number;
  assistedToday: number;
  rating: number;
  reviews: number;
  specialty: string;
}

const specialties = [
  "Delivery walkthroughs",
  "Trade-in support",
  "Vehicle orientation",
  "Paperwork and registration",
];

/**
 * Derives demo profile stats deterministically from the specialist's id, so
 * the same specialist always shows the same numbers. Mock-only: replace with
 * real data once the API provides it.
 */
export function getSpecialistProfile(
  specialist: Specialist,
  index: number,
): SpecialistProfile {
  const seed = [...specialist.id].reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
  const assistedToday = 5 + (seed % 4);
  const customersToday =
    assistedToday + (specialist.currentGuest ? 1 : 0) + (seed % 3);

  return {
    role: index % 2 === 0 ? "Senior Specialist" : "Specialist",
    customersToday,
    assistedToday,
    rating: Number((4.6 + (seed % 4) * 0.1).toFixed(1)),
    reviews: 58 + (seed % 87),
    specialty: specialties[seed % specialties.length],
  };
}
