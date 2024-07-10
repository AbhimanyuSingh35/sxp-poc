import { useRouter } from 'next/router';
import { RedirectToSignIn, useUser } from '@clerk/nextjs';
import { ReactNode, useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn && user) {
      const role = user.unsafeMetadata.role as string;
      const currentPath = router.pathname;

      if (role && !currentPath.includes(role)) {
        router.push(`/dashboard/${role}`);
      }
    }
  }, [isSignedIn, user, router]);

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
