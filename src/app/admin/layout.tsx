'use client';

import React from 'react';
import { AuthGuard } from 'src/auth/guard';
import { AuthConsumer, AuthProvider } from 'src/auth/context/jwt';

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<AuthProvider>
			<AuthConsumer>
				<AuthGuard>
					{children}
				</AuthGuard>
			</AuthConsumer>
		</AuthProvider>
	);
}
