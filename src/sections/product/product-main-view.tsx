'use client';

import { useScroll } from 'framer-motion';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';
import _first from 'lodash/first';
import ScrollProgress from 'src/components/scroll-progress';
import CarouselProducts from 'src/sections/_examples/extra/carousel-view/carousel-products';
import MainLayout from 'src/layouts/main';
import ContainerTitle from 'src/components/container-title';
import ProductPrices from 'src/components/product-prices';
import { IProductItem, IProductItemCatalog } from 'src/types/product';
import { IWarehouseProductItemCatalog } from 'src/types/warehouseProduct';
import ProductDescriptions from './product-descriptions';
import ProductBuyActions from './product-buy-actions';
import ProductInfo from './product-info';
import ProductGallery from './product-gallery';
import ProductSubscriptionButton from './product-subscription-button';

interface Props {
	product: IProductItem;
	similarProducts: IProductItemCatalog[];
}

export default function ProductMainView({ product, similarProducts }: Props) {
	const { scrollYProgress } = useScroll();
	const { warehouseProducts } = product;

	const firstWarehouseProduct = _first(warehouseProducts);
	const [warehouseProduct, setWarehouseProduct] = useState<IWarehouseProductItemCatalog | null>(
		firstWarehouseProduct || null
	);

	return (
		<MainLayout>
			<ScrollProgress scrollYProgress={scrollYProgress} />

			<Container maxWidth='lg' sx={{ p: { xs: 2, sm: 3, lg: 0 }, m: 0 }} disableGutters>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<ProductGallery />
					</Grid>
					<Grid item xs={12} sm={6}>
						<Stack spacing={3}>
							<ProductInfo product={product} warehouseProduct={warehouseProduct} />

							{warehouseProduct && (
								<ProductPrices oldPrice={warehouseProduct.oldPrice} price={warehouseProduct.price} />
							)}

							<Box sx={{ display: { xs: 'block', sm: 'none' } }}>
								<ProductDescriptions product={product} />
							</Box>

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

							<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
								<ProductDescriptions product={product} />
							</Box>
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
		</MainLayout>
	);
}
