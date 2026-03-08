import axiosInstance from "../../utils/axios";
import { queryClient } from "../../api/Client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DietPlanResponse } from "./DaitPlan.type";

export const useGetDietPlan = () => {
    return useQuery({
        queryKey: ['dietPlan'],
        queryFn: async (): Promise<DietPlanResponse> => {
            const res = await axiosInstance.get('/diet_plans/get-for-user');
            return res.data;
        },
        // We might get a 404 if it's not generated, so we shouldn't retry infinitely
        retry: 1
    });
};

export const useGenerateDietPlan = () => {
    return useMutation({
        mutationFn: async (): Promise<any> => {
            const res = await axiosInstance.post('/diet_plans/generate-ai');
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dietPlan'] });
        }
    });
};
