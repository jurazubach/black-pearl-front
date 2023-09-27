import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React, { useCallback } from 'react';
import Iconify from 'src/components/iconify';
import { IProductItemCatalog } from 'src/types/product';
import useDialog from 'src/hooks/use-dialog';
import { DialogIds } from 'src/context/dialog-context';

interface IWarehouseSubscriptionButtonProps {
	product: IProductItemCatalog;
}

const WarehouseSubscriptionButton = ({ product }: IWarehouseSubscriptionButtonProps) => {
	const { openDialog } = useDialog();

	const onSubscriptionProductClick = useCallback(() => {
		openDialog({ id: DialogIds.INFORM_PRODUCT_AVAILABLE_DIALOG }, { product });
	}, [product, openDialog]);

	return (
		<Stack spacing={1}>
			<Typography sx={{ height: '36px', lineHeight: '36px' }} variant='subtitle2' color='grey.100'>Немає в наявності</Typography>

			<Button
				variant='outlined'
				color='inherit'
				onClick={onSubscriptionProductClick}
				fullWidth
				startIcon={<Iconify icon='mdi:email-arrow-right' color='inherit' width={24} />}
			>Повідомити, коли з'явиться</Button>
		</Stack>
	)
}

export default WarehouseSubscriptionButton;