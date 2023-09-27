import React, { useState } from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import NextLink from 'next/link';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import useCheckout from 'src/hooks/use-checkout';
import ProductCounterField from 'src/components/product-counter-field';
import BorderCard from 'src/components/border-card';
import OtherGoods from './other-goods';

interface Props {
	product: any;
	idx: number;
}

const images = [
	'https://static.lichi.com/product/45922/99fadd19a5cc831a397fba428409f0d7.jpg?v=0_45922.0&resize=size-small',
	'https://static.lichi.com/product/45980/bf8d4dc154b9f7eeab389f17c5cf32ea.jpg?v=0_45980.0&resize=size-small',
	'https://static.lichi.com/product/45887/26100ef86d39447f7d4f2430792fe16f.jpg?v=0_45887.0&resize=size-small',
	'https://static.lichi.com/product/45755/ea19cca16e7506e5005ec6ae2d0cd1b5.jpg?v=0_45755.0&resize=size-small',
	'https://static.lichi.com/product/45756/43fda956d4b7fc29aa331948e9c702d3.jpg?v=0_45756.0&resize=size-small',
	'https://static.lichi.com/product/45873/bd57593cbb26adf1bfb3a5a988e40078.jpg?v=1_45873.1&resize=size-small',
	'https://static.lichi.com/product/44809/8cc326bb3313dd14b1137a4b8d5956a0.jpg?v=0_44809.0&resize=size-small',
	'https://static.lichi.com/product/45778/f65aaa668104faa98f47cd0850a2b848.jpg?v=0_45778.0&resize=size-small',
	'https://static.lichi.com/product/45733/7ddd41e4abd95ec8f98dd777f13f5c53.jpg?v=0_45733.0&resize=size-small',
	'https://media.zoho.in.ua/a5915417-f840-4386-95bf-dbf22da20a95?v=1687116191918',
	'https://media.zoho.in.ua/76a8708c-e031-4761-ae52-91ac6b823ed3?v=1685579827105',
	'https://media.zoho.in.ua/d05360ef-8322-4f01-93ab-6a194e1af6f7?v=1684886687847',
	'https://media.zoho.in.ua/10265833-0dea-4eaf-ad54-c15caab866c5?v=1686337810125',
	'https://media.zoho.in.ua/c68ecd68-000e-43d4-a9a3-93b5001e5c09?v=1684971879341',
	'https://media.zoho.in.ua/787e9bf2-c32a-468f-97bd-c00f5c21f863?v=1684964571218',
	'https://media.zoho.in.ua/b38ac8cf-3acb-4568-83a4-74c705b29e6a?v=1688603423436',
	'https://media.zoho.in.ua/1c10d0c9-cf44-4384-8a80-cbcaf85b0d7d?v=1685565774032',
	'https://media.zoho.in.ua/38be3c30-fcf0-4614-8289-15f5c2c6f5ba?v=1688602962715',
	'https://media.zoho.in.ua/83a14b1e-eb04-42dd-90ea-a57c82e31053?v=1685582390485',
	'https://media.zoho.in.ua/2bae7f18-df35-454e-a39f-0bfe966e2d9f?v=1685583498246',
	'https://media.zoho.in.ua/a4060a7b-a26b-42fb-b129-3a18f7f9484b?v=1685559647042',
	'https://media.zoho.in.ua/6a8f1986-6c67-448a-a66e-530d6f0b1d67?v=1685574523914',
	'https://media.zoho.in.ua/bd0561f7-34b4-4d7b-b279-49013cc70506?v=1685580477049',
];

export default ({ product, idx }: Props) => {
	const image = images[idx];

	const goods = product.goods || [
		{ id: `${product.id}123`, size: 'XS', oldPrice: 1400, price: 900 },
		{ id: `${product.id}125`, size: 'S', oldPrice: 1400, price: 900 },
		{ id: `${product.id}127`, size: 'M', oldPrice: 1400, price: 900 },
	];
	const [warehouseId, setWarehouseId] = useState<string>(goods[0].id);
	const defaultGoods: any = Array.isArray(goods) && goods.length > 0 ? goods.find(({ id }) => id === warehouseId) : {
		oldPrice: 1400,
		price: 900,
	};

	const theme = useTheme();
	const { openToggle, checkoutProducts, addProduct } = useCheckout();

	const productLink = `/product/${product.alias}/${defaultGoods.id}`;

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
		<BorderCard sx={{
			'&:hover .MuiBox-root[data-attr="angles"]': { backgroundSize: theme.spacing(6, 6) },
			'&:hover .MuiLink-root[data-attr="link"]': { color: theme.palette.grey[100] },
			'&:hover .component-image.MuiBox-root': { transform: 'scale(1.1)' },
		}}>
			<Stack sx={{ zIndex: 1 }} spacing={1}>
				<Box sx={{ overflow: 'hidden', height: '480px' }}>
					<Image
						disabledEffect
						decoding='async'
						loading='lazy'
						src={image}
						sx={{
							transition: 'all .2s ease-in',
							height: '480px',
							minHeight: '480px',
							width: '100%',
						}}
					/>
				</Box>

				<Link underline='hover' variant="h6" sx={{
					color: 'grey.300',
					userSelect: 'none',
					transition: 'all 0.2s ease-in',
					height: theme.spacing(7),
					overflow: 'hidden',
					whiteSpace: 'normal',
					textOverflow: 'ellipsis',
				}} component={NextLink} href={productLink} data-attr="link">
					{product.title}
				</Link>

				<Stack direction='row' spacing={1} justifyContent='space-between' alignItems='center'>
					<Stack direction='row' spacing={1}>
						<Typography variant='subtitle2' sx={{ textDecoration: 'line-through' }}>
							{defaultGoods.oldPrice} грн.
						</Typography>
						<Typography variant='subtitle1' color='error'>{defaultGoods.price} грн.</Typography>
					</Stack>

					<OtherGoods
						setWarehouseId={setWarehouseId}
						defaultGoods={defaultGoods}
						otherGoods={goods}
					/>
				</Stack>

				<Stack direction='row' spacing={1} alignItems='center'>
					{productInCheckout && (
						<ProductCounterField
							type='catalog'
							canDecrementDelete
							productId={productInCheckout.productId}
							productSize={productInCheckout.size}
							quantity={productInCheckout.quantity}
						/>
					)}

					<Button
						onClick={onAddProductClick}
						fullWidth
						startIcon={<Iconify icon='material-symbols:add-shopping-cart' color='inherit' width={24} />}
						variant='contained'
					>{productInCheckout ? 'Додати в кошик' : 'Покласти в кошик'}</Button>
				</Stack>
			</Stack>
		</BorderCard>
	);
};
