'use client';

import { m, useScroll } from 'framer-motion';
import Container from '@mui/material/Container';
import ScrollProgress from 'src/components/scroll-progress';
import ContainerTitle from 'src/components/container-title';
import CarouselBanners from 'src/sections/_examples/extra/carousel-view/carousel-banners';
import CarouselProducts from 'src/sections/_examples/extra/carousel-view/carousel-products';
import CarouselPosts from 'src/sections/_examples/extra/carousel-view/carousel-posts';
import CarouselInstagramPosts from 'src/sections/_examples/extra/carousel-view/carousel-instagram-posts';
import { IBannerItem } from 'src/types/banner';
import { IProductItemCatalog } from 'src/types/product';
import { ISocialItem } from 'src/types/social';
import { IArticleItem } from 'src/types/article';
import { MotionContainer, varFade } from 'src/components/animate';
import AboutUs from './about-us';

interface Props {
	banners: IBannerItem[],
	popularProducts: IProductItemCatalog[],
	noveltyProducts: IProductItemCatalog[],
	instagramPosts: ISocialItem[],
	blogPosts: IArticleItem[],
}

export default function HomeView({ banners, instagramPosts, blogPosts, popularProducts, noveltyProducts }: Props) {
	const { scrollYProgress } = useScroll();

	return (
		<MotionContainer>
			<m.div variants={varFade().in}>
				<ScrollProgress scrollYProgress={scrollYProgress} />

				<Container maxWidth={false} disableGutters>
					<CarouselBanners banners={banners} />
				</Container>

				<ContainerTitle center title='Хто ми?' />
				<Container maxWidth='lg'>
					<AboutUs />
				</Container>

				{popularProducts.length > 0 && (
					<>
						<ContainerTitle center title='Популярні товари' description='Обирайте з найпопулярніших моделей' />
						<Container maxWidth='lg' disableGutters>
							<CarouselProducts products={popularProducts} />
						</Container>
					</>
				)}

				{noveltyProducts.length > 0 && (
					<>
						<ContainerTitle center title='Новинки' description='Зустрічайте останні стильні новинки' />
						<Container maxWidth='lg' disableGutters>
							<CarouselProducts products={noveltyProducts} />
						</Container>
					</>
				)}

				{blogPosts.length > 0 && (
					<>
						<ContainerTitle center title='Ми також ведемо Блог' description='Слідкуйте за модними трендами, та нашими новинками' />
						<Container maxWidth='lg' disableGutters>
							<CarouselPosts blogPosts={blogPosts} />
						</Container>
					</>
				)}

				{instagramPosts.length > 0 && (
					<>
						<ContainerTitle center title='Підписуйтесь на наш інстаграм' description='Наша офіційна сторінка @nvrmore.com.ua' />
						<Container maxWidth='lg' disableGutters>
							<CarouselInstagramPosts instagramPosts={instagramPosts} />
						</Container>
					</>
				)}
			</m.div>
		</MotionContainer>



	);
}
