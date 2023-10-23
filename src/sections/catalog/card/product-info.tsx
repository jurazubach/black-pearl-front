import NextLink from 'next/link';
import _first from 'lodash/first';
import React, { useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import { PATH_PAGE } from 'src/routes/paths';
import { IProductItemCatalog } from 'src/types/product';
import { IWarehouseProductItemCatalog } from 'src/types/warehouseProduct';
import TextMaxLine from 'src/components/text-max-line';
import WarehouseButtons from './warehouse';

interface Props {
	product: IProductItemCatalog;
}

const ProductInfo = ({ product }: Props) => {
	const { warehouseProducts } = product;
	const firstWarehouseProduct = _first(warehouseProducts);
	const [selectedWarehouseProduct, setWarehouseProduct] = useState<IWarehouseProductItemCatalog | null>(
		warehouseProducts.length > 0 && firstWarehouseProduct ? firstWarehouseProduct : null
	);

	const productLinkMemo = useMemo(() => PATH_PAGE.product(product.alias), [product.alias]);

	return (
		<Stack spacing={1}>
			<TextMaxLine asLink line={1} underline='hover' variant="subtitle1" sx={{
				color: 'grey.300',
				userSelect: 'none',
				transition: 'all 0.2s ease-in',
			}} component={NextLink} href={productLinkMemo} data-attr="link">
				{product.title}
			</TextMaxLine>

			<WarehouseButtons
				selectedWarehouseProduct={selectedWarehouseProduct}
				setWarehouseProduct={setWarehouseProduct}
				product={product}
			/>
		</Stack>
	)
}

export default ProductInfo;
