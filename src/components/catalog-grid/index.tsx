import React from 'react';
import Box from '@mui/material/Box';
import { m } from 'framer-motion';
import CardProduct from 'src/components/card-product/catalog';
import { MotionContainer, varFade } from 'src/components/animate';
import { IProductItemCatalog } from 'src/types/product';

interface Props {
	products: IProductItemCatalog[];
}

export default ({ products }: Props) => (
	<MotionContainer>
		<m.div variants={varFade().inRight}>
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
				{products.map((product, idx) => <CardProduct key={`${product.id}_${idx}`} idx={idx} product={product} />)}
			</Box>
		</m.div>
	</MotionContainer>
);
