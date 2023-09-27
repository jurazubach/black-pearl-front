import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import Scrollbar from 'src/components/scrollbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import DrawerTitleDivider from 'src/components/drawer/drawer-title-divider';
import DrawerFormActions from 'src/components/drawer/drawer-form-actions';
import DrawerFormHeader from 'src/components/drawer/drawer-form-header';

interface Props {
	closeDrawer: () => void,
	coupon: null;
}

export default function OrderDrawerForm({ closeDrawer, coupon }: Props) {
	const FormSchema = Yup.object().shape({
		firstName: Yup.string().required('Імя є обов`язковим'),
		lastName: Yup.string().required('Призвіще є обов`язковим'),
		email: Yup.string().required('Email є обов`язковим'),
		phone: Yup.string().required('Телефон є обов`язковим'),
		city: Yup.string().required('Місто є обов`язковим'),
		region: Yup.string().required('Регіон є обов`язковим'),
		// status: Yup.string().oneOf([ELookStatus.ACTIVE, ELookStatus.INACTIVE]).required('Статус є обов`язковим'),
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
			<DrawerFormHeader title='Створення замовлення' onClose={closeDrawer} />

			<Box sx={{ height: 'calc(100vh - 70px - 81px)' }}>
				<Scrollbar>
					<DrawerTitleDivider number={1} title='Головне'>
						<RHFTextField name='firstName' label='Імя' type='text' />
						<RHFTextField name='lastName' label='Призвіще' type='text' />
						<RHFTextField name='email' label='Email' type='text' />
						<RHFTextField name='phone' label='Телефон' type='text' />
						<RHFTextField name='city' label='Місто' type='text' />
						<RHFTextField name='region' label='Регіон' type='text' />
					</DrawerTitleDivider>
				</Scrollbar>
			</Box>

			<DrawerFormActions onClose={closeDrawer} />
		</FormProvider>
	);
}
