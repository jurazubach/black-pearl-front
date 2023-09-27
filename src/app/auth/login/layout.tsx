'use client';

import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';
import { AuthConsumer, AuthProvider } from 'src/auth/context/jwt';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthProvider>
      <AuthConsumer>
        <GuestGuard>
          <AuthClassicLayout>{children}</AuthClassicLayout>
        </GuestGuard>
      </AuthConsumer>
    </AuthProvider>
  );
}
