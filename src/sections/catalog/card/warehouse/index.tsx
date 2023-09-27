import React from 'react';
import { IProductItemCatalog } from 'src/types/product';
import { IWarehouseProductItemCatalog } from 'src/types/warehouseProduct';
import WarehouseBuyButton from './warehouse-buy-button';
import WarehouseSubscriptionButton from './warehouse-subscription-button';

interface IWarehouseButtonsProps {
	selectedWarehouseProduct: IWarehouseProductItemCatalog | null;
	setWarehouseProduct: (warehouseProduct: IWarehouseProductItemCatalog) => void;
	product: IProductItemCatalog;
}

const WarehouseButtons = ({ selectedWarehouseProduct, setWarehouseProduct, product }: IWarehouseButtonsProps) => {
	const {warehouseProducts} = product;

	if (warehouseProducts.length > 0 && selectedWarehouseProduct) {
		return (
			<WarehouseBuyButton
				selectedWarehouseProduct={selectedWarehouseProduct}
				setWarehouseProduct={setWarehouseProduct}
				product={product}
			/>
		);
	}

	return <WarehouseSubscriptionButton product={product} />
}

export default WarehouseButtons;
