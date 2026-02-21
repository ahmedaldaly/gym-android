import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../utils/axios";
import {
  LogInType,
  RegisterType,
  ProfileResponseType,
  LogInResponseType,
} from "../auth/Auth.type";

type AuthState = {
  user: ProfileResponseType["user"] | null;
  token: string | null;
  loading: boolean;
  registerData: Partial<RegisterType>;
  setRegisterData: (data: Partial<RegisterType>) => void;
  login: (data: LogInType) => Promise<void>;
  register: (data: RegisterType) => Promise<void>;
  getProfile: () => Promise<void>;
  logout: () => Promise<void>;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      registerData: {},
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      setRegisterData: (data) =>
        set((state) => ({
          registerData: { ...state.registerData, ...data },
        })),

      // ================= LOGIN =================
      login: async (data) => {
        try {
          set({ loading: true });

          const res = await axiosInstance.post<LogInResponseType>(
            "/auth/login",
            data
          );

          const token = res.data.user.accessToken;

          set({ token });

          // نحط التوكن في الهيدر
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;

          // نجيب البروفايل بعد اللوجين
          await useAuthStore.getState().getProfile();
        } finally {
          set({ loading: false });
        }
      },

      // ================= REGISTER =================
      register: async (data) => {
        try {
          set({ loading: true });

          await axiosInstance.post("/auth/register", data);

        } finally {
          set({ loading: false });
        }
      },

      // ================= PROFILE =================
      getProfile: async () => {
        try {
          const res =
            await axiosInstance.get<ProfileResponseType>("/auth/profile");

          set({ user: res.data.user });
          console.log(res)
        } catch (error: any) {
          console.log("Profile Fetch Error:", error?.response?.data || error.message);

          // نمسح البيانات بس لو المشكلة في الـ Authentication (401)
          if (error?.response?.status === 401) {
            set({ user: null, token: null });
          }
        }
      },

      // ================= LOGOUT =================
      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
        } finally {
          set({ user: null, token: null });

          delete axiosInstance.defaults.headers.common["Authorization"];
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
        // لو في توكن بعد ما الداتا رجعت من الاستورج، نكلم الـ API نجيب البروفايل
        if (state?.token) {
          state.getProfile();
        }
      },
    }
  )
);
