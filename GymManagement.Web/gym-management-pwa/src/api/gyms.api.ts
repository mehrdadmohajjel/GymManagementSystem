// src/api/gym.api.ts
import type { Gym } from "../types/gym";
import { axiosInstance } from "./axios";



export const gymApi = {
getAll: async (): Promise<Gym[]> => {
    const res = await axiosInstance.get<Gym[]>("/gyms/List");
    return res.data;
  },

  create: async (data: Omit<Gym, "id">): Promise<void> => {
    await axiosInstance.post("/gyms", data);
  },

  update: async (id: number, data: Omit<Gym, "id">): Promise<void> => {
    await axiosInstance.put(`/gyms/${id}`, data);
  },

  remove: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/gyms/${id}`);
  },
};
