import NextLink from 'next/link';
import _first from 'lodash/first';
import Link from '@mui/material/Link';
import React, { useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { PATH_PAGE } from 'src/routes/paths';
import { IProductItemCatalog } from 'src/types/product';
import { IWarehouseProductItemCatalog } from 'src/types/warehouseProduct';
import WarehouseButtons from './warehouse';

interface Props {
	product: IProductItemCatalog;
}

const ProductInfo = ({ product }: Props) => {
	const theme = useTheme();

	const { warehouseProducts } = product;
	const firstWarehouseProduct = _first(warehouseProducts);
	const [selectedWarehouseProduct, setWarehouseProduct] = useState<IWarehouseProductItemCatalog | null>(
		warehouseProducts.length > 0 && firstWarehouseProduct ? firstWarehouseProduct : null
	);

	const productLinkMemo = useMemo(() => PATH_PAGE.product(product.alias), [product.alias]);

	return (
		<Stack spacing={1}>
			<Link underline='hover' variant="h6" sx={{
				color: 'grey.300',
				userSelect: 'none',
				transition: 'all 0.2s ease-in',
				height: theme.spacing(7),
				overflow: 'hidden',
				whiteSpace: 'normal',
				textOverflow: 'ellipsis',
			}} component={NextLink} href={productLinkMemo} data-attr="link">
				{product.title}
			</Link>

			<WarehouseButtons
				selectedWarehouseProduct={selectedWarehouseProduct}
				setWarehouseProduct={setWarehouseProduct}
				product={product}
			/>
		</Stack>
	)
}

export default ProductInfo;
