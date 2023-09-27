import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import Scrollbar from 'src/components/scrollbar';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import DrawerTitleDivider from 'src/components/drawer/drawer-title-divider';
import DrawerFormActions from 'src/components/drawer/drawer-form-actions';
import DrawerFormHeader from 'src/components/drawer/drawer-form-header';
import { SIZES_OPTIONS, WAREHOUSE_PRODUCT_SIZE } from 'src/types/warehouseProduct';

interface Props {
	closeDrawer: () => void,
	coupon: null;
}

export default function WarehouseDrawerForm({ closeDrawer, coupon }: Props) {
	const FormSchema = Yup.object().shape({
		productId: Yup.number().required('Продукт є обов`язковим'),
		quantity: Yup.number().required('Кол-во є обов`язковим'),
		price: Yup.number().required('Ціна є обов`язковим'),
		costPrice: Yup.number().required('Собівартість є обов`язковим'),
		oldPrice: Yup.number().required('Стара ціна є обов`язковим'),
		size: Yup.string().oneOf(Object.values(WAREHOUSE_PRODUCT_SIZE)).required('Розмір є обов`язковим'),
	});

	const methods = useForm({ resolver: yupResolver(FormSchema), defaultValues: {} });
	const { reset, handleSubmit } = methods;

	const onSubmit = useCallback(async (_formValues: any) => {
		try {
			// const payload = formValues;

			// await createCoupon(payload);
			enqueueSnackbar('Новий купон успішно створено', { variant: 'success' });
		} catch (e: any) {
			enqueueSnackbar('Сталась помилка при збереженні', { variant: 'error' });
		} finally {
			reset();
			// reFetchQuery();
			closeDrawer();
		}
	}, [closeDrawer, reset]);

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<DrawerFormHeader title='Створення товару на складі' onClose={closeDrawer} />

			<Box sx={{ height: 'calc(100vh - 70px - 81px)' }}>
				<Scrollbar>
					<DrawerTitleDivider number={1} title='Продукт'>
						<RHFTextField name='quantity' label='Продукт' type='text' />
					</DrawerTitleDivider>

					<DrawerTitleDivider number={2} title='Ціни'>
						<RHFTextField name='costPrice' label='Собівартість' type='text' />
						<RHFTextField name='oldPrice' label='Стара ціна' type='text' />
						<RHFTextField name='price' label='Ціна' type='text' />
					</DrawerTitleDivider>

					<DrawerTitleDivider number={3} title='Параметри'>
						<RHFTextField name='quantity' label='Кількість' type='text' />

						<RHFSelect native name='size' label='Розмір'>
							{SIZES_OPTIONS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
						</RHFSelect>
					</DrawerTitleDivider>
				</Scrollbar>
			</Box>

			<DrawerFormActions onClose={closeDrawer} />
		</FormProvider>
	);
}
