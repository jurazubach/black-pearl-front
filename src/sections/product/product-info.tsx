import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { IProductItem } from 'src/types/product';
import { IWarehouseProductItemCatalog } from 'src/types/warehouseProduct';
import ProductAvailability from './product-availability';

interface Props {
	product: IProductItem;
	warehouseProduct: IWarehouseProductItemCatalog | null;
}

const ProductInfo = ({ product, warehouseProduct }: Props) => (
		<Stack direction='column' spacing={3}>
			<Typography variant='h3' sx={{ fontWeight: 'bold' }}>{product.title}</Typography>

			<Stack direction='row' justifyContent='space-between' spacing={2}>
				<ProductAvailability warehouseProduct={warehouseProduct} />

				<Stack direction='row' spacing={1}>
					<Typography variant='body2'>Актикул:</Typography>
					<Typography variant='body1' sx={{ fontWeight: 'bold', color: '#e7e7e7' }}>{product.code}</Typography>
				</Stack>
			</Stack>
		</Stack>
	);

export default ProductInfo;
