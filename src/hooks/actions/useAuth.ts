import apiClient from "@/axios";
import { useUserStore } from "@/zustand/useUserStore";
import { useEffect, useRef } from "react";
import type { IUser } from "../interfaces/auth";
import type { ApiResponseUser } from "../interfaces/axios";


export const useUser = () => {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const setLoading = useUserStore((state) => state.setLoading);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchUser = async () => {
      try {
        const res = await apiClient.get<ApiResponseUser<IUser>>("user/GetMemberDetail") as any;
        if (res.isSuccess) {
          const user = res.data?.[0]?.[0] || null;
          setUser(user);
        } else {
          clearUser();
        }
      } catch {
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
};

