import Box from '@mui/material/Box';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Carousel, { CarouselArrows, CarouselDots, useCarousel } from 'src/components/carousel';
import { useWidth } from 'src/hooks/use-responsive';
import CardProduct from 'src/components/card-product/catalog';

type Props = {
  products: {
    id: number;
    title: string;
    description: string;
  }[];
};

const slidesToShowByBreakPoints = { 'xs': 1, 'sm': 2, 'md': 3, 'lg': 4, 'xl': 5 };

export default function CarouselProducts({ products }: Props) {
  const theme = useTheme();
  const breakpoints = useWidth();
  const carousel = useCarousel({
    speed: 500,
    infinite: true,
    centerMode: true,
    centerPadding: theme.spacing(0),
    slidesToShow: slidesToShowByBreakPoints[breakpoints],
    ...CarouselDots({ rounded: true, sx: { pt: 3, pb: 2 } }),
  });

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', my: 1 }}>
      <CarouselArrows filled icon="noto:backhand-index-pointing-right" onNext={carousel.onNext} onPrev={carousel.onPrev}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {products.map((product, idx) => (
            <CardProduct key={product.id} idx={idx} product={product} />
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}