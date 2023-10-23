import React, { useCallback, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import useCheckout from 'src/hooks/use-checkout';
import ProductCounterField from 'src/components/product-counter-field';
import { IProductItem } from 'src/types/product';
import { IWarehouseProductItemCatalog } from 'src/types/warehouseProduct';

interface Props {
	product: IProductItem;
	warehouseProduct: IWarehouseProductItemCatalog;
	setWarehouseProduct: (warehouseProduct: IWarehouseProductItemCatalog) => void;
}

const ProductBuyActions = ({ product, warehouseProduct, setWarehouseProduct }: Props) => {
	const { openToggle, checkoutProducts, addProduct } = useCheckout();
	const { warehouseProducts } = product;

	const onAddProductClick = () => {
		addProduct({
			productId: product.id,
			title: product.title,
			imageSrc: 'https://media.zoho.in.ua/a5915417-f840-4386-95bf-dbf22da20a95?v=1687116191918',
			size: warehouseProduct.size,
			oldPrice: warehouseProduct.oldPrice,
			price: warehouseProduct.price,
			quantity: 1,
		});
		openToggle();
	};

	const checkoutProduct = useMemo(() => checkoutProducts.find((i) => i.productId === product.id && i.size === warehouseProduct.size), [checkoutProducts, product, warehouseProduct]);
	const onWarehouseProductClick = useCallback((wp: IWarehouseProductItemCatalog) => () => setWarehouseProduct(wp), [setWarehouseProduct]);

	return (
		<Stack direction='column' spacing={1}>
			<Stack direction='row' justifyContent='space-between' alignItems='center' spacing={3}>
				<Stack direction='row' spacing={1}>
					{warehouseProducts.map((wProduct: any) => (
						<Box
							onClick={onWarehouseProductClick(wProduct)}
							key={wProduct.id}
							sx={{
								userSelect: 'none',
								display: 'flex',
								cursor: 'pointer',
								justifyContent: 'center',
								alignItems: 'center',
								width: '36px',
								height: '36px',
								transition: 'all .1s ease-in',
								backgroundColor: warehouseProduct.size === wProduct.size ? 'primary.main' : 'grey.100',
								'&:hover': {
									backgroundColor: warehouseProduct.size === wProduct.size ? 'primary.dark' : 'grey.200',
								},
							}}
						>
							<Typography
								sx={{
									padding: 1,
									color: wProduct.size === warehouseProduct.size ? 'common.white' : 'common.black',
								}}
								variant='subtitle1'
							>
								{wProduct.size}
							</Typography>
						</Box>
					))}
				</Stack>

				<Stack direction='row' spacing={1}>
					<Typography variant='body2'>Розмір:</Typography>
					<Typography variant='body1' sx={{ fontWeight: 'bold' }}>{warehouseProduct.size}</Typography>
				</Stack>
			</Stack>
			<Stack direction='row' spacing={1}>
				{checkoutProduct && (
					<ProductCounterField
						canDecrementDelete
						type='catalog'
						productId={checkoutProduct.productId}
						productSize={checkoutProduct.size}
						quantity={checkoutProduct.quantity}
					/>
				)}

				<Button
					onClick={onAddProductClick}
					fullWidth
					size='medium'
					startIcon={(<Iconify icon='solar:cart-plus-outline' color='inherit' width={24} />)}
					variant='contained'
				>
					{checkoutProduct ? 'Додати в кошик' : 'Покласти в кошик'}
				</Button>
			</Stack>
		</Stack>
	);
};

export default ProductBuyActions;
