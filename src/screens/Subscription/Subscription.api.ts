import axiosInstance from "../../utils/axios";
import { queryClient } from "../../api/Client";
import { useQuery ,useMutation } from "@tanstack/react-query";

export const useCreateSubscription = () => {
    return useMutation({
        mutationFn:async(packageId:string)=>{
            const res = await axiosInstance.post('/subscriptions',{
                packageId
            })
            return res.data
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['subscription']})
        }
    })
}

export const useGetSubscriptionByUser = () => {
    return useQuery({
        queryKey:['subscription'],
        queryFn:async()=>{
            const res = await axiosInstance.get('/subscriptions/user')
            return res.data
        }
    })
}

export const useGetAllPackages = () => {
    return useQuery({
        queryKey:['packages'],
        queryFn:async()=>{
            const res = await axiosInstance.get('/packages')
            return res.data
        }
    })
}