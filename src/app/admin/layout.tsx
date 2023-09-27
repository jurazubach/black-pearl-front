'use client';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';
import { AuthConsumer, AuthProvider } from 'src/auth/context/jwt';

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Props) {
	return (
		<AuthProvider>
			<AuthConsumer>
				<AuthGuard>
					<DashboardLayout>{children}</DashboardLayout>
				</AuthGuard>
			</AuthConsumer>
		</AuthProvider>
	);
}
