'use client';

import React from 'react';
import { GuestGuard } from 'src/auth/guard';
import { AuthConsumer, AuthProvider } from 'src/auth/context/jwt';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthProvider>
      <AuthConsumer>
        <GuestGuard>
          {children}
        </GuestGuard>
      </AuthConsumer>
    </AuthProvider>
  );
}
