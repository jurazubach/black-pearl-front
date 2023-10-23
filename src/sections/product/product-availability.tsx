import Typography from '@mui/material/Typography';
import React from 'react';
import Label from 'src/components/label';
import { IWarehouseProductItemCatalog } from 'src/types/warehouseProduct';

interface Props {
	warehouseProduct: IWarehouseProductItemCatalog | null;
}

const ProductAvailability = ({ warehouseProduct }: Props) => {
	if (!warehouseProduct) {
		return (
			<Label variant='soft' color='default'>
				<Typography variant='caption' sx={{ fontWeight: 'bold', textTransform: 'none' }}>Немає в наявності</Typography>
			</Label>
		);
	}

	if (warehouseProduct.quantity > 0 && warehouseProduct.quantity < 10) {
		return (
			<Label variant='soft' color='warning'>
				<Typography variant='caption' sx={{ fontWeight: 'bold', textTransform: 'none' }}>Закінчується</Typography>
			</Label>
		)
	}

	return (
		<Label variant='soft' color='success'>
			<Typography variant='caption' sx={{ fontWeight: 'bold', textTransform: 'none' }}>В наявності</Typography>
		</Label>
	);
}

export default ProductAvailability;
