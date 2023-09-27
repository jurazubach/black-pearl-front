'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import dayjs from 'dayjs';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import MainLayout from 'src/layouts/main';
import { calculateTotalPrices } from 'src/utils/checkout';
import useFormCoupon from 'src/hooks/use-form-coupon';
import useCheckout from 'src/hooks/use-checkout';
import ContainerTitle from 'src/components/container-title';
import ProductPrices from 'src/components/product-prices';
import CheckoutCardProduct from 'src/components/card-product/checkout';

const StyledRHFTextField: any = styled(RHFTextField)({
	'& .MuiInputBase-input': {
		fontWeight: 'bold',
		fontSize: '14px',
	},
});

const StyledTextField: any = styled(TextField)({
	'& .MuiInputBase-input': {
		fontWeight: 'bold',
		fontSize: '14px',
	},
});

export enum EPostType {
	NOVA_POSHTA = 'novaPoshta',
	UKR_POSHTA = 'ukrPoshta',
}

export enum EPaymentType {
	CASH = 'cash',
	CARD = 'card',
}

const CheckoutView = () => {
	const theme = useTheme();
	const [isSubmitting, setSubmitting] = useState<boolean>(false);
	const { checkoutProducts } = useCheckout();
	const router = useRouter();
	const formCoupon = useFormCoupon();

	useEffect(() => {
		if (checkoutProducts.length === 0) {
			router.replace('/');
		}
	}, [checkoutProducts, router]);

	const [totalOldPrice, totalPrice, discount] = formCoupon.coupon
		? calculateTotalPrices(checkoutProducts, formCoupon.coupon)
		: calculateTotalPrices(checkoutProducts);

	const FormSchema = Yup.object().shape({
		accept: Yup.boolean().required('Це поле є обовʼязковим'),
		firstName: Yup.string().required('Імʼя є обовʼязковим'),
		lastName: Yup.string().required('Прізвище є обовʼязковим'),
		email: Yup.string().required('Email є обовʼязковим'),
		phone: Yup.string().required('Телефон є обовʼязковим'),
		region: Yup.string().required('Регіон є обовʼязковим'),
		city: Yup.string().required('Місто є обовʼязковим'),
		postAddress: Yup.string().required('Адреса пошти є обовʼязковим'),
		postType: Yup.string().required('Тип пошти є обовʼязковим'),
		paymentType: Yup.string().required('Тип оплати є обовʼязковим'),
		promocode: Yup.string(),
		couponCode: Yup.string(),
	});

	const defaultValues = {
		accept: false,
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		region: '',
		city: '',
		postAddress: '',
		couponCode: '',
		postType: EPostType.NOVA_POSHTA,
		paymentType: EPaymentType.CASH,
		promocode: '',
	};

	const methods = useForm({ resolver: yupResolver(FormSchema), defaultValues });
	const { handleSubmit, setValue, watch } = methods;
	const formValues = watch();

	const onPostTypeChange = (_e: any, value: string) => setValue('postType', value as EPostType);
	const onPaymentTypeChange = (_e: any, value: string) => setValue('paymentType', value as EPaymentType);
	const onPromocodeChange = (e: any) => formCoupon.onPromocodeChange(String(e.target.value).trim());

	const onApplyPromocode = async () => {
		formCoupon
			.onCheckCoupon()
			.then((promocode) => {
				setValue('couponCode', promocode as string);
			});
	};

	const onSubmit = async (values: any) => {
		setSubmitting(true);

		const orderProducts = checkoutProducts.map(({ productId, size, price, quantity }) => ({ productId, size, price, quantity }));
		const orderValues = {
			...values,
			orderProducts,
		};

		return console.log('orderValues', orderValues);
	};

	return (
		<MainLayout>
			<ContainerTitle center maxWidth='lg' title='Оформлення замовлення' />

			<Container maxWidth='lg' disableGutters>
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Grid container>
						<Grid item xs={12} md={8} sx={{ p: 3 }}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<Typography variant='h6'>Персональні данні</Typography>
								</Grid>
								<Grid item xs={12} md={6}>
									<StyledRHFTextField fullWidth name='firstName' variant='outlined' label='Ім`я' type='text' />
								</Grid>
								<Grid item xs={12} md={6}>
									<StyledRHFTextField fullWidth name='lastName' variant='outlined' label='Прізвище' type='text' />
								</Grid>

								<Grid item xs={12} md={6}>
									<StyledRHFTextField fullWidth name='email' variant='outlined' label='Email' type='text' />
								</Grid>

								<Grid item xs={12} md={6}>
									<StyledRHFTextField fullWidth name='phone' variant='outlined' label='Мобільний телефон' type='text' />
								</Grid>

								<Grid item xs={12}>
									<Typography variant='h6'>Доставка</Typography>
								</Grid>
								<Grid item xs={12}>
									<FormControl>
										<RadioGroup defaultValue={EPostType.NOVA_POSHTA} value={formValues.postType} onChange={onPostTypeChange}>
											<FormControlLabel value={EPostType.NOVA_POSHTA} control={<Radio />} label='Нова пошта' />
											<FormControlLabel value={EPostType.UKR_POSHTA} control={<Radio />} label='Укр пошта' />
										</RadioGroup>
									</FormControl>
								</Grid>
								<Grid item xs={12} md={6}>
									<StyledRHFTextField fullWidth name='region' variant='outlined' label='Область' type='text' />
								</Grid>
								<Grid item xs={12} md={6}>
									<StyledRHFTextField fullWidth name='city' variant='outlined' label='Місто' type='text' />
								</Grid>
								<Grid item xs={12}>
									<StyledRHFTextField fullWidth name='postAddress' variant='outlined' label='Адреса та номер відділення' type='text' />
								</Grid>

								<Grid item xs={12}>
									<Typography variant='h6'>Оплата</Typography>
								</Grid>
								<Grid item xs={12}>
									<FormControl>
										<RadioGroup defaultValue={EPaymentType.CASH} value={formValues.paymentType} onChange={onPaymentTypeChange}>
											<FormControlLabel value={EPaymentType.CASH} control={<Radio />} label='Оплата під час отримання товару' />
											<FormControlLabel value={EPaymentType.CARD} control={<Radio />} label='Переказ на карту' />
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
								{checkoutProducts.map((checkoutProduct) => (
									<CheckoutCardProduct key={checkoutProduct.productId} product={checkoutProduct} />
								))}
							</Stack>

							<Divider />

							<Box sx={{ p: 2 }}>
								<Stack direction='row'>
									<StyledTextField fullWidth onChange={onPromocodeChange} variant='outlined' label='Промокод' />

									<LoadingButton
										loading={formCoupon.isLoading}
										disabled={formCoupon.promocode.length === 0 || formCoupon.isLoading}
										variant='contained'
										sx={{ width: '205px' }}
										startIcon={<Iconify icon='material-symbols:check-circle' sx={{ color: 'white' }} />}
										onClick={onApplyPromocode}
									>
										Застосувати
									</LoadingButton>
								</Stack>
								{formCoupon.coupon && discount > 0 && (
									<Alert sx={{ mt: 2 }} variant='outlined' severity='success'>
										<Stack direction='row' spacing={1}>
											<Typography>Додаткова знижка:</Typography>
											<Typography sx={{ fontWeight: 'bold' }}>{discount} грн.</Typography>
										</Stack>
										<Stack direction='row' spacing={1}>
											<Typography sx={{ color: 'text.secondary' }} variant='caption'>Дійсний
												до: {dayjs(formCoupon.coupon.endAt).format('YYYY-MM-DD HH:mm:ss')}</Typography>
										</Stack>
									</Alert>
								)}

								{formCoupon.error && (
									<Alert sx={{ mt: 2 }} variant='outlined' severity='error'>
										<Stack direction='row' spacing={1}>
											<Typography>{formCoupon.error}</Typography>
										</Stack>
									</Alert>
								)}
							</Box>

							<Divider />

							<Box display='flex' justifyContent='space-between' p={2}>
								<Typography variant="subtitle1">Всього:</Typography>
								<ProductPrices
									size='small'
									oldPrice={totalOldPrice}
									price={totalPrice}
								/>
							</Box>

							<Divider />

							<Stack sx={{ p: 2 }} spacing={3}>
								<RHFCheckbox name='accept' label='Я даю згоду на передачу та обробку моїх персональних данних' />

								<LoadingButton
									loading={isSubmitting}
									disabled={isSubmitting || checkoutProducts.length === 0}
									type='submit'
									startIcon={<Iconify icon='material-symbols:check-circle' color='inherit' width={24} />}
									fullWidth
									size='large'
									variant='contained'
									disableRipple
								>
									Зробити замовлення
								</LoadingButton>
							</Stack>
						</Grid>
					</Grid>
				</FormProvider>
			</Container>
		</MainLayout>
	);
};

export default CheckoutView;
