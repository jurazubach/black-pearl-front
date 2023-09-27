'use client';

import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import { EPaymentType, EPostType } from 'src/sections/checkout/checkout-view';
import CheckoutCardProduct from 'src/components/card-product/checkout';
import ProductPrices from 'src/components/product-prices';
import ContainerTitle from 'src/components/container-title';
import MainLayout from 'src/layouts/main';
import Iconify from 'src/components/iconify';

const StyledTextField: any = styled(TextField)({
	'& .MuiInputBase-input': {
		fontWeight: 'bold',
		fontSize: '14px',
	},
});

const TrackingView = () => {
	const theme = useTheme();
	const [orderId, setOrderId] = useState<string | null>(null);

	const products = [
		{
			productId: 1,
			imageSrc: 'https://media.zoho.in.ua/a5915417-f840-4386-95bf-dbf22da20a95?v=1687116191918',
			title: 'Спортивний костюм BLACK PEARL з тринитки молочний жіночий',
			size: 'S',
			price: 1400,
			oldPrice: 1800,
			quantity: 1,
		},
		{
			productId: 4,
			imageSrc: 'https://media.zoho.in.ua/a5915417-f840-4386-95bf-dbf22da20a95?v=1687116191918',
			title: 'Спортивний костюм BLACK PEARL з тринитки молочний жіночий',
			size: 'M',
			price: 1200,
			oldPrice: 1600,
			quantity: 4,
		},
	];
	const order = {
		firstName: 'Jura',
		lastName: 'Zubach',
		email: 'jurazubach@gmail.com',
		phone: '+380997305113',
		deliveryType: 'nova_poshta',
		city: 'Суми',
		region: 'Сумський',
		address: 'Ломоносова 50/2',
		number: '155',
		postType: EPostType.NOVA_POSHTA,
		paymentType: EPaymentType.CASH,
	};

	const onCheckClick = useCallback(() => setOrderId('dadwda'), []);

	return (
		<MainLayout>
			<ContainerTitle center maxWidth='lg' title='Відстеження замовлення' />

			<Box sx={{
				p: orderId ? theme.spacing(3) : theme.spacing(12),
				transition: 'all .1s ease-in',
				width: '100%',
				display: 'flex',
				justifyContent: 'center',
				borderBottom: orderId ? `1px solid ${theme.palette.divider}` : 'none',
			}}>
				<Stack
					spacing={{ xs: 1, sm: 0 }}
					sx={{
						width: '100%',
						maxWidth: '540px',
						flexDirection: { xs: 'column', sm: 'row' },
					}}
				>
					<TextField fullWidth placeholder='Номер замовлення' />
					<Button
						onClick={onCheckClick}
						sx={{ minWidth: { xs: '100%', sm: '170px' } }}
						variant='contained'
					>
						Перевірити статус
					</Button>
				</Stack>
			</Box>

			{orderId && (
				<Container maxWidth='lg' disableGutters>
					<Grid container>
						<Grid item xs={12} md={8} sx={{ p: 3 }}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<Typography variant='h3'>Замовлення: #41241241</Typography>
								</Grid>
								<Grid item xs={12}>
									<Alert icon={<Iconify icon="mdi:progress-clock" />} variant='outlined' severity="info">Замовлення в обробці</Alert>
									<Alert icon={<Iconify icon="mdi:truck-delivery" />} variant='outlined' severity="warning">Замовлення вже в дорозі</Alert>
									<Alert icon={<Iconify icon="mdi:check-circle-outline" />} variant='outlined' severity="success">Замовлення виконано</Alert>
									<Alert icon={<Iconify icon="mdi:bookmark-remove" />} variant='outlined' severity="error">Замовлення скасовано</Alert>
								</Grid>
								<Grid item xs={12}>
									<Typography variant='h6'>Персональні данні</Typography>
								</Grid>
								<Grid item xs={12} md={6}>
									<StyledTextField disabled fullWidth name='firstName' variant='outlined' label='Ім`я' type='text'
									                 value={order.firstName} />
								</Grid>
								<Grid item xs={12} md={6}>
									<StyledTextField disabled fullWidth name='lastName' variant='outlined' label='Прізвище' type='text'
									                 value={order.lastName} />
								</Grid>

								<Grid item xs={12} md={6}>
									<StyledTextField disabled fullWidth name='email' variant='outlined' label='Email' type='text'
									                 value={order.email} />
								</Grid>

								<Grid item xs={12} md={6}>
									<StyledTextField disabled fullWidth name='phone' variant='outlined' label='Мобільний телефон'
									                 type='text' value={order.phone} />
								</Grid>

								<Grid item xs={12}>
									<Typography variant='h6'>Доставка</Typography>
								</Grid>
								<Grid item xs={12}>
									<FormControl>
										<RadioGroup defaultValue={EPostType.NOVA_POSHTA} value={order.postType}>
											<FormControlLabel disabled value={EPostType.NOVA_POSHTA} control={<Radio />} label='Нова пошта' />
											<FormControlLabel disabled value={EPostType.UKR_POSHTA} control={<Radio />} label='Укр пошта' />
										</RadioGroup>
									</FormControl>
								</Grid>
								<Grid item xs={12} md={6}>
									<StyledTextField disabled fullWidth name='region' variant='outlined' label='Область' type='text'
									                 value={order.region} />
								</Grid>
								<Grid item xs={12} md={6}>
									<StyledTextField disabled fullWidth name='city' variant='outlined' label='Місто' type='text'
									                 value={order.city} />
								</Grid>
								<Grid item xs={12}>
									<StyledTextField disabled fullWidth name='postAddress' variant='outlined'
									                 label='Адреса та номер відділення' type='text' value={order.address} />
								</Grid>

								<Grid item xs={12}>
									<Typography variant='h6'>Оплата</Typography>
								</Grid>
								<Grid item xs={12}>
									<FormControl>
										<RadioGroup defaultValue={EPaymentType.CASH} value={order.paymentType}>
											<FormControlLabel disabled value={EPaymentType.CASH} control={<Radio />}
											                  label='Оплата під час отримання товару' />
											<FormControlLabel disabled value={EPaymentType.CARD} control={<Radio />}
											                  label='Переказ на карту' />
										</RadioGroup>
									</FormControl>
								</Grid>
							</Grid>
						</Grid>

						<Grid
							item
							xs={12}
							md={4}
							sx={{
								borderLeft: { xs: 'none', md: `1px solid ${theme.palette.divider}` },
								borderTop: { xs: `2px solid ${theme.palette.divider}`, md: `none` },
							}}
						>
							<Grid item xs={12} sx={{ pt: 3, pl: 3 }}>
								<Typography variant='h6'>Список товарів</Typography>
							</Grid>

							<Stack spacing={1}>
								{products.map((product) => (
									<CheckoutCardProduct key={product.productId} product={product} readOnly />
								))}
							</Stack>

							<Divider />

							<Box sx={{ p: 2 }}>
								<Alert sx={{ borderRadius: 0 }} variant='outlined' severity='success'>
									<Stack direction='row' spacing={1}>
										<Typography>Додаткова знижка:</Typography>
										<Typography sx={{ fontWeight: 'bold' }}>500грн.</Typography>
									</Stack>
								</Alert>
							</Box>

							<Divider />

							<Box display='flex' justifyContent='space-between' p={2}>
								<Typography variant='subtitle1'>Всього:</Typography>
								<ProductPrices
									size='small'
									oldPrice={23121}
									price={24211}
								/>
							</Box>
						</Grid>
					</Grid>
				</Container>
			)}
		</MainLayout>
	);
};

export default TrackingView;
