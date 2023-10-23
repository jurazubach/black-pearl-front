'use client';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import React, { useMemo } from 'react';
import NextLink from 'next/link';
import { useParams } from 'next/navigation';
import _get from 'lodash/get';
import Badge from '@mui/material/Badge';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';
import { CatalogTitles, ECatalogSection, TCatalogSection } from 'src/types/catalog';
import useCheckout from 'src/hooks/use-checkout';
import { calculateTotalProductsInCheckout } from 'src/utils/checkout';
import { RouterLink } from 'src/routes/components';
import { PATH_PAGE } from 'src/routes/paths';
import { Searchbar } from '../_common';

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

const StyledMenu: any = styled(Link)(({ theme }) => ({
	cursor: 'pointer',
	padding: '0 12px',
	color: theme.palette.grey[300],
	height: '28px',
	userSelect: 'none',
	transition: 'all 0.2s ease-in',
	paddingBottom: '4px',
	borderBottom: `2px solid ${theme.palette.background.default}`,
	'&:hover': {
		borderBottom: `3px solid ${theme.palette.primary.main}`,
		color: theme.palette.grey[100],
		textDecoration: 'none',
	},
}));

export default function Header() {
	const theme = useTheme();
	const query = useParams();

	const matchCatalogSection: string | undefined = _get(query, 'pageFilters', [])[0];
	const { checkoutProducts, openToggle } = useCheckout();
	const countProductsInCheckout = calculateTotalProductsInCheckout(checkoutProducts);

	const renderLinksMemo = useMemo(() => Object.values(ECatalogSection).map((catalogSection) => {
		const title = CatalogTitles[catalogSection as TCatalogSection];

		const styleOptions = {};
		if (!!matchCatalogSection && matchCatalogSection === catalogSection) {
			Object.assign(styleOptions, {
				borderBottom: `2px solid ${theme.palette.primary.main}`,
				color: theme.palette.grey[100],
			});
		}

		const href = `/catalog/${catalogSection}`;

		return (
			<StyledMenu key={href} sx={styleOptions} component={NextLink} href={href}>{title}</StyledMenu>
		);
	}), [matchCatalogSection, theme]);

	return (
		<AppBar sx={{ display: { xs: 'none', md: 'block' } }}>
			<Toolbar
				disableGutters
				sx={{
					zIndex: theme.zIndex.appBar,
					position: 'relative',
					backgroundColor: theme.palette.background.default,
					padding: '0 !important',
					height: '117px',
					display: 'flex',
					flexDirection: 'column',
					borderBottom: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Container maxWidth='lg'>
					<Box
						sx={{
							width: '100%',
							height: '80px',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Stack direction='row' alignItems='center' spacing={2} sx={{ width: '250px' }}>
							<StyledLinkBox href='https://t.me/JuraZubach' target='_blank'>
								<Box sx={{ p: 1, pb: 0 }}>
									<Iconify icon='solar:map-arrow-square-outline' width={24} />
								</Box>
								<Typography variant='caption'>Telegram</Typography>
							</StyledLinkBox>

							<StyledLinkBox href='tel:+380997305113' target='_blank'>
								<Box sx={{ p: 1, pb: 0 }}>
									<Iconify icon='solar:phone-calling-outline' width={24} />
								</Box>
								<Typography variant='caption'>Call</Typography>
							</StyledLinkBox>

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
						</Stack>

						<NextLink href='/'>
							<ImageLogoWrapper disabledEffect alt='logo' src='/assets/images/header/logo-color.png' />
						</NextLink>

						<Stack direction='row' alignItems='center' justifyContent='flex-end' spacing={2} sx={{ width: '250px' }}>
							<Searchbar />

							<StyledLinkBox component={RouterLink} href={PATH_PAGE.tracking}>
								<Box sx={{ p: 1, pb: 0 }}>
									<Iconify icon='solar:delivery-linear' width={24} />
								</Box>
								<Typography variant='caption'>Статус</Typography>
							</StyledLinkBox>

							<StyledIconBox onClick={openToggle}>
								<IconButton disableRipple>
									<Badge badgeContent={countProductsInCheckout} color='error'>
										<Iconify icon='solar:cart-large-minimalistic-outline' width={24} />
									</Badge>
								</IconButton>

								<Typography variant='caption'>Кошик</Typography>
							</StyledIconBox>
						</Stack>
					</Box>
				</Container>

				<Stack direction='row' spacing={1} sx={{
					height: '36px',
					width: '100vw',
					borderTop: `1px solid ${theme.palette.divider}`,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
					{renderLinksMemo}
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
