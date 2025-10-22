'use client';

import { User } from 'firebase/auth';
import { useFirebase } from '@/firebase/provider';

export interface UseUser {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

export const useUser = (): UseUser => {
  const { user, isUserLoading, userError } = useFirebase();
  return { user, loading: isUserLoading, error: userError };
};
