import React from 'react';
import { m } from 'framer-motion';
import Box from '@mui/material/Box';
import CardProduct from 'src/components/card-product/catalog';
import { IProductItemCatalog } from 'src/types/product';
import { varFade } from 'src/components/animate';

interface Props {
	products: IProductItemCatalog[];
}

const variantsVarFadeInRight = {
	hidden: varFade().in.initial,
	show: varFade().in.animate
};

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
		{products.map((product, idx) => {
			return (
				<m.div variants={variantsVarFadeInRight} key={`${product.id}_${idx}`}>
					<CardProduct idx={idx} product={product} />
				</m.div>
			)
		})}
	</Box>
);
