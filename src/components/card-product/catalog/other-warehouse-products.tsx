import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { IWarehouseProductItemCatalog } from 'src/types/warehouseProduct';

interface Props {
	selectedWarehouseProduct: IWarehouseProductItemCatalog;
	warehouseProducts: IWarehouseProductItemCatalog[];
	setWarehouseProduct: (warehouseProduct: IWarehouseProductItemCatalog) => void;
}

const OtherWarehouseProducts = ({ selectedWarehouseProduct, warehouseProducts, setWarehouseProduct }: Props) => {
	const theme = useTheme();
	const onWarehouseProductClick = useCallback((warehouseProduct: IWarehouseProductItemCatalog) => () => setWarehouseProduct(warehouseProduct), [setWarehouseProduct]);

	return (
		<Stack direction='row' spacing={1}>
			{warehouseProducts.map((warehouseProduct: any) => (
				<Box
					onClick={onWarehouseProductClick(warehouseProduct)}
					key={warehouseProduct.id}
					sx={{
						display: 'flex',
						cursor: 'pointer',
						justifyContent: 'center',
						alignItems: 'center',
						width: '36px',
						height: '36px',
						transition: 'all .1s ease-in',
						backgroundColor: selectedWarehouseProduct.size === warehouseProduct.size ? 'primary.main' : 'grey.100',
						'&:hover': {
							backgroundColor: selectedWarehouseProduct.size === warehouseProduct.size ? 'primary.dark' : 'grey.200',
						},
					}}
				>
					<Typography
						sx={{
							padding: theme.spacing(1),
							color: selectedWarehouseProduct.size === warehouseProduct.size ? 'common.white' : 'common.black',
						}}
						variant='subtitle1'
					>
						{warehouseProduct.size}
					</Typography>
				</Box>
			))}
		</Stack>
	);
};

export default OtherWarehouseProducts;
