import Box from '@mui/material/Box';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Image from 'src/components/image';
import { useWidth } from 'src/hooks/use-responsive';
import Carousel, { CarouselDots, useCarousel } from 'src/components/carousel';
import BorderCard from 'src/components/border-card';

type Props = {
  members: {
    title: string;
    position: string;
    imageSrc: string;
  }[];
};

const slidesToShowByBreakPoints = { 'xs': 1, 'sm': 2, 'md': 3, 'lg': 3, 'xl': 3 };

export default function CarouselAboutTeam({ members }: Props) {
  const theme = useTheme();
  const breakpoints = useWidth();
  const carousel = useCarousel({
    speed: 500,
    infinite: true,
    centerMode: true,
    centerPadding: theme.spacing(0),
    variableWidth: true,
    swipe: true,
    swipeToSlide: true,
    slidesToShow: slidesToShowByBreakPoints[breakpoints],
    ...CarouselDots({ rounded: true, sx: { pt: 3, pb: 2 } }),
  });

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', my: 1, maxWidth: { xs: '100vw', sm: '1074px' } }}>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {members.map(({ title, position, imageSrc }) => (
          <BorderCard key={title} sx={{
            p: 3,
            width: 'unset !important',
            '&:hover .component-image.MuiBox-root': { transform: 'scale(1.1)' },
          }}>
            <Stack direction='row' spacing={1} sx={{ mb: 2.5 }} alignItems='flex-end'>
              <Typography variant="h5">
                {title}
              </Typography>

              <Typography variant="body2" color='primary'>
                {position}
              </Typography>
            </Stack>

            <Box sx={{ overflow: 'hidden', maxHeight: '370px', width: { xs: 'calc(100vw - 96px)', sm: '300px' }, }}>
              <Image
                alt={title}
                src={`/assets/images/about/${imageSrc}`}
                disabledEffect
                decoding='async'
                loading='lazy'
                sx={{ transition: 'all .2s ease-in' }}
              />
            </Box>
          </BorderCard>
        ))}
      </Carousel>
    </Box>
  );
}
