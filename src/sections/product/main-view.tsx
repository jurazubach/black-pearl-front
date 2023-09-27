'use client';

import { useScroll } from 'framer-motion';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import _first from 'lodash/first';
import React from 'react';
import ScrollProgress from 'src/components/scroll-progress';
import CarouselProducts from 'src/sections/_examples/extra/carousel-view/carousel-products';
import MainLayout from 'src/layouts/main';
import ContainerTitle from 'src/components/container-title';
import ProductPrices from 'src/components/product-prices';
import { useResponsive } from 'src/hooks/use-responsive';
import ProductDescriptions from './product-descriptions';
import ProductActions from './product-actions';
import ProductInfo from './product-info';
import ProductGallery from './product-gallery';

interface Props {
	product: any;
}

const products = [
	{
		id: 5,
		title: 'Спортивний костюм з тринитки молочний жіночий',
		description: 'Гарний та стильний костюм який зігріє тебе в прохолодну погоду. Зручний крій робить дану модель ідеальною для повсякденних справ та активного відпочинку. Костюм виготовлено з якісної тканини яка не кашлатиться та не втрачає колір навіть після багаторазового прання. Поповни свій гардероб яскравою новинкою.',
	},
	{
		id: 7,
		title: 'Спортивний костюм з тринитки малахіт жіночий',
		description: 'Гарний та стильний костюм який зігріє тебе в прохолодну погоду. Зручний крій робить дану модель ідеальною для повсякденних справ та активного відпочинку. Костюм виготовлено з якісної тканини яка не кашлатиться та не втрачає колір навіть після багаторазового прання. Поповни свій гардероб яскравою новинкою.',
	},
	{
		id: 9,
		title: 'Футболка базова аквамарин',
		description: 'Аквамарин однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб. Коли потрібно щоб було комфортно та стильно - обирай базову футболку та доповнюй стильними джинсами, шортами або спідницею.',
	},
	{
		id: 11,
		title: 'Футболка базова бежева',
		description: 'Жовта однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб. Коли потрібно щоб було комфортно та стильно - обирай базову футболку та доповнюй стильними джинсами, шортами або спідницею.',
	},
	{
		id: 14,
		title: 'Футболка базова бежева',
		description: 'Жовта однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб. Коли потрібно щоб було комфортно та стильно - обирай базову футболку та доповнюй стильними джинсами, шортами або спідницею.',
	},
];

export default function MainView({ product }: Props) {
	const smUp = useResponsive('up', 'sm');
	const { scrollYProgress } = useScroll();
	const goods = product.goods || [];
	const defaultGoods: any = Array.isArray(goods) && goods.length > 0 ? _first(goods || []) : { oldPrice: 0, price: 0 };

	return (
		<MainLayout>
			<ScrollProgress scrollYProgress={scrollYProgress} />

			<Container maxWidth='lg' sx={{ p: { xs: 2, sm: 3, lg: 0 }, my: { xs: 2, sm: 3 } }} disableGutters>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<ProductGallery />
					</Grid>
					<Grid item xs={12} sm={6}>
						<Stack spacing={3}>
							<ProductInfo product={product} />
							<ProductPrices oldPrice={defaultGoods.oldPrice} price={defaultGoods.price} />
							{smUp && (<ProductDescriptions product={product} />)}
							<ProductActions product={product} />
							{!smUp && (<ProductDescriptions product={product} />)}
						</Stack>
					</Grid>
				</Grid>
			</Container>

			<ContainerTitle center title="Носіть разом" description="Об'єднайте стиль та знайдіть ідеальний образ" />
			<Container maxWidth='lg' disableGutters>
				<CarouselProducts products={products} />
			</Container>

			<ContainerTitle center title="Схожі товари" description="Знайдіть схожий стиль та оберіть ідеальний варіант" />
			<Container maxWidth='lg' disableGutters>
				<CarouselProducts products={products} />
			</Container>
		</MainLayout>
	);
}
