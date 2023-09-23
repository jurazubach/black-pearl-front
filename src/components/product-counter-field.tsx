import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import useCheckout from 'src/hooks/use-checkout';
import Iconify from 'src/components/iconify';

interface Props {
	type: 'catalog' | 'card' | 'checkout';
	productId: number;
	productSize: string;
	quantity: number;
	canDecrementDelete?: boolean;
}

const getSizesByType = (type: Props['type']) => {
	if (type === 'checkout') {
		return { buttonHeight: '24px', buttonWidth: '40px' };
	}

	if (type === 'catalog') {
		return { buttonHeight: '36px', buttonWidth: '36px' };
	}

	if (type === 'card') {
		return { buttonHeight: '48px', buttonWidth: '48px' };
	}

	return {};
};

const ProductCounterField = ({ type, canDecrementDelete = false, productId, productSize, quantity }: Props) => {
	const theme = useTheme();
	const { incrementProduct, decrementProduct } = useCheckout();

	const isBlockDecrement = !canDecrementDelete && quantity <= 1;

	const onIncrementProductClick = () => incrementProduct(productId, productSize);
	const onDecrementProductClick = () => {
		if (!isBlockDecrement) {
			decrementProduct(productId, productSize);
		}
	};

	const sizes = getSizesByType(type)!;

	return (
		<Stack direction='row' alignItems="center">
			<Button
				sx={{ height: sizes.buttonHeight, minWidth: sizes.buttonWidth }}
				size='small'
				variant='contained'
				onClick={onDecrementProductClick}
				disabled={isBlockDecrement}
			>
				<Iconify icon='material-symbols:remove' />
			</Button>

			<TextField sx={{
				width: { xs: '52px', sm: '64px' },
				'& .MuiInputBase-root': { height: sizes.buttonHeight },
				'& .MuiInputBase-input': {
					'-webkit-text-fill-color': `${theme.palette.grey[100]} !important`,
					textAlign: 'center',
					height: '32px',
					padding: 0,
					fontWeight: 'bold',
					fontSize: '14px',
				},
			}} disabled variant='outlined' value={quantity} InputLabelProps={{ shrink: true }} />

			<Button
				sx={{ height: sizes.buttonHeight, minWidth: sizes.buttonWidth }}
				size='small'
				variant='contained'
				onClick={onIncrementProductClick}
			>
				<Iconify icon='material-symbols:add' />
			</Button>
		</Stack>
	);
};

export default ProductCounterField;
