import { queryClient } from "../api/Client";
import { useQuery ,useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import type {LogInType ,RegisterType} from './Auth.type'
export const LogInApi = () => {
    return useMutation({
        mutationFn: async(data: LogInType) =>{
            const res = await axiosInstance.post("/auth/login", data)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });
}
export const RegisterApi = () => {
    return useMutation({
        mutationFn: async(data: RegisterType) =>{
            const res = await axiosInstance.post("/auth/register", data)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });
}
export const useGetProfile = () => {
    return useQuery({
        queryKey:['profile'],
        queryFn:async ()=>{
            const res = await axiosInstance.get('/user/profile')
            return res.data
        }
    })
}

export const useSendCodeForgetPassword = () => {
    return useMutation({
        mutationFn: async(data: {email:string}) =>{
            const res = await axiosInstance.post("/auth/send-otp", data)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });
}
export const useVerifyCodeForgetPassword = () => {
    return useMutation({
        mutationFn: async(data: {email:string,otp:string ,NewPassword:string ,NewPasswordConfirmation:string}) =>{
            const res = await axiosInstance.post("/auth/verify-otp", data)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });
}

export const useLogOut = () => {
    return useMutation({
        mutationFn: async() =>{
            const res = await axiosInstance.post("/auth/logout")
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["auth"] });
        },
    });
}
