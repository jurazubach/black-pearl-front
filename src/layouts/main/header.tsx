'use client';

import { styled, useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import React, { useCallback, useState } from 'react';
import NextLink from 'next/link';
import Badge from '@mui/material/Badge';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import useCheckout from 'src/hooks/use-checkout';
import { calculateTotalProductsInCheckout } from 'src/utils/checkout';
import { RouterLink } from 'src/routes/components';
import { PATH_PAGE } from 'src/routes/paths';
import { IMenuItem } from 'src/types/main';
import { Searchbar } from '../_common';
import { paper } from '../../theme/css';
import MenuDrawer from './menu-drawer';
import { MotionContainer, varFade } from '../../components/animate';
import { m } from 'framer-motion';

const StyledLinkBox: any = styled(Link)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
	height: '58px',
	textDecoration: 'none !important',
	'& svg.iconify, .MuiTypography-root': {
		transition: theme.transitions.create('color', {
			duration: theme.transitions.duration.standard,
		}),
		color: theme.palette.grey[300],
	},
	'&:hover': {
		'& svg.iconify, .MuiTypography-root': {
			color: theme.palette.grey[100],
		},
	},
}));

const StyledIconBox: any = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	cursor: 'pointer',
	textDecoration: 'none',
	transition: theme.transitions.create('color', {
		duration: theme.transitions.duration.standard,
	}),
	'& svg.iconify, .MuiTypography-root': {
		color: theme.palette.grey[300],
	},
	'&:hover': {
		'& svg.iconify, .MuiTypography-root': {
			color: theme.palette.grey[100],
		},
	},
}));

const ImageLogoWrapper: any = styled(Image)({
	maxWidth: '320px',
	opacity: 0.8,
	transition: 'all 0.2s ease-in',
	'&:hover': {
		opacity: 1,
	},
});

const StyledTabs: any = styled(Tabs)(({ theme }) => ({
	minHeight: '28px',
	'& .MuiTab-root': {
		overflow: 'visible',
		position: 'relative',
		color: theme.palette.grey[400],
		minHeight: '28px',
		minWidth: 'unset',
		transition: 'all 0.2s ease-in',
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		'&:not(:last-of-type)': {
			'&:after': {
				cursor: 'default',
				position: 'absolute',
				top: '12px',
				right: `-15px`,
				content: '""',
				width: '6px',
				height: '6px',
				borderRadius: '50%',
				backgroundColor: theme.palette.primary.main,
			},

			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				marginRight: theme.spacing(3),
			},
		},
		'&:hover': {
			color: theme.palette.grey[100],
		},
		'&.Mui-selected': {
			color: theme.palette.grey[50],
		},
	},
	'& .MuiTabs-indicator': {
		backgroundColor: theme.palette.primary.main,
	},
}));

const MainLogoWrapper: any = styled(Image)({
	maxWidth: '220px',
	opacity: 0.7,
	transition: 'all 0.2s ease-in',
	'&:hover': {
		opacity: 1,
	},
});

interface Props {
	menuItems: IMenuItem[];
	activeMenuIdx: number | null;
}

const variantsContainer = {
	hidden: varFade().in.initial,
	show: { ...varFade().in.animate, transition: { ...varFade().in.animate.transition, staggerChildren: 0.05 } },
};

const variantsVarFadeInLeft = {
	hidden: varFade().inLeft.initial,
	show: varFade().inLeft.animate
};

const variantsVarFadeInRight = {
	hidden: varFade().inRight.initial,
	show: varFade().inRight.animate
};

