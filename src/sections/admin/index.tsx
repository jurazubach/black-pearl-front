'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PATH_PAGE } from 'src/routes/paths';

export default function HomeView() {
	const pathname = usePathname();
	const { replace } = useRouter();

	useEffect(() => {
		replace(PATH_PAGE.admin.dashboard);
	}, [pathname, replace]);

	return null;
}
