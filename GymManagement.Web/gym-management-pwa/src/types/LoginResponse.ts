export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role: "SystemAdmin" | "GymAdmin" | "Athlete";
  userId: number;
}