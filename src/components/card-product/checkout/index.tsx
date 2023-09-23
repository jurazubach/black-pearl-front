import React from 'react';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import _round from 'lodash/round';
import { styled, useTheme } from '@mui/material/styles';
import Iconify from 'src/components/iconify';
import ProductCounterField from 'src/components/product-counter-field';
import ProductPrices from 'src/components/product-prices';
import useCheckout from 'src/hooks/use-checkout';
import { ICheckoutProduct } from 'src/context/checkout-context';
import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';

interface Props {
	product: ICheckoutProduct;
}

const ImagePreview: any = styled(Image)({
	height: '90px',
	width: '78px',
	overflow: 'unset',
	'& > span': {
		height: { xs: '115px !important', sm: '100%' },
		width: { xs: '78px !important', sm: '100%' },
	},
});

export default ({ product }: Props) => {
	const theme = useTheme();
	const smUp = useResponsive('up', 'sm');

	const { removeProduct } = useCheckout();
	const onRemoveProductClick = () => removeProduct(product.productId, product.size);

	return (
		<Stack
			direction='row'
			spacing={2}
			sx={{ p: 2, '& + &': { borderTop: `1px solid ${theme.palette.divider}` } }}
		>
			<ImagePreview disabledEffect src={product.imageSrc} />

			<Stack
				direction='column'
				sx={{
					width: {
						xs: 'calc(100vw - 16px - 16px - 16px - 78px)',
						sm: '100%',
					},
					position: 'relative',
				}} spacing={1}>
				<Stack direction='row' justifyContent='space-between' alignItems='flex-start' spacing={1}>
					<Tooltip title={product.title}>
						<Typography sx={{
							typography: 'body2',
							width: 'calc(100% - 36px - 8px)',
							fontWeight: 'bold',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						}}>{product.title}</Typography>
					</Tooltip>
					<Box sx={{ position: 'absolute', top: '-5px', right: '1px' }}>
						<Tooltip title='Видалити товар'>
							<IconButton color='primary' onClick={onRemoveProductClick}>
								<Iconify icon='material-symbols:close' />
							</IconButton>
						</Tooltip>
					</Box>
				</Stack>

				<Stack direction='row' spacing={1}>
					<Typography variant='body2'>Розмір:</Typography>
					<Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>{product.size}</Typography>
				</Stack>

				<Stack direction={smUp ? 'row' : 'column'} alignItems="flex-start" justifyContent='space-between' spacing={1}>
					<ProductCounterField type='checkout' productId={product.productId} productSize={product.size} quantity={product.quantity} />

					<ProductPrices
						size='small'
						oldPrice={_round(product.quantity * product.oldPrice, 2)}
						price={_round(product.quantity * product.price, 2)}
					/>
				</Stack>
			</Stack>
		</Stack>
	);
};
