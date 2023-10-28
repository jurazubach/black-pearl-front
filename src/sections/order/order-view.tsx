'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import { m } from 'framer-motion';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Iconify from 'src/components/iconify';
import useCheckout from 'src/hooks/use-checkout';
import { MotionContainer, varFade } from 'src/components/animate';

export default function OrderView() {
	const { orderNumber } = useParams();
	const { checkoutProducts } = useCheckout();
	const router = useRouter();

	useEffect(() => {
		if (checkoutProducts.length > 0) {
			router.replace('/');
		}
	}, [checkoutProducts, router]);

	return (
		<MotionContainer>
			<m.div variants={varFade().in}>
				<Container maxWidth='lg'>
					<Stack sx={{ py: 10 }} direction='column' justifyContent='center' alignItems='center' spacing={3}>
						<Iconify icon='solar:confetti-linear' width={120} />
						<Typography variant='h1' sx={{ textAlign: 'center' }}>Дякуємо за замовлення</Typography>

						<Alert variant="outlined" severity="success">
							<Stack direction='row' spacing={1}>
								<Typography>Ваш номер замовлення:</Typography>
								<Typography sx={{ fontWeight: 'bold' }}>#{orderNumber}</Typography>
							</Stack>
						</Alert>

						<Stack direction='column' spacing={1} alignItems='center'>
							<Typography sx={{ textAlign: 'center' }}>Наші менеджери б'ються за можливість прийняти ваше замовлення.</Typography>
							<Typography sx={{ textAlign: 'center' }}>Переможець зв'яжеться з вами найближчим часом.</Typography>
						</Stack>
					</Stack>
				</Container>
			</m.div>
		</MotionContainer>
	);
}
