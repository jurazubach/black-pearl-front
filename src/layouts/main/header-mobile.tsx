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
import Carousel, { useCarousel } from 'src/components/carousel';
import { Searchbar } from '../_common';

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
	color: theme.palette.grey[500],
	...theme.typography.subtitle2,
	userSelect: 'none',
	textDecoration: 'none',
}));

const StyledHeaderMenu: any = styled(Link)(({ theme }) => ({
	margin: theme.spacing(0, 1),
	height: '42px',
	cursor: 'pointer',
	color: theme.palette.grey[500],
	textAlign: 'center',
	lineHeight: '36px',
	fontSize: '18px',
	fontWeight: 'bold',
	userSelect: 'none',
	textDecoration: 'none',
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

	const [activeHeaderItemNumber, headerItemsMemo] = useMemo(() => {
		let activeHeaderItem = 0;
		const headerItems: any[] = [];

		Object.values(ECatalogSection).forEach((catalogSection, idx) => {
			const title = CatalogTitles[catalogSection as TCatalogSection];

			const styleOptions = {};
			if (matchCatalogSection === catalogSection) {
				Object.assign(styleOptions, {
					color: theme.palette.grey[100],
					borderBottom: `3px solid ${theme.palette.grey[100]}`,
				});
			}

			if (catalogSection === ECatalogSection.SALE) {
				Object.assign(styleOptions, {
					color: 'error.main',
				});

				if (matchCatalogSection === catalogSection) {
					Object.assign(styleOptions, {
						borderBottom: `3px solid ${theme.palette.error.main}`,
					});
				}
			}

			if (matchCatalogSection === catalogSection) {
				activeHeaderItem = idx;
			}

			const href = `/catalog/${catalogSection}`;
			headerItems.push(
				<StyledHeaderMenu key={href} sx={styleOptions} component={NextLink} href={href}>{title}</StyledHeaderMenu>
			);
		});

		return [activeHeaderItem, headerItems];
	}, [matchCatalogSection, theme.palette.error.main, theme.palette.grey]);

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

			if (catalogSection === ECatalogSection.SALE) {
				Object.assign(styleOptions, { color: 'error.main' });

				if (matchCatalogSection === catalogSection) {
					Object.assign(styleOptions, { color: 'error.main' });
				}
			}

			const href = `/catalog/${catalogSection}`;
			categoryLinks.push(
				<StyledDrawerMenu key={href} sx={styleOptions} component={NextLink} href={href}>{title}</StyledDrawerMenu>
			);
		});

		return { navigationLinks, categoryLinks };
	}, [matchCatalogSection, theme.palette.grey]);

	const carousel = useCarousel({
		speed: 500,
		infinite: true,
		variableWidth: true,
		centerPadding: theme.spacing(0),
		swipe: true,
		swipeToSlide: true,
		initialSlide: activeHeaderItemNumber,
	});

	return (
		<AppBar sx={{ display: { xs: 'block', sm: 'none' } }}>
			<Toolbar
				disableGutters
				sx={{
					zIndex: theme.zIndex.appBar,
					backgroundColor: theme.palette.background.default,
					padding: '0 !important',
					height: '114px',
					display: 'flex',
					flexDirection: 'column',
					borderBottom: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Box
					sx={{
						width: '100%',
						height: '72px',
						display: 'flex',
						p: theme.spacing(0, 1),
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<NextLink href='/'>
						<MainLogoWrapper disabledEffect alt='hero' src='/assets/images/header/logo-color.png' />
					</NextLink>

					<Stack direction='row' alignItems='center' justifyContent='flex-end'>
						<Searchbar iconSize='medium' />

						<IconButton onClick={openToggle}>
							<Badge badgeContent={countProductsInCheckout} color='error'>
								<Iconify icon='mdi:cart-variant' />
							</Badge>
						</IconButton>

						<IconButton onClick={openMenuToggle}>
							<Iconify icon='mdi:menu' width={24} />
						</IconButton>
					</Stack>
				</Box>

				<Box sx={{
					backgroundColor: theme.palette.grey[900],
					height: '42px',
					width: '100vw',
					borderTop: `1px solid ${theme.palette.divider}`,
				}}>
					<Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
						{headerItemsMemo}
					</Carousel>
				</Box>

				<Drawer
					anchor='right'
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


					<Stack direction="row" alignItems="center" spacing={2} sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
						<Iconify color="grey" icon='mdi:phone' />
						<StyledDrawerMenu href='tel:+380997305113' target="_blank" sx={{ textDecoration: 'underline' }}>+380997305113</StyledDrawerMenu>
					</Stack>

					<Stack sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
						<Typography variant="subtitle1">Ми в соціальних мережах</Typography>

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
