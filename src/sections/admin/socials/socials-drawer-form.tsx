import React, { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import FormProvider, { RHFSelect, RHFTextField, RHFUploadBox } from 'src/components/hook-form';
import DrawerTitleDivider from 'src/components/drawer/drawer-title-divider';
import DrawerFormActions from 'src/components/drawer/drawer-form-actions';
import DrawerFormHeader from 'src/components/drawer/drawer-form-header';
import { ESocialStatus, ESocialType } from 'src/types/social';

interface Props {
	closeDrawer: () => void,
	coupon: null;
}

export default function SocialsDrawerForm({ closeDrawer, coupon }: Props) {
	const FormSchema = Yup.object().shape({
		link: Yup.string().required('Посилання є обов`язковим'),
		description: Yup.string().required('Описа'),
		images: Yup.array().min(1, 'Images is required'),
		type: Yup.string().oneOf([ESocialType.INSTAGRAM]).required('Тип є обов`язковим'),
		status: Yup.string().oneOf([ESocialStatus.ACTIVE, ESocialStatus.INACTIVE]).required('Статус є обов`язковим'),
	});

	const defaultValues = { images: [], link: '', description: '', type: ESocialType.INSTAGRAM, status: ESocialStatus.INACTIVE };
	const methods = useForm({ resolver: yupResolver(FormSchema), defaultValues });
	const { reset, handleSubmit, watch, setValue } = methods;
	const values = watch();

	const handleDrop = useCallback(
		(acceptedFiles: File[]) => {
			const files = values.images || [];

			const newFiles = acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			);

			setValue('images', [...files, ...newFiles], { shouldValidate: true });
		},
		[setValue, values.images]
	);

	const handleRemoveFile = useCallback(
		(inputFile: File | string) => {
			const filtered = values.images && values.images?.filter((file) => file !== inputFile);
			setValue('images', filtered);
		},
		[setValue, values.images]
	);

	const handleRemoveAllFiles = useCallback(() => {
		setValue('images', []);
	}, [setValue]);


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
			<DrawerFormHeader title='Створення соц. посту' onClose={closeDrawer} />

			<Box sx={{ height: 'calc(100vh - 70px - 81px)' }}>
				<Scrollbar>
					<DrawerTitleDivider number={1} title='Головне'>
						<RHFTextField name='link' label='Посилання' type='text' />
						<RHFTextField name='description' label='Опис' type='text' multiline rows={5} />
					</DrawerTitleDivider>

					<DrawerTitleDivider number={2} title='Зображення'>
						<RHFUploadBox
							multiple
							thumbnail
							name='images'
							onDrop={handleDrop}
							onRemove={handleRemoveFile}
							onRemoveAll={handleRemoveAllFiles}
							onUpload={() => console.log('ON UPLOAD')}
							placeholder={
								<Stack spacing={0.5} alignItems='center'>
									<Iconify icon='eva:cloud-upload-fill' width={40} />
									<Typography variant='body2'>Перетягніть або оберіть файли</Typography>
								</Stack>
							}
							sx={{ width: '100%', height: 'auto', py: 1 }}
						/>
					</DrawerTitleDivider>

					<DrawerTitleDivider number={3} title='Стан'>
						<RHFSelect native name='type' label='Тип'>
							<option value={ESocialType.INSTAGRAM}>
								Instagram
							</option>
						</RHFSelect>

						<RHFSelect native name='status' label='Статус'>
							<option value={ESocialStatus.ACTIVE}>
								Активний
							</option>
							<option value={ESocialStatus.INACTIVE}>
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
