export type LogInType = {
    email: string;
    password: string;
}
export type RegisterType = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: 'MALE' | 'FEMALE';
    height: number;
    weight: number;
    dateOfBirth: string | Date;
    goal: 'CUTTING' | 'BULKING' | 'FAT_LOSS';
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    hasDisease: boolean;
    diseaseName: string;
    password: string;
}

export type LogInResponseType = {
    message: string;
    user: {
        accessToken: string;
        id: string;
        email: string;
    }
}
export type ProfileResponseType = {
    message: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        gender: 'MALE' | 'FEMALE';
        height: number;
        weight: number;
        goal: 'CUTTING' | 'BULKING' | 'FAT_LOSS';
        level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
        plan: string | null;
        createdAt: string;
        updatedAt: string;
        isActive: boolean;
    }
}