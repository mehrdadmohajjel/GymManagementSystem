import { DailyVacationModel } from "../models/vacation/dailyVacationModel";
import api from "./api";
export const vacationServices = {
    hourlyVacation: async (vacationOwner: string, vacationType: number): Promise<DailyVacationModel[]> => {
        const res: DailyVacationModel[] = await api('get', '/api/vacation/hourlyVacation', null, true, {vacationOwner, vacationType});
        return res;
      }, 
}
