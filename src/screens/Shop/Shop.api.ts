import { queryClient } from "../../api/Client";
import { useQuery ,useMutation} from "@tanstack/react-query";
import axiosInstance from "../../utils/axios";
import type {OrderRequestType} from './Shop.type'
export const getCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosInstance.get('/categories/get')
            return res.data.categories
        },
        
    })
}

export const getProducts = (query:{category_id?:string}) => {
    return useQuery({
        queryKey: ['products',query.category_id],
        queryFn: async () => {
            const res = await axiosInstance.get('/products/getAllProducts', {params:query})
            return res.data
        },
        
    })
}
export const useCreateOrder = () => {
    return useMutation({
        mutationFn: async (data:OrderRequestType) => {
            const res = await axiosInstance.post('/orders/create', data)
            return res.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['orders']})
        }
    })
}

export const useGetOrderForUser = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await axiosInstance.get('/orders/get/user')
            return res.data
        },
    })
}