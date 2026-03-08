export interface Package {
  id: string;
  name: string;
  price: number;
  duration: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserSubscription {
  message: string;
  subscription?: {
    id: string;
    userId: string;
    packageId: string;
    starts_at: string;
    ends_at: string;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
    user?: any;
    package: Package;
  };
}
