'use client';

import React, { useState } from 'react';
import { m, useScroll } from 'framer-motion';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import _first from 'lodash/first';
import ScrollProgress from 'src/components/scroll-progress';
import CarouselProducts from 'src/sections/_examples/extra/carousel-view/carousel-products';
import ContainerTitle from 'src/components/container-title';
import ProductPrices from 'src/components/product-prices';
import { IProductItem, IProductItemCatalog } from 'src/types/product';
import { IWarehouseProductItemCatalog } from 'src/types/warehouseProduct';

import { PATH_PAGE } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import CarouselProductImages from 'src/sections/_examples/extra/carousel-view/carousel-product-images';
import { MotionContainer, varFade } from 'src/components/animate';

import ProductDescriptions from './product-descriptions';
import ProductBuyActions from './product-buy-actions';
import ProductInfo from './product-info';
import ProductSubscriptionButton from './product-subscription-button';

interface Props {
	product: IProductItem;
	similarProducts: IProductItemCatalog[];
}

const DEFAULT_IMAGES = [
	'https://static.lichi.com/product/45980/bf8d4dc154b9f7eeab389f17c5cf32ea.jpg?v=0_45980.0',
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

export default function ProductMainView({ product, similarProducts }: Props) {
	const theme = useTheme();
	const { scrollYProgress } = useScroll();
	const { warehouseProducts } = product;

	const firstWarehouseProduct = _first(warehouseProducts);
	const [warehouseProduct, setWarehouseProduct] = useState<IWarehouseProductItemCatalog | null>(
		firstWarehouseProduct || null
	);

	return (
		<Stack>
			<ScrollProgress scrollYProgress={scrollYProgress} />

			<Box sx={{
				borderTop: `1px solid ${theme.palette.divider}`,
				borderBottom: `1px solid ${theme.palette.divider}`,
			}}>
				<Container disableGutters maxWidth='lg'>
					<CustomBreadcrumbs
						links={[
							{ name: 'Головна', href: PATH_PAGE.home },
							{ name: product.category.multipleTitle, href: `${PATH_PAGE.catalog}/${product.category.alias}` },
							{ name: product.title },
						]}
					/>
				</Container>
			</Box>

			<MotionContainer>
				<m.div variants={varFade().inRight}>
					<Container maxWidth='lg' sx={{ py: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3, lg: 0 } }} disableGutters>
						<Grid container spacing={{ xs: 1, sm: 3 }}>
							<Grid item xs={12} md={6}>
								<CarouselProductImages images={DEFAULT_IMAGES} />
							</Grid>
							<Grid item xs={12} md={6}>
								<Stack spacing={3}>
									<ProductInfo product={product} warehouseProduct={warehouseProduct} />

									{warehouseProduct && (
										<ProductPrices oldPrice={warehouseProduct.oldPrice} price={warehouseProduct.price} />
									)}

									{warehouseProduct && (
										<ProductBuyActions
											product={product}
											warehouseProduct={warehouseProduct}
											setWarehouseProduct={setWarehouseProduct}
										/>
									)}

									{!warehouseProduct && (
										<ProductSubscriptionButton product={product} />
									)}

									<ProductDescriptions product={product} />
								</Stack>
							</Grid>
						</Grid>
					</Container>

					<ContainerTitle center title="Носіть разом" description="Об'єднайте стиль та знайдіть ідеальний образ" />
					<Container maxWidth='lg' disableGutters>
						<CarouselProducts products={similarProducts} />
					</Container>

					<ContainerTitle center title="Схожі товари" description="Знайдіть схожий стиль та оберіть ідеальний варіант" />
					<Container maxWidth='lg' disableGutters>
						<CarouselProducts products={similarProducts} />
					</Container>
				</m.div>
			</MotionContainer>
		</Stack>
	);
}
