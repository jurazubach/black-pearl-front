'use client';

import React from 'react';
import { usePathname } from 'src/routes/hooks';
import DashboardLayout from './dashboard';
import AuthLayout from './auth/classic';
import MainLayout from './main/layout';

type Props = {
	children: React.ReactNode;
};

export default ({ children }: Props) => {
	const pathname = usePathname();

	const isAdmin = String(pathname).includes('/admin');
	const isAuth = String(pathname).includes('/auth');

	if (isAdmin) {
		return <DashboardLayout>{children}</DashboardLayout>
	}

	if (isAuth) {
		return <AuthLayout>{children}</AuthLayout>
	}

	return (
		<MainLayout>
			{children}
		</MainLayout>
	);
}