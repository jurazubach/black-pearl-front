import Box from '@mui/material/Box';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useWidth } from 'src/hooks/use-responsive';
import Carousel, { CarouselArrows, CarouselDots, useCarousel } from 'src/components/carousel';
import CardPost from 'src/components/card-post';
import { IArticleItem } from 'src/types/article';

type Props = {
	blogPosts: IArticleItem[];
};

const slidesToShowByBreakPoints = { 'xs': 1, 'sm': 2, 'md': 3, 'lg': 4, 'xl': 4 };

export default function CarouselPosts({ blogPosts }: Props) {
	const theme = useTheme();
	const breakpoints = useWidth();
	const carousel = useCarousel({
		speed: 500,
		infinite: true,
		centerPadding: theme.spacing(0),
		swipe: true,
		swipeToSlide: true,
		slidesToShow: slidesToShowByBreakPoints[breakpoints],
		...CarouselDots({ rounded: true, sx: { pt: 3, pb: 2 } }),
	});

	return (
		<Box sx={{ position: 'relative', overflow: 'hidden', my: 1 }}>
			<CarouselArrows filled onNext={carousel.onNext} onPrev={carousel.onPrev}>
				<Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
					{blogPosts.map((blogPost) => (<CardPost key={blogPost.id} blogPost={blogPost} />))}
				</Carousel>
			</CarouselArrows>
		</Box>
	);
}
