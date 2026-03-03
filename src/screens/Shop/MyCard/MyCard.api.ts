import axiosInstance from "../../../utils/axios";
import { useQuery ,useMutation } from "@tanstack/react-query";
import {queryClient} from "../../../api/Client";
export const useGetMyOrders = ()=>{
    return useQuery({
        queryKey: ["my-orders"],
        queryFn: async () => {
            const response = await axiosInstance.get("/orders/get/user");
            return response.data;
        },
    });
}

export const useUpdateQuantity = () => { 
    return useMutation({
        mutationFn: async (data: { id: string; quantity: number }) => {
            const response = await axiosInstance.put(`/orders/update/${data.id}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-orders"] });
        },
    });
}

export const useDeleteOrder = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await axiosInstance.delete(`/orders/delete/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-orders"] });
        },
    });
}