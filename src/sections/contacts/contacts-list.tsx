import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Image from 'src/components/image';

const BetweenTextWrapper = ({ leftText, rightText }: { leftText: string, rightText: string }) => {
	const theme = useTheme();

	return (
		<Stack direction='row' justifyContent='space-between'>
			<Typography sx={{
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
			}}>{leftText}</Typography>
			<Box sx={{ borderBottom: `1px dashed ${theme.palette.divider}`, width: '100%', mx: 3 }} />
			<Typography sx={{
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
				fontWeight: 'bold',
			}}>{rightText}</Typography>
		</Stack>
	);
};

const ContactsList = () => (
		<Box>
			<Container maxWidth='lg' sx={{ py: 3, textAlign: { xs: 'center', md: 'unset' } }}>
				<Grid container columnSpacing={6} rowSpacing={3} alignItems='flex-start'
				      sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
					<Grid xs={12} md={7}>
						<Stack spacing={3}>
							<Typography variant='h4'>Зв`язатись з нами</Typography>
							<BetweenTextWrapper leftText='E-mail для звязку' rightText='info@theblackpearl.com.ua' />
							<BetweenTextWrapper leftText='Телефон' rightText='+38(099)73-05-113' />
							<BetweenTextWrapper leftText='Telegram' rightText='@JuraZubach' />
							<BetweenTextWrapper leftText='Режим роботи магазину'
							                    rightText='Пн - Пт: 10.00 - 18.00, Сб - Нд: 11.00 - 18:00' />
							<BetweenTextWrapper leftText='Надсилання замовлень' rightText='Пн - Нд: до 16.00 (День у день)' />
						</Stack>
					</Grid>

					<Grid xs={12} md={5} alignItems='center'>
						<Image sx={{ borderRadius: '8px', maxHeight: '280px' }} alt='contacts'
						       src='https://emea.blvck.com/cdn/shop/files/contact.jpg?v=1632664719' />
					</Grid>
				</Grid>
			</Container>
		</Box>
	);

export default ContactsList;
