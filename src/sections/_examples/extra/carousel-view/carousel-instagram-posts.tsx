import Box from '@mui/material/Box';
import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Carousel, { CarouselArrows, CarouselDots, useCarousel } from 'src/components/carousel';
import { useWidth } from 'src/hooks/use-responsive';
import Image from 'src/components/image';
import BorderCard from 'src/components/border-card';

type Props = {
  posts: {
    id: number;
    description: string;
    imageSrc: string;
  }[];
};

const slidesToShowByBreakPoints = { 'xs': 1, 'sm': 2, 'md': 3, 'lg': 4, 'xl': 4 };

export default function CarouselInstagramPosts({ posts }: Props) {
  const theme = useTheme();
  const breakpoints = useWidth();
  const carousel = useCarousel({
    speed: 500,
    infinite: true,
    centerMode: true,
    variableWidth: true,
    swipe: true,
    swipeToSlide: true,
    centerPadding: theme.spacing(0),
    slidesToShow: slidesToShowByBreakPoints[breakpoints],
    ...CarouselDots({ rounded: true, sx: { pt: 3, pb: 2 } }),
  });

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', my: 1, }}>
      <CarouselArrows filled icon="ic:outline-keyboard-double-arrow-right" onNext={carousel.onNext} onPrev={carousel.onPrev}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {posts.map((post) => (
            <BorderCard key={post.id} sx={{
              width: '320px !important',
              height: '320px',
              position: 'relative',
              '&:hover .MuiBox-root[data-attr="description"]': { display: 'flex', opacity: 1 },
              '&:hover .component-image.MuiBox-root': { transform: 'scale(1.1)' },
            }}>
              <Box data-attr='description' sx={{
                position: 'absolute',
                zIndex: 1,
                padding: 3,
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                backgroundColor: alpha(theme.palette.background.default, 0.5),
                display: 'none',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Typography variant='caption' textAlign='center'>{post.description}</Typography>
              </Box>
              <Box sx={{ overflow: 'hidden', height: '300px', width: '300px' }}>
                <Image
                  key={post.id}
                  src={post.imageSrc}
                  disabledEffect
                  decoding='async'
                  loading='lazy'
                  sx={{
                    transition: 'all .2s ease-in',
                    width: '300px',
                    height: '300px',
                    minHeight: '300px',
                    cursor: 'pointer',
                  }}
                />
              </Box>
            </BorderCard>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}
