import { queryClient } from "../../api/Client";
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import { WorkoutPlanResponseType } from "./WorkoutPlan.type";

export const getWorkoutPlan = async () => {
    const response = await axiosInstance.get("/workout_plans/free");
    return response.data;
}

export const useGetPersonalizedPlan = () => {
    return useQuery<WorkoutPlanResponseType>({
        queryKey: ['personalizedWorkoutPlan'],
        queryFn: async () => {
            const res = await axiosInstance.get('/workout_plans/my-plan');
            return res.data;
        },
        // Don't retry infinitely so we can quickly catch if it hasn't been generated
        retry: 1
    });
};

export const useGenerateWorkoutPlan = () => {
    return useMutation({
        mutationFn: async () => {
            const res = await axiosInstance.post('/workout_plans/generate-ai');
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['personalizedWorkoutPlan'] });
        }
    });
};