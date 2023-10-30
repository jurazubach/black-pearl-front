import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Image from 'src/components/image';
import BorderCard from 'src/components/border-card';
import { IProductItemCatalog } from 'src/types/product';
import ProductInfo from 'src/sections/catalog/card/product-info';

interface Props {
	product: IProductItemCatalog;
	idx: number;
}

const images = [
	'https://static.lichi.com/product/45816/b7c0a92ebe7b8879e6672d1227432902.jpg?v=3_45816.3&resize=size-large',
	'https://static.lichi.com/product/45922/99fadd19a5cc831a397fba428409f0d7.jpg?v=0_45922.0&resize=size-large',
	'https://static.lichi.com/product/45980/bf8d4dc154b9f7eeab389f17c5cf32ea.jpg?v=0_45980.0&resize=size-large',
	'https://static.lichi.com/product/45887/26100ef86d39447f7d4f2430792fe16f.jpg?v=0_45887.0&resize=size-large',
	'https://static.lichi.com/product/45755/ea19cca16e7506e5005ec6ae2d0cd1b5.jpg?v=0_45755.0&resize=size-large',
	'https://static.lichi.com/product/45756/43fda956d4b7fc29aa331948e9c702d3.jpg?v=0_45756.0&resize=size-large',
	'https://static.lichi.com/product/45873/bd57593cbb26adf1bfb3a5a988e40078.jpg?v=1_45873.1&resize=size-large',
	'https://static.lichi.com/product/44809/8cc326bb3313dd14b1137a4b8d5956a0.jpg?v=0_44809.0&resize=size-large',
	'https://static.lichi.com/product/45778/f65aaa668104faa98f47cd0850a2b848.jpg?v=0_45778.0&resize=size-large',
	'https://static.lichi.com/product/45733/7ddd41e4abd95ec8f98dd777f13f5c53.jpg?v=0_45733.0&resize=size-large',
	'https://static.lichi.com/product/45863/f58b74b24067586aa62801cbe6c78213.jpg?v=1_45863.1&resize=size-large',
];

export default ({ product, idx }: Props) => {
	const theme = useTheme();

	return (
		<BorderCard sx={{
			'&:hover .MuiBox-root[data-attr="angles"]': { backgroundSize: theme.spacing(6, 6) },
			'&:hover .MuiLink-root[data-attr="link"]': { color: theme.palette.grey[100] },
			'&:hover .component-image.MuiBox-root': { transform: 'scale(1.1)' },
		}}>
			<Stack sx={{ zIndex: 1 }} spacing={1}>
				<Box sx={{ overflow: 'hidden', height: '540px' }}>
					<Image
						decoding='async'
						loading='lazy'
						effect="opacity"
						src={images[idx]}
						useIntersectionObserver
						placeholderSrc='/assets/image-placeholder.png'
						sx={{ height: '100%', width: '100%' }}
					/>
				</Box>

				<ProductInfo product={product} />
			</Stack>
		</BorderCard>
	);
};
