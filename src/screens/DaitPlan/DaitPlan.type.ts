export interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
}

export interface Meal {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    image: string;
}

export interface DietMealItem {
    id: string;
    plan_id: string;
    meal_id: string;
    meal_type: string;
    quantity: number;
    meal: Meal;
}

export interface DietMeals {
    Breakfast?: DietMealItem[];
    Lunch?: DietMealItem[];
    Dinner?: DietMealItem[];
    Snacks?: DietMealItem[];
}

export interface DietPlan {
    id: string;
    userId: string;
    calories_target: number;
    createdAt: string;
    user: UserInfo;
    dietMeals: DietMeals;
}

export interface DietPlanResponse {
    message: string;
    dietPlan?: DietPlan;
}
