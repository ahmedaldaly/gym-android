import { queryClient } from "../../api/Client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";

export const getWorkoutPlan = async () => {
    const response = await axiosInstance.get("/workout_plans/free");
    return response.data;
}