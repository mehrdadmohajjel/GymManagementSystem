// src/api/gym.api.ts
import type { CreateGymDto } from "../model/gym/CreateGymDto";
import type { gymViewModel } from "../model/gym/gymViewModel";
import api from "./api";


export const gymApi = {

    getAll: async (): Promise<gymViewModel[]> => {
        const res: gymViewModel[] = await api('get', '/api/general/GymList', null, true, null);
        return res;
      }, 

  create: async (data: CreateGymDto): Promise<void> => {
    await api(
      "post",
      "/api/gyms/createGym",
      data,
      true
    );
  },

  // ویرایش
  update: async (id: number, data: CreateGymDto): Promise<void> => {
    await api(
      "put",
      `/api/gyms/updateGym/${id}`,
      data,
      true
    );
  },

  // حذف
  remove: async (id: number): Promise<void> => {
    await api(
      "delete",
      `/api/gyms/deleteGym/${id}`,
      null,
      true
    );
  },

};
