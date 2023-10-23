import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NextLink from 'next/link';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { styled, useTheme } from '@mui/material/styles';
import { PATH_PAGE } from 'src/routes/paths';
import { _socials } from 'src/_mock';
import Iconify from 'src/components/iconify';
import { CatalogTitles, ECatalogSection, TCatalogSection } from 'src/types/catalog';

const NAVIGATION_LINKS = [
	{ name: 'Головна', href: PATH_PAGE.home },
	{ name: 'Блог', href: PATH_PAGE.blog },
	{ name: 'Доставка і оплата', href: PATH_PAGE.delivery },
	{ name: 'Обмін і повернення', href: PATH_PAGE.returnOfGoods },
	{ name: 'Угода користувача', href: PATH_PAGE.terms },
	{ name: 'Контакти', href: PATH_PAGE.contacts },
	{ name: 'Про нас', href: PATH_PAGE.about },
];

export const StyledLink: any = styled(Link)(({ theme }) => ({
	color: theme.palette.grey[500],
	transition: 'all .1s ease-in',
	'&:hover': {
		color: theme.palette.grey[100],
		textDecoration: 'none',
	}
}));

export default function Footer() {
	const theme = useTheme();
	const navigationItems = useMemo(() => NAVIGATION_LINKS.map((link) => (
			<StyledLink key={link.name} component={NextLink} href={link.href} variant='subtitle2'>
				{link.name}
			</StyledLink>
		)), []);

	const catalogItems = useMemo(() => Object.values(ECatalogSection).map((catalogSection) => {
			const title = CatalogTitles[catalogSection as TCatalogSection];

			return (
				<StyledLink key={catalogSection} component={NextLink} href={`/catalog/${catalogSection}`} variant='subtitle2'>
					{title}
				</StyledLink>
			);
		}), []);

	return (
		<Box component='footer' sx={{
			backgroundColor: 'background.default',
			borderTop: `1px solid ${theme.palette.divider}`,
		}}>
			<Container maxWidth='md' sx={{ py: 3 }}>
				<Grid
					container
					direction="row"
					justifyContent={{ xs: 'center', md: 'space-between' }}
					sx={{ textAlign: { xs: 'center', md: 'left' } }}
					spacing={3}
				>
					<Grid item xs={12} sm={6} md={4}>
						<Stack
							spacing={2}
							alignItems={{ xs: 'center', md: 'flex-start' }}
						>
							<Typography variant='subtitle1'>
								Навігація
							</Typography>

							{navigationItems}
						</Stack>
					</Grid>

					<Grid item xs={12} sm={6} md={4}>
						<Stack
							spacing={2}
							alignItems={{ xs: 'center', md: 'flex-start' }}
						>
							<Typography variant='subtitle1'>
								Категорії
							</Typography>

							{catalogItems}
						</Stack>
					</Grid>

					<Grid item xs={12} md={4}>
						<Stack spacing={3} alignItems={{ xs: 'center', md: 'flex-start' }}>
							<Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start', width: '100%', maxWidth: '460px' }}>
								<Typography variant='subtitle1'>
									Підпишіться на розсилку
								</Typography>

								<Typography variant='caption' color='grey.300'>
									Введіть адресу електронної пошти, щоб <Typography variant='caption' sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>отримати знижку 10%</Typography> на перше замовлення. Інформацію про
									розпродажі та пропозиції.
								</Typography>

								<Stack direction='row' sx={{ width: '100%' }}>
									<TextField fullWidth placeholder='Введіть ваш e-mail' />
									<Button sx={{ minWidth: '120px', width: '120px' }} variant='contained'>
										Підписатись
									</Button>
								</Stack>
							</Stack>

							<Stack spacing={2}>
								<Typography variant='subtitle1'>Ми в соціальних мережах</Typography>

								<Stack spacing={1} direction='row' justifyContent={{ xs: 'center', md: 'flex-start' }}>
									{_socials.map((social) => (
										<IconButton key={social.name} color='primary'>
											<Iconify icon={social.icon} />
										</IconButton>
									))}
								</Stack>
							</Stack>
						</Stack>
					</Grid>
				</Grid>
			</Container>

			<Box sx={{ m: 0, p: theme.spacing(1), textAlign: 'center', background: theme.palette.grey[800] }}>
				<Typography variant='caption'>
					© 2023. NVRMORE. Всі права захищені.
				</Typography>
			</Box>
		</Box>
	);
}
