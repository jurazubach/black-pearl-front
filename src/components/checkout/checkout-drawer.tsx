'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { paper } from 'src/theme/css';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import useCheckout from 'src/hooks/use-checkout';
import { calculateTotalPrices } from 'src/utils/checkout';
import CheckoutCardProduct from 'src/components/card-product/checkout';

export default function CheckoutDrawer() {
	const theme = useTheme();
	const checkout = useCheckout();
	const router = useRouter();
	const { checkoutProducts } = useCheckout();
	const [totalOldPrice, totalPrice] = calculateTotalPrices(checkoutProducts);

	const onGoToCheckoutClick = () => {
		if (checkoutProducts.length > 0) {
			checkout.openToggle();
			router.push('/checkout');
		}
	};

	const isCheckoutEmpty = checkoutProducts.length === 0;

	return (
		<Drawer
			anchor='right'
			open={checkout.open}
			onClose={checkout.openToggle}
			sx={{
				[`& .${drawerClasses.paper}`]: {
					...paper({ theme, bgcolor: theme.palette.background.default }),
					borderLeft: { xs: 'none', sm: `1px solid ${theme.palette.divider}` },
					width: { xs: '100%', sm: '540px' },
				},
			}}
		>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				sx={{ py: 2, pr: 2, pl: 2 }}
			>
				<Typography variant='h4' sx={{ flexGrow: 1 }}>
					Кошик
				</Typography>

				<IconButton onClick={checkout.openToggle}>
					<Iconify icon='mingcute:close-line' />
				</IconButton>
			</Stack>

			<Divider />

			<Scrollbar sx={{ height: 'calc(100vh - 68px - 44px - 144px)' }}>
				{isCheckoutEmpty
					? (
						<Box sx={{ padding: theme.spacing(2) }}>
							<Typography>Ваш кошик порожній 😢</Typography>
							<Typography>Але це ніколи не пізно виправити.</Typography>
						</Box>
					)
					: (
						<Stack spacing={1}>
							{checkoutProducts.map((checkoutProduct) => (
								<CheckoutCardProduct key={checkoutProduct.productId} product={checkoutProduct} />
							))}
						</Stack>
					)
				}
			</Scrollbar>

			<Divider />

			<Stack sx={{ py: 1, px: 2 }} direction='row' spacing={1} alignItems='center' justifyContent='flex-end'>
				<Typography sx={{ fontSize: '18px' }}>Всього:</Typography>
				<Typography sx={{
					fontSize: '16px',
					color: 'grey.300',
					textDecoration: 'line-through',
				}}>{totalOldPrice} грн.</Typography>
				<Typography color='error' sx={{ fontSize: '18px', fontWeight: 'bold' }}>{totalPrice} грн.</Typography>
			</Stack>

			<Divider />

			<Box sx={{ p: 2 }}>
				<Stack spacing={1}>
					<Button
						fullWidth
						size='large'
						variant='outlined'
						color='inherit'
						onClick={checkout.openToggle}
						startIcon={<Iconify icon='mdi:cart-arrow-right' color='inherit' width={24} />}
					>
						Продовжити покупки
					</Button>
					<Button
						disabled={isCheckoutEmpty}
						fullWidth
						size='large'
						variant='contained'
						color='primary'
						onClick={onGoToCheckoutClick}
						startIcon={<Iconify icon='mdi:lead-pencil' color='inherit' width={24} />}
					>
						Оформити замовлення
					</Button>
				</Stack>
			</Box>
		</Drawer>
	);
}
