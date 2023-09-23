import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import _first from 'lodash/first';
import Box from '@mui/material/Box';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import useCheckout from 'src/hooks/use-checkout';
import ProductCounterField from 'src/components/product-counter-field';
import { useResponsive } from 'src/hooks/use-responsive';

interface Props {
	product: any;
}

const ProductActions = ({ product }: Props) => {
	const { openToggle, checkoutProducts, addProduct } = useCheckout();
	const smUp = useResponsive('up', 'sm');

	const goods = product.goods || [];
	const defaultGoods: any = Array.isArray(goods) && goods.length > 0 ? _first(goods || []) : { oldPrice: 0, price: 0 };

	const onAddProductClick = () => {
		addProduct({
			productId: product.id,
			title: product.title,
			imageSrc: 'https://media.zoho.in.ua/a5915417-f840-4386-95bf-dbf22da20a95?v=1687116191918',
			size: defaultGoods.size,
			oldPrice: defaultGoods.oldPrice,
			price: defaultGoods.price,
			quantity: 1,
		});
		openToggle();
	};

	const productInCheckout = checkoutProducts.find((i) => i.productId === product.id && i.size === defaultGoods.size);

	return (
		<Stack direction='column' spacing={1}>
			<Stack direction='row' justifyContent='space-between' alignItems='center' spacing={3}>
				<Stack direction='row' spacing={1}>
					{goods.map((productGoods: any) => (
						<Box key={productGoods.id} sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: { xs: '36px', sm: '48px' },
							height: { xs: '36px', sm: '48px' },
							cursor: 'pointer',
							backgroundColor: defaultGoods.size === productGoods.size ? 'primary.main' : 'grey.100',
							'&:hover': {
								backgroundColor: defaultGoods.size === productGoods.size ? 'primary.dark' : 'grey.200',
								textDecoration: 'none',
							},
						}}>
							<Link component={NextLink} sx={{
								padding: 1,
								textDecoration: 'none !important',
								color: defaultGoods.size === productGoods.size ? 'common.white' : 'common.black',
							}} href={`/product/${product.alias}/${productGoods.id}`}>
								<Typography variant='subtitle1'>{productGoods.size}</Typography>
							</Link>
						</Box>
					))}
				</Stack>

				<Stack direction='row' spacing={1}>
					<Typography variant='body2'>Розмір:</Typography>
					<Typography variant='body1' sx={{ fontWeight: 'bold' }}>{defaultGoods.size}</Typography>
				</Stack>
			</Stack>
			<Stack direction='row' spacing={1}>
				{productInCheckout && (
					<ProductCounterField
						canDecrementDelete
						type={smUp ? 'card' : 'catalog'}
						productId={productInCheckout.productId}
						productSize={productInCheckout.size}
						quantity={productInCheckout.quantity}
					/>
				)}

				<Button
					onClick={onAddProductClick}
					fullWidth
					size={smUp ? 'large' : 'medium'}
					startIcon={(<Iconify icon='material-symbols:add-shopping-cart' color='inherit' width={24} />)}
					variant='contained'
				>
					{productInCheckout ? 'Додати в кошик' : 'Покласти в кошик'}
				</Button>
			</Stack>
		</Stack>
	);
};

export default ProductActions;
