import React, { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import _pick from 'lodash/pick';
import { enqueueSnackbar } from 'notistack';
import InputAdornment from '@mui/material/InputAdornment';
import { ICouponItem } from 'src/types/coupon';
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField } from 'src/components/hook-form';
import DrawerTitleDivider from 'src/components/drawer/drawer-title-divider';
import Scrollbar from 'src/components/scrollbar';
import Iconify from 'src/components/iconify';
import DrawerFormActions from 'src/components/drawer/drawer-form-actions';
import DrawerFormHeader from 'src/components/drawer/drawer-form-header';

interface Props {
	closeDrawer: () => void,
	coupon: null;
}

export default function CouponDrawerForm({ closeDrawer, coupon }: Props) {
	const FormSchema = Yup.object().shape({
		type: Yup.string().required('Тип купона є обов`язковим'),
		code: Yup.string().required('Промокод є обов`язковим'),
		codeType: Yup.boolean().required('Тип коду є обов`язковим'),
		discountType: Yup.string().required('Тип знижки є обов`язковим'),
		discount: Yup.number().required('Скидка є обов`язкова'),
		startAt: Yup.string().required('Дата початку є обов`язковим'),
		endAt: Yup.string().required('Дата закінчення є обов`язковим'),
	});

	const defaultValues = { type: 'single', code: '', codeType: false, discountType: 'percent', discount: 0, startAt: '', endAt: '' };
	const methods = useForm({ resolver: yupResolver(FormSchema), defaultValues });
	const { reset, handleSubmit, watch } = methods;
	const values = watch();

	const onSubmit = useCallback(async (formValues: any) => {
		try {
			const payload = {
				..._pick(formValues, ['type', 'discount', 'discountType', 'startAt', 'endAt']),
				code: formValues.codeType ? null : formValues.code,
			} as ICouponItem;

			console.log(payload);
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
			<DrawerFormHeader title='Створення купона' onClose={closeDrawer} />

			<Box sx={{ height: 'calc(100vh - 70px - 81px)' }}>
				<Scrollbar>
					<DrawerTitleDivider number={1} title='Тип'>
						<RHFSelect native name='type' label='Тип купона'>
							<option key='single' value='single'>
								Одноразовий
							</option>
							<option key='multiple' value='multiple'>
								Багаторазовий
							</option>
						</RHFSelect>
					</DrawerTitleDivider>

					<DrawerTitleDivider number={2} title='Прокомод'>
						<Stack spacing={2}>
							<RHFTextField
								name='code'
								label='Промокод'
								type='text'
								disabled={values.codeType}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<Iconify icon='eva:hash-outline' />
										</InputAdornment>
									),
								}}
							/>

							<RHFSwitch name="codeType" label='Згенерувати промокод автоматично' />
						</Stack>
					</DrawerTitleDivider>

					<DrawerTitleDivider number={3} title='Знижка'>
						<Stack spacing={2}>
							<RHFSelect native name='discountType' label='Тип знижки'>
								<option key='percent' value='percent'>
									Знижка у відсотках
								</option>
								<option key='price' value='price'>
									Фіксована у гривні
								</option>
							</RHFSelect>

							<RHFTextField
								name='discount'
								label='Знижка'
								type='text'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<Iconify icon={values.discountType === 'percent' ? 'material-symbols:percent' : 'mdi:currency-uah'} />
										</InputAdornment>
									),
								}}
							/>
						</Stack>
					</DrawerTitleDivider>

					<DrawerTitleDivider number={4} title='Дата'>
						<Stack spacing={2}>
							<RHFTextField name='startAt' type='text' label='Дата початку' InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<Iconify icon='material-symbols:calendar-month-outline' />
									</InputAdornment>
								),
							}} />
							<RHFTextField name='endAt' type='text' label='Дата закінчення' InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<Iconify icon='material-symbols:calendar-month-outline' />
									</InputAdornment>
								),
							}} />
						</Stack>
					</DrawerTitleDivider>
				</Scrollbar>
			</Box>

			<DrawerFormActions onClose={closeDrawer} />
		</FormProvider>
	);
}
