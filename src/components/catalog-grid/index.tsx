import React from 'react';
import Box from '@mui/material/Box';
import CardProduct from 'src/components/card-product/catalog';

interface Props {
	products: { id: string | number }[];
}

export default ({ products }: Props) => (
	<Box sx={{
		my: 1,
		position: 'relative',
		display: 'grid',
		gridGap: '8px 0',
		gridTemplateColumns: {
			xs: 'repeat(1, 1fr)',
			sm: 'repeat(2, 1fr)',
			md: 'repeat(3, 1fr)',
			lg: 'repeat(4, 1fr)',
		},
	}}>
		{products.map((product, idx) => <CardProduct key={product.id} idx={idx} product={product} />)}
	</Box>
);
