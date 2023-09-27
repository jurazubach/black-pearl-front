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
import { ECategoryStatus } from 'src/types/category';

interface Props {
	closeDrawer: () => void,
	coupon: null;
}

export default function CategoriesDrawerForm({ closeDrawer, coupon }: Props) {
	const FormSchema = Yup.object().shape({
		alias: Yup.string().required('Алиас є обов`язковим'),
		singleTitle: Yup.string().required('Назва (Одн.) є обов`язковим'),
		multipleTitle: Yup.string().required('Назва (Мнж.) є обов`язковим'),
		description: Yup.string().required('Описа'),
		status: Yup.string().oneOf([ECategoryStatus.ACTIVE, ECategoryStatus.INACTIVE]).required('Статус є обов`язковим'),
	});

	const defaultValues = { multipleTitle: '', alias: '', singleTitle: '', description: '', status: ECategoryStatus.INACTIVE };
	const methods = useForm({ resolver: yupResolver(FormSchema), defaultValues });
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
			<DrawerFormHeader title='Створення категорії' onClose={closeDrawer} />

			<Box sx={{ height: 'calc(100vh - 70px - 81px)' }}>
				<Scrollbar>
					<DrawerTitleDivider number={1} title='Головне'>
						<RHFTextField name='alias' label='Алиас (URL)' type='text' />
						<RHFTextField name='singleTitle' label='Назва (Одн.)' type='text' />
						<RHFTextField name='multipleTitle' label='Назва (Мнж.)' type='text' />
						<RHFTextField name='description' label='Опис' type='text' multiline rows={5} />
					</DrawerTitleDivider>

					<DrawerTitleDivider number={2} title='Стан'>
						<RHFSelect native name='status' label='Статус'>
							<option value={ECategoryStatus.ACTIVE}>
								Активний
							</option>
							<option value={ECategoryStatus.INACTIVE}>
								Виключений
							</option>
						</RHFSelect>
					</DrawerTitleDivider>
				</Scrollbar>
			</Box>

			<DrawerFormActions onClose={closeDrawer} />
		</FormProvider>
	);
}
