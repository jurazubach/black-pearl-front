import Box from '@mui/material/Box';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Carousel, { CarouselArrows, CarouselDots, useCarousel } from 'src/components/carousel';
import Image from 'src/components/image';

type Props = {
	images?: string[];
};

export default function CarouselProductImages({ images = [] }: Props) {
	const theme = useTheme();
	const carousel = useCarousel({
		speed: 500,
		infinite: true,
		centerPadding: theme.spacing(0),
		swipe: true,
		swipeToSlide: true,
		slidesToShow: 1,
		...CarouselDots({ rounded: true, sx: { pt: 3 } }),
	});

	return (
		<Box sx={{ position: 'relative', overflow: 'hidden' }}>
			<CarouselArrows filled onNext={carousel.onNext} onPrev={carousel.onPrev}>
				<Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
					{images.map((imageSrc: string) => (
						<Box sx={{ overflow: 'hidden', height: { xs: '450px', sm: '761px' } }}>
							<Image
								disabledEffect
								decoding='async'
								loading='lazy'
								src={imageSrc}
								sx={{ transition: 'all .2s ease-in', height: '100%', width: '100%' }}
							/>
						</Box>
					))}
				</Carousel>
			</CarouselArrows>
		</Box>
	);
}
