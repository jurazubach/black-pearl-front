
import React from 'react';
import { useEffect, useCallback, useState } from 'react';
import { PATH_PAGE } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useAuthContext } from '../hooks';

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const { authenticated } = useAuthContext();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      router.replace(PATH_PAGE.auth);
    } else {
      setChecked(true);
    }
  }, [authenticated, router]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
