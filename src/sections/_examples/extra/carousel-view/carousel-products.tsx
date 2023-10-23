import Box from '@mui/material/Box';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Carousel, { CarouselArrows, CarouselDots, useCarousel } from 'src/components/carousel';
import { useWidth } from 'src/hooks/use-responsive';
import CardProduct from 'src/components/card-product/catalog';
import { IProductItemCatalog } from 'src/types/product';

type Props = {
  products: IProductItemCatalog[];
};

const slidesToShowByBreakPoints = { 'xs': 1, 'sm': 2, 'md': 3, 'lg': 4, 'xl': 4 };

export default function CarouselProducts({ products }: Props) {
  const theme = useTheme();
  const breakpoints = useWidth();
  const carousel = useCarousel({
    speed: 500,
    infinite: true,
    centerMode: true,
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
          {products.map((product, idx) => (
            <CardProduct key={product.id} idx={idx} product={product} />
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}
