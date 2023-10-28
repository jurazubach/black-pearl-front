'use client';

import NextLink from 'next/link';
import React, { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Iconify from 'src/components/iconify';
import { IMenuItem } from 'src/types/main';
import { PATH_PAGE } from 'src/routes/paths';
import { _socials } from '../../_mock';

const StyledDrawerMenu: any = styled(Link)(({ theme }) => ({
	cursor: 'pointer',
	color: theme.palette.grey[300],
	...theme.typography.subtitle2,
	userSelect: 'none',
	textDecoration: 'none',
}));

interface IMenuDrawerProps {
	openMenu: boolean;
	openMenuToggle: () => void;
	menuItems: IMenuItem[];
	activeMenuIdx: number | null;
}

const NAVIGATION_LINKS = [
	{ name: 'Головна', href: PATH_PAGE.home },
	{ name: 'Доставка і оплата', href: PATH_PAGE.delivery },
	{ name: 'Обмін і повернення', href: PATH_PAGE.returnOfGoods },
	{ name: 'Угода користувача', href: PATH_PAGE.terms },
	{ name: 'Контакти', href: PATH_PAGE.contacts },
	{ name: 'Про нас', href: PATH_PAGE.about },
];

const MenuDrawer = ({ openMenu, openMenuToggle, menuItems, activeMenuIdx }: IMenuDrawerProps) => {
	const theme = useTheme();

	const drawerMenuItems = useMemo(() => {
		const navigationLinks = NAVIGATION_LINKS.map((link) => (
			<StyledDrawerMenu onClick={openMenuToggle} key={link.href} component={NextLink} href={link.href}>
				{link.name}
			</StyledDrawerMenu>
		));

		const categoryLinks: React.ReactNode[] = [];
		menuItems.forEach(({ alias, title }, idx) => {
			const styleOptions = {};
			if (idx === activeMenuIdx) {
				Object.assign(styleOptions, { color: theme.palette.grey[100] });
			}

			categoryLinks.push(
				<StyledDrawerMenu
					key={alias}
					sx={styleOptions}
					component={NextLink}
					href={`/catalog/${alias}`}
					onClick={openMenuToggle}
				>{title}</StyledDrawerMenu>,
			);
		});

		return { navigationLinks, categoryLinks };
	}, [menuItems, activeMenuIdx, theme, openMenuToggle]);

	if (!openMenu) {
		return null;
	}

	return (
		<Stack>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				sx={{
					p: 2,
					borderBottom: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Typography variant='h4' sx={{ flexGrow: 1 }}>
					Меню
				</Typography>

				<IconButton onClick={openMenuToggle}>
					<Iconify icon='mingcute:close-line' />
				</IconButton>
			</Stack>

			<Stack sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
				<Typography variant='subtitle1'>Навігація</Typography>
				{drawerMenuItems.navigationLinks}
			</Stack>

			<Stack sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
				<Typography variant='subtitle1'>Категорії</Typography>

				{drawerMenuItems.categoryLinks}
			</Stack>

			<Stack direction='row' alignItems='center' spacing={2}
			       sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
				<Iconify color='grey' icon='mdi:phone' />
				<StyledDrawerMenu href='tel:+380997305113' target='_blank'
				                  sx={{ textDecoration: 'underline' }}>+380997305113</StyledDrawerMenu>
			</Stack>

			<Stack sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
				<Typography variant='subtitle1'>Ми в соціальних мережах</Typography>

				<Stack spacing={1} direction='row' justifyContent='flex-start' sx={{ mt: 2 }}>
					{_socials.map((social) => (
						<IconButton key={social.name}>
							<Iconify icon={social.icon} />
						</IconButton>
					))}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default MenuDrawer;
