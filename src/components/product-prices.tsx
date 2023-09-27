import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface Props {
	size?: 'small' | 'medium';
	oldPrice?: number;
	price: number;
}

const ProductPrices = ({ size = 'medium', oldPrice, price }: Props) => (
	<Stack direction='row' spacing={size === 'medium' ? 2 : 1} alignItems='center'>
		{oldPrice && (
			<Typography
				variant={size === 'medium' ? 'h5' : 'subtitle2'}
				sx={{
					color: 'grey.300',
					textDecoration: 'line-through',
				}}
			>
				{oldPrice} грн.
			</Typography>
		)}

		<Typography variant={size === 'medium' ? 'h4' : 'subtitle1'} color='error'>
			{price} грн.
		</Typography>
	</Stack>
);

export default ProductPrices;
