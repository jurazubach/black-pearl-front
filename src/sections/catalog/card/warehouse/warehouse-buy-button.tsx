import React, { useCallback, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import OtherWarehouseProducts from 'src/components/card-product/catalog/other-warehouse-products';
import ProductCounterField from 'src/components/product-counter-field';
import Iconify from 'src/components/iconify';
import useCheckout from 'src/hooks/use-checkout';
import { IProductItemCatalog } from 'src/types/product';
import { IWarehouseProductItemCatalog } from '../../../../types/warehouseProduct';

interface IWarehouseBuyButtonProps {
	selectedWarehouseProduct: IWarehouseProductItemCatalog;
	setWarehouseProduct: (warehouseProduct: IWarehouseProductItemCatalog) => void;
	product: IProductItemCatalog;
}

const WarehouseBuyButton = ({ selectedWarehouseProduct, setWarehouseProduct, product }: IWarehouseBuyButtonProps) => {
	const { openToggle, checkoutProducts, addProduct } = useCheckout();

	const { warehouseProducts } = product;

	const checkoutProduct = useMemo(() => checkoutProducts.find((i) => i.productId === product.id && i.size === selectedWarehouseProduct.size), [selectedWarehouseProduct, checkoutProducts, product]);

	const onAddProductClick = useCallback(() => {
		if (selectedWarehouseProduct) {
			addProduct({
				productId: product.id,
				title: product.title,
				imageSrc: 'https://media.zoho.in.ua/a5915417-f840-4386-95bf-dbf22da20a95?v=1687116191918',
				size: selectedWarehouseProduct.size,
				oldPrice: selectedWarehouseProduct.oldPrice,
				price: selectedWarehouseProduct.price,
				quantity: 1,
			});
			openToggle();
		}
	}, [addProduct, openToggle, selectedWarehouseProduct, product]);

	return (
		<Stack spacing={1}>
			<Stack direction='row' spacing={1} justifyContent='space-between' alignItems='center'>
				<Stack direction='row' spacing={1}>
					<Typography variant='subtitle2' sx={{ textDecoration: 'line-through' }}>
						{selectedWarehouseProduct.oldPrice} грн.
					</Typography>
					<Typography variant='subtitle1' color='error'>{selectedWarehouseProduct.price} грн.</Typography>
				</Stack>

				<OtherWarehouseProducts
					setWarehouseProduct={setWarehouseProduct}
					selectedWarehouseProduct={selectedWarehouseProduct}
					warehouseProducts={warehouseProducts}
				/>
			</Stack>

			<Stack direction='row' spacing={1} alignItems='center'>
				{checkoutProduct && (
					<ProductCounterField
						type='catalog'
						canDecrementDelete
						productId={checkoutProduct.productId}
						productSize={checkoutProduct.size}
						quantity={checkoutProduct.quantity}
					/>
				)}

				<Button
					onClick={onAddProductClick}
					fullWidth
					startIcon={<Iconify icon='material-symbols:add-shopping-cart' color='inherit' width={24} />}
					variant='contained'
				>{checkoutProduct ? 'Додати в кошик' : 'Покласти в кошик'}</Button>
			</Stack>
		</Stack>
	)
}

export default WarehouseBuyButton;