export default function Header({ menuItems, activeMenuIdx }: Props) {
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const openMenuToggle = useCallback(() => {
		setOpenMenu((prevState) => !prevState);
	}, [setOpenMenu]);

	const theme = useTheme();

	const { checkoutProducts, openToggle } = useCheckout();
	const countProductsInCheckout = calculateTotalProductsInCheckout(checkoutProducts);

	return (
		<AppBar>
			<Toolbar
				disableGutters
				sx={{
					zIndex: theme.zIndex.appBar,
					position: 'relative',
					backgroundColor: theme.palette.background.default,
					padding: '0 !important',
					height: { xs: '106px', md: '117px' },
					transition: 'all 0.2s ease-in',
					display: 'flex',
					flexDirection: 'column',
					borderBottom: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Container maxWidth='lg' disableGutters>
					<Box
						sx={{
							display: { xs: 'none', md: 'flex' },
							width: '100%',
							height: '80px',
							paddingLeft: 3,
							paddingRight: 3,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<m.div variants={variantsContainer} initial="hidden" animate="show">
							<Stack direction='row' alignItems='center' spacing={2} sx={{ width: '250px' }}>
								<m.div variants={variantsVarFadeInLeft}>
									<StyledLinkBox href='https://t.me/JuraZubach' target='_blank'>
										<Box sx={{ p: 1, pb: 0 }}>
											<Iconify icon='solar:map-arrow-square-outline' width={24} />
										</Box>
										<Typography variant='caption'>Telegram</Typography>
									</StyledLinkBox>
								</m.div>

								<m.div variants={variantsVarFadeInLeft}>
									<StyledLinkBox href='tel:+380997305113' target='_blank'>
										<Box sx={{ p: 1, pb: 0 }}>
											<Iconify icon='solar:phone-calling-outline' width={24} />
										</Box>
										<Typography variant='caption'>Call</Typography>
									</StyledLinkBox>
								</m.div>

								<m.div variants={variantsVarFadeInLeft}>
									<Box sx={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'flex-end',
										alignItems: 'center',
										height: '58px',
									}}>
										<Typography variant='body2'>Графік роботи</Typography>
										<Typography variant='subtitle1' sx={{ paddingTop: 0.5 }}>09:00 - 18:00</Typography>
									</Box>
								</m.div>
							</Stack>
						</m.div>

						<NextLink href='/'>
							<ImageLogoWrapper
								alt='logo'
								src='/assets/logo/text-transparent.png'
								decoding='async'
								loading='lazy'
								effect="opacity"
								sx={{ height: '100%', width: '100%' }}
							/>
						</NextLink>

						<m.div variants={variantsContainer} initial="hidden" animate="show">
							<Stack direction='row' alignItems='center' justifyContent='flex-end' spacing={2} sx={{ width: '250px' }}>
								<m.div variants={variantsVarFadeInRight}>
									<Searchbar />
								</m.div>

								<m.div variants={variantsVarFadeInRight}>
									<StyledLinkBox component={RouterLink} href={PATH_PAGE.tracking}>
										<Box sx={{ p: 1, pb: 0, minHeight: '16px' }}>
											<Iconify icon='solar:delivery-linear' width={24} />
										</Box>
										<Typography variant='caption'>Статус</Typography>
									</StyledLinkBox>
								</m.div>

								<m.div variants={variantsVarFadeInRight}>
									<StyledIconBox onClick={openToggle}>
										<IconButton disableRipple>
											<Badge badgeContent={countProductsInCheckout} color='error'>
												<Iconify icon='solar:cart-large-minimalistic-outline' width={24} />
											</Badge>
										</IconButton>

										<Typography variant='caption'>Кошик</Typography>
									</StyledIconBox>
								</m.div>
							</Stack>
						</m.div>
					</Box>

					<Box
						sx={{
							display: { xs: 'flex', md: 'none' },
							width: '100%',
							height: '72px',
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
								<MainLogoWrapper
									disabledEffect
									alt='logo'
									src='/assets/logo/text-transparent.png'
									decoding='async'
									loading='lazy'
									effect="opacity"
									sx={{ height: '100%', width: '100%' }}
								/>
							</NextLink>
						</Stack>

						<m.div variants={variantsContainer} initial="hidden" animate="show">
							<Stack direction='row' alignItems='center' justifyContent='flex-end' spacing={{ xs: 0, sm: 2 }}>
								<m.div variants={variantsVarFadeInRight}>
									<Searchbar />
								</m.div>

								<m.div variants={variantsVarFadeInRight}>
									<StyledIconBox
										component={RouterLink} href={PATH_PAGE.tracking}
										sx={{ display: { xs: 'none', sm: 'block' } }}
									>
										<Box sx={{ p: 1, pb: 0 }}>
											<Iconify icon='solar:delivery-linear' width={24} />
										</Box>
										<Typography variant='caption'>Статус</Typography>
									</StyledIconBox>
								</m.div>

								<m.div variants={variantsVarFadeInRight}>
									<StyledIconBox onClick={openToggle}>
										<IconButton disableRipple>
											<Badge badgeContent={countProductsInCheckout} color='error'>
												<Iconify icon='solar:cart-large-minimalistic-outline' width={24} />
											</Badge>
										</IconButton>

										<Typography sx={{ display: { xs: 'none', sm: 'block' } }} variant='caption'>Кошик</Typography>
									</StyledIconBox>
								</m.div>
							</Stack>
						</m.div>
					</Box>
				</Container>

				<Stack direction='row' sx={{
					height: '36px',
					width: '100vw',
					px: { xs: 2, sm: 3, md: 0 },
					borderTop: `1px solid ${theme.palette.divider}`,
					justifyContent: { xs: 'flex-start', md: 'center' },
					alignItems: 'center',
				}}>
					<MotionContainer>
						<m.div variants={varFade().in}>
							<StyledTabs
								width={{ xs: '100%', md: 'inherit' }}
								value={activeMenuIdx}
								variant="scrollable"
								scrollButtons={false}
							>
								{[...menuItems, ...menuItems, ...menuItems].map(({ alias, title }) => {
									return <Tab disableRipple component={NextLink} href={`${PATH_PAGE.catalog}/${alias}`} label={title} />
								})}
							</StyledTabs>
						</m.div>
					</MotionContainer>
				</Stack>

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
					<MenuDrawer openMenu={openMenu} openMenuToggle={openMenuToggle} menuItems={menuItems} activeMenuIdx={activeMenuIdx} />
				</Drawer>
			</Toolbar>
		</AppBar>
	);
}
