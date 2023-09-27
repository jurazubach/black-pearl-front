import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import { IProductItemCatalog } from 'src/types/product';
import useDialog from 'src/hooks/use-dialog';
import { DialogIds } from 'src/context/dialog-context';
import { useResponsive } from 'src/hooks/use-responsive';

interface IProductSubscriptionButtonProps {
	product: IProductItemCatalog;
}

const ProductSubscriptionButton = ({ product }: IProductSubscriptionButtonProps) => {
	const { openDialog } = useDialog();
	const smUp = useResponsive('up', 'sm');

	const onSubscriptionProductClick = useCallback(() => {
		openDialog({ id: DialogIds.INFORM_PRODUCT_AVAILABLE_DIALOG }, { product });
	}, [product, openDialog]);

	return (
		<Button
			variant='outlined'
			color='inherit'
			size={smUp ? 'large' : 'medium'}
			onClick={onSubscriptionProductClick}
			fullWidth
			startIcon={<Iconify icon='mdi:email-arrow-right' color='inherit' width={24} />}
		>Повідомити, коли з'явиться</Button>
	)
}

export default ProductSubscriptionButton;