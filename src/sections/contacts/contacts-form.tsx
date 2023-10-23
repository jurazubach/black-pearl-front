import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Grid, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFCheckbox, RHFTextField } from 'src/components/hook-form';

const StyledRHFTextField: any = styled(RHFTextField)({
	'& .MuiInputBase-input': {
		fontWeight: 'bold',
		fontSize: '14px',
	},
});

export default () => {
	const [isSubmitting, setSubmitting] = useState<boolean>(false);

	const onSubmit = async (values: any) => {
		setSubmitting(true);

		return console.log('values', values);
	};

	const FormSchema = Yup.object().shape({
		accept: Yup.boolean().required('Це поле є обовʼязковим'),
		firstName: Yup.string().required('Імʼя є обовʼязковим'),
		lastName: Yup.string().required('Прізвище є обовʼязковим'),
		email: Yup.string().required('Email є обовʼязковим'),
		phone: Yup.string().required('Телефон є обовʼязковим'),
		subject: Yup.string().required('Тема є обовʼязковим'),
		message: Yup.string().required('Текст є обовʼязковим'),
	});

	const defaultValues = {
		accept: false,
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		subject: '',
		message: '',
	};

	const methods = useForm({ resolver: yupResolver(FormSchema), defaultValues });
	const { handleSubmit, watch } = methods;
	const formValues = watch();

	return (
		<Box sx={{ py: 3 }}>
			<Container maxWidth='lg'>
				<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<StyledRHFTextField fullWidth name='firstName' variant='outlined' label='Ім`я' type='text' />
						</Grid>
						<Grid item xs={12} sm={6}>
							<StyledRHFTextField fullWidth name='lastName' variant='outlined' label='Прізвище' type='text' />
						</Grid>

						<Grid item xs={12} sm={6}>
							<StyledRHFTextField fullWidth name='email' variant='outlined' label='Email' type='text' />
						</Grid>

						<Grid item xs={12} sm={6}>
							<StyledRHFTextField fullWidth name='phone' variant='outlined' label='Мобільний телефон' type='text' />
						</Grid>

						<Grid item xs={12}>
							<StyledRHFTextField fullWidth name='subject' variant='outlined' label='Тема звернення' type='text' />
						</Grid>

						<Grid item xs={12}>
							<StyledRHFTextField fullWidth multiline rows={4} name='message' variant='outlined' label='Текст звернення'
							                    type='text' />
						</Grid>

						<Grid item xs={12}>
							<Stack spacing={3}>
								<RHFCheckbox name='accept' label='Я даю згоду на передачу та обробку моїх персональних данних' />

								<LoadingButton
									loading={isSubmitting}
									disabled={isSubmitting || formValues.accept === false}
									type='submit'
									startIcon={<Iconify icon='solar:card-send-outline' color='inherit' width={24} />}
									fullWidth
									size='large'
									variant='contained'
									disableRipple
								>
									Надіслати
								</LoadingButton>
							</Stack>
						</Grid>
					</Grid>
				</FormProvider>
			</Container>
		</Box>
	);
}