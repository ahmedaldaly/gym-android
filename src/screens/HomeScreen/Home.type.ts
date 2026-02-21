export interface UserPlan {
    message: string;
    subscription: {
        id: string;
        userId: string;
        packageId: string;
        starts_at: string;
        ends_at: string;
        is_active: boolean;
        createdAt: string;
        updatedAt: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            gender: string;
            height: number;
            weight: number;
            goal: string;
            level: string;
            planId: string | null;
            isActive: boolean;
            dateOfBirth: string;
            createdAt: string;
            updatedAt: string;
        },
        package: {
            id: string;
            name: string;
            price: number;
            duration: number;
            isActive: boolean;
            createdAt: string;
            updatedAt: string;
        }
    }
}