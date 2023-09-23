import Box from '@mui/material/Box';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Image from 'src/components/image';
import { useWidth } from 'src/hooks/use-responsive';
import Carousel, { CarouselArrows, CarouselDots, useCarousel } from 'src/components/carousel';
import BorderCard from 'src/components/border-card';

type Props = {
  posts: {
    id: number;
    imageSrc: string;
    title: string;
    date: string;
  }[];
};

const slidesToShowByBreakPoints = { 'xs': 1, 'sm': 2, 'md': 3, 'lg': 4, 'xl': 5 };

export default function CarouselPosts({ posts }: Props) {
  const theme = useTheme();
  const breakpoints = useWidth();
  const carousel = useCarousel({
    speed: 500,
    infinite: true,
    centerPadding: theme.spacing(0),
    slidesToShow: slidesToShowByBreakPoints[breakpoints],
    ...CarouselDots({ rounded: true, sx: { pt: 3, pb: 2 } }),
  });

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', my: 1 }}>
      <CarouselArrows filled icon="noto:backhand-index-pointing-right" onNext={carousel.onNext} onPrev={carousel.onPrev}>
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {posts.map((post) => (
            <BorderCard key={post.id} sx={{
              width: 'unset !important',
              '&:hover .MuiLink-root[data-attr="link"]': { color: theme.palette.grey[100] },
              '&:hover .component-image.MuiBox-root': { transform: 'scale(1.1)', opacity: 1 },
            }}>
              <Box sx={{ overflow: 'hidden', height: '300px' }}>
                <Image
                  key={post.id}
                  src={post.imageSrc}
                  disabledEffect
                  decoding='async'
                  loading='lazy'
                  sx={{ transition: 'all .2s ease-in' }}
                />
              </Box>
              <Stack direction="row" spacing={2} sx={{ p: 1 }}>
                <Stack alignItems='center'>
                  <Typography color='primary' variant="h2">20</Typography>
                  <Typography color='grey.300' variant="subtitle2">грудня</Typography>
                  <Typography color='grey.300' variant="subtitle2">2023</Typography>
                </Stack>

                <Link underline='hover' variant='h5' sx={{
                  mt: 1,
                  color: 'grey.300',
                  fontWeight: 'bold',
                  userSelect: 'none',
                  transition: 'all 0.2s ease-in',
                  overflow: 'hidden',
                  whiteSpace: 'normal',
                  textOverflow: 'ellipsis',
                }} component={NextLink} href='/' data-attr="link">
                  {post.title}
                </Link>
              </Stack>
            </BorderCard>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}
