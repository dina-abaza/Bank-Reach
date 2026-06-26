'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { FullPageSpinner } from '@/components/ui/Spinner';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      setChecking(false);
    } else {
      router.replace('/login');
    }
  }, [router]);

  if (checking) return <FullPageSpinner />;
  return children;
}
