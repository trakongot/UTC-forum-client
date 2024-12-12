'use client';
import { getUserByCookies } from '@/apis/user';
import useUserStore from '@/store/useUserStore';
import { useEffect } from 'react';

export const useInitializeUser = () => {
  const { setUser } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserByCookies();
      setUser(user);
    };
    fetchUser();
  }, []);
};
