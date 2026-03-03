export type OrderType = {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    total_price: number;
    status: string;
    isPuy: boolean;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        gender: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
    };
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
        external_link: string;
        description: string;
        category_id: string;
    };
};
