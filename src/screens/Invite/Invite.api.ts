import axiosInstance from "../../utils/axios";
import { queryClient } from "../../api/Client";
import { useQuery ,useMutation } from "@tanstack/react-query";
import { InviteCodeData } from "./Invite.type";

export const useInviteData = () => {
    return useQuery<InviteCodeData | undefined>({
        queryKey: ['invite'],
        queryFn: () => axiosInstance.get('/invite/get').then(res => res.data.data),
    })
}

export const useInviteMutation = () => {
    return useMutation({
        mutationFn: () => axiosInstance.post('/invite/create').then(res => res.data.data), // No data needed to create
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invite'] })
        }
    })
}