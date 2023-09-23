import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, TextField, Button, Box } from '@mui/material';

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
				fontWeight: 'bold'
			}}>{rightText}</Typography>
		</Stack>
	);
};

export default () => {
	const theme = useTheme();

	return (
		<Box sx={{ bgcolor: 'grey.800', py: 6, borderTop: `1px solid ${theme.palette.divider}` }}>
			<Container maxWidth='xl'>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6} sx={{ paddingLeft: '0px !important' }}>
						<Stack spacing={5}>
							<Typography variant="h4">
								Не соромтеся та звертайтеся до нас.<br/>
								Ми будемо раді почути Вас.
							</Typography>

							<Stack spacing={3}>
								<TextField fullWidth label="Ім`я" />
								<TextField fullWidth label="Телефон" />
								<TextField fullWidth label="Email" />
								<TextField fullWidth label="Тема" />
								<TextField fullWidth label="Ваше повідомлення" multiline rows={4} />
							</Stack>

							<Button size="large" variant="contained">
								Надіслати
							</Button>
						</Stack>
					</Grid>

					<Grid item xs={12} md={6}>
						<Stack spacing={3}>
							<Typography variant="h4" >Зв`язатись з нами</Typography>
							<BetweenTextWrapper leftText='E-mail для звязку' rightText='info@theblackpearl.com.ua' />
							<BetweenTextWrapper leftText='Телефон безкоштовно по Україні' rightText='0 800 33 01 06З' />
							<BetweenTextWrapper leftText='Режим роботи магазину' rightText='Пн - Пт: 10.00 - 18.00, Сб - Нд: 11.00 - 18:00' />
							<BetweenTextWrapper leftText='Надсилання замовлень' rightText='Пн - Нд: до 16.00 (День у день)' />
						</Stack>
					</Grid>
				</Grid>
			</Container>
		</Box>
	)
}