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

const StyledTopHeaderWrapper: any = styled(Box)(({ theme }) => ({
	width: '100%',
	height: theme.spacing(3),
	borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTopHeaderBox: any = styled(Box)(({ theme }) => ({
	width: '100%',
	height: theme.spacing(3),
	cursor: 'pointer',
	transition: 'all 0.2s ease-in',
	borderBottom: `1px solid ${theme.palette.divider}`,
	'&:hover': {
		transition: 'all 0.2s ease-in',
		'& .MuiTypography-root': {
			transition: 'all 0.2s ease-in',
			color: theme.palette.grey[100],
		},
		backgroundColor: theme.palette.grey[800],
		borderBottom: `1px solid ${theme.palette.divider}`,
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
	...theme.typography.body2,
	color: theme.palette.grey[500],
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
		<AppBar sx={{ display: { xs: 'none', sm: 'block' } }}>
			<Toolbar
				disableGutters
				sx={{
					zIndex: theme.zIndex.appBar,
					position: 'relative',
					backgroundColor: theme.palette.background.default,
					padding: '0 !important',
					height: '141px',
					display: 'flex',
					flexDirection: 'column',
					borderBottom: `1px solid ${theme.palette.divider}`,
				}}
			>
				<StyledTopHeaderWrapper>
					<Container maxWidth='lg'>
						<Stack direction="row" justifyContent='space-between'>
							<StyledTopHeaderBox>
								<Link component={RouterLink} href={PATH_PAGE.delivery}>
									<Typography color='grey.300' variant='subtitle1' textAlign='center'>Безкоштовна доставка</Typography>
								</Link>
							</StyledTopHeaderBox>
							<StyledTopHeaderBox>
								<Link component={RouterLink} href={PATH_PAGE.tracking}>
									<Typography color='grey.300' variant='subtitle1' textAlign='center'>Відстежити замовлення</Typography>
								</Link>
							</StyledTopHeaderBox>
							<StyledTopHeaderBox>
								<Link component={RouterLink} href={PATH_PAGE.contacts}>
									<Typography color='grey.300' variant='subtitle1' textAlign='center'>Графік роботи</Typography>
								</Link>
							</StyledTopHeaderBox>
						</Stack>
					</Container>
				</StyledTopHeaderWrapper>

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
						<Stack direction="row" spacing={1}>
							<Iconify icon='mdi:cellphone' width={24} sx={{ color: theme.palette.grey[300] }} />
							<Link href='tel:+380997305113' target="_blank" sx={{ ...theme.typography.subtitle1, width: '185px', color: theme.palette.grey[300] }}>
								+38(099)73-05-113
							</Link>
						</Stack>

						<NextLink href='/'>
							<ImageLogoWrapper disabledEffect alt='logo' src='/assets/images/header/logo-color.png' />
						</NextLink>

						<Stack direction='row' alignItems='center' justifyContent='flex-end' spacing={1} sx={{ width: '185px' }}>
							<Searchbar iconSize='large' />

							<IconButton onClick={openToggle} size='large'>
								<Badge badgeContent={countProductsInCheckout} color='error'>
									<Iconify icon='mdi:cart-variant' width={24} />
								</Badge>
							</IconButton>
						</Stack>
					</Box>
				</Container>

				<Stack direction='row' spacing={1} sx={{
					height: '42px',
					width: '100vw',
					borderTop: `1px solid ${theme.palette.divider}`,
					borderBottom: `1px solid ${theme.palette.divider}`,
					justifyContent: 'center',
					alignItems: 'center',
				}}>
					{renderLinksMemo}
				</Stack>
			</Toolbar>
		</AppBar>
	);
}
