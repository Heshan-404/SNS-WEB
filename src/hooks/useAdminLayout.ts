'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useAdminLayout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call the logout API endpoint (optional, for server-side session invalidation)
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'X-Requested-From': 'frontend',
        },
      });

      toast.success('Logged out successfully!');
      router.push('/admin/login'); // Redirect to login page
    } catch (error: unknown) {
      console.error('Logout failed:', error);
      let errorMessage = 'Failed to logout. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  return {
    handleLogout,
  };
};
