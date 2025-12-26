export const UserRole = {
  SystemAdmin: "SystemAdmin",
  GymAdmin: "GymAdmin",
  Athlete: "Athlete",
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];
