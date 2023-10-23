'use client';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import React, { useCallback, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { useParams } from 'next/navigation';
import _get from 'lodash/get';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import { CatalogTitles, ECatalogSection, TCatalogSection } from 'src/types/catalog';
import useCheckout from 'src/hooks/use-checkout';
import { calculateTotalProductsInCheckout } from 'src/utils/checkout';
import { paper } from 'src/theme/css';
import { _socials } from 'src/_mock';
import { PATH_PAGE } from 'src/routes/paths';
import { Searchbar } from '../_common';
import CategoryLinks from './category-links';
import { RouterLink } from '../../routes/components';

const MainLogoWrapper: any = styled(Image)({
	maxWidth: '220px',
	opacity: 0.7,
	transition: 'all 0.2s ease-in',
	'&:hover': {
		opacity: 1,
	},
});

const StyledDrawerMenu: any = styled(Link)(({ theme }) => ({
	cursor: 'pointer',
	color: theme.palette.grey[300],
	...theme.typography.subtitle2,
	userSelect: 'none',
	textDecoration: 'none',
}));

const StyledIconBox: any = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
	transition: theme.transitions.create('color', {
		duration: theme.transitions.duration.standard,
	}),
	textDecoration: 'none',
	'& svg.iconify, .MuiTypography-root': {
		color: theme.palette.grey[300],
	},
	'&:hover': {
		'& svg.iconify, .MuiTypography-root': {
			color: theme.palette.grey[100],
		},
	},
}));

const NAVIGATION_LINKS = [
	{ name: 'Головна', href: PATH_PAGE.home },
	{ name: 'Доставка і оплата', href: PATH_PAGE.delivery },
	{ name: 'Обмін і повернення', href: PATH_PAGE.returnOfGoods },
	{ name: 'Угода користувача', href: PATH_PAGE.terms },
	{ name: 'Контакти', href: PATH_PAGE.contacts },
	{ name: 'Про нас', href: PATH_PAGE.about },
];

export default function HeaderMobile() {
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const openMenuToggle = useCallback(() => {
		setOpenMenu((prevState) => !prevState);
	}, [setOpenMenu]);

	const theme = useTheme();
	const query = useParams();

	const matchCatalogSection: string | undefined = _get(query, 'pageFilters', [])[0];
	const { checkoutProducts, openToggle } = useCheckout();
	const countProductsInCheckout = calculateTotalProductsInCheckout(checkoutProducts);

	const drawerMenuItems = useMemo(() => {
		const navigationLinks = NAVIGATION_LINKS.map((link) => (
			<StyledDrawerMenu key={link.href} component={NextLink} href={link.href}>
				{link.name}
			</StyledDrawerMenu>
		));

		const categoryLinks: React.ReactNode[] = [];
		Object.values(ECatalogSection).forEach((catalogSection) => {
			const title = CatalogTitles[catalogSection as TCatalogSection];

			const styleOptions = {};
			if (matchCatalogSection === catalogSection) {
				Object.assign(styleOptions, { color: theme.palette.grey[100] });
			}

			const href = `/catalog/${catalogSection}`;
			categoryLinks.push(
				<StyledDrawerMenu key={href} sx={styleOptions} component={NextLink} href={href}>{title}</StyledDrawerMenu>,
			);
		});

		return { navigationLinks, categoryLinks };
	}, [matchCatalogSection, theme]);

	return (
		<AppBar sx={{ display: { xs: 'block', md: 'none' } }}>
			<Toolbar
				disableGutters
				sx={{
					zIndex: theme.zIndex.appBar,
					backgroundColor: theme.palette.background.default,
					padding: '0 !important',
					height: '106px',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box
					sx={{
						width: '100%',
						height: '72px',
						display: 'flex',
						paddingLeft: { xs: 1, sm: 2 },
						paddingRight: { xs: 2, sm: 3 },
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Stack direction='row'>
						<StyledIconBox onClick={openMenuToggle}>
							<IconButton>
								<Iconify icon='solar:hamburger-menu-broken' width={24} />
							</IconButton>
						</StyledIconBox>

						<NextLink href='/'>
							<MainLogoWrapper disabledEffect alt='hero' src='/assets/images/header/logo-color.png' />
						</NextLink>
					</Stack>

					<Stack direction='row' alignItems='center' justifyContent='flex-end' spacing={{ xs: 0, sm: 2 }}>
						<Searchbar />

						<StyledIconBox
							component={RouterLink} href={PATH_PAGE.tracking}
							sx={{ display: { xs: 'none', sm: 'block' } }}
						>
							<Box sx={{ p: 1, pb: 0 }}>
								<Iconify icon='solar:delivery-linear' width={24} />
							</Box>
							<Typography variant='caption'>Статус</Typography>
						</StyledIconBox>

						<StyledIconBox onClick={openToggle}>
							<IconButton disableRipple>
								<Badge badgeContent={countProductsInCheckout} color='error'>
									<Iconify icon='solar:cart-large-minimalistic-outline' width={24} />
								</Badge>
							</IconButton>

							<Typography sx={{ display: { xs: 'none', sm: 'block' } }} variant='caption'>Кошик</Typography>
						</StyledIconBox>
					</Stack>
				</Box>

				<CategoryLinks />

				<Drawer
					anchor='left'
					open={openMenu}
					onClose={openMenuToggle}
					sx={{
						[`& .${drawerClasses.paper}`]: {
							...paper({ theme, bgcolor: theme.palette.background.default }),
							width: { xs: '100%', sm: '540px' },
						},
					}}
				>
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
				</Drawer>
			</Toolbar>
		</AppBar>
	);
}
