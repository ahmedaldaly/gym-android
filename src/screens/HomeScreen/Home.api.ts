import axiosInstance from "../../utils/axios";
import { queryClient } from "../../api/Client";
import { useQuery } from "@tanstack/react-query";
import { UserPlan } from "./Home.type";

export const useGetUserPlan = () => {
    return useQuery<UserPlan>({
        queryKey: ["user-plan"],
        queryFn: async () => {
            const response = await axiosInstance.get("/subscriptions/user");
            return response.data;
        },
    });
};
