import { useCallback, useEffect } from 'react';
import { PATH_PAGE } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useAuthContext } from '../hooks';

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useRouter();
  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(PATH_PAGE.admin.dashboard);
    }
  }, [authenticated, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
