import Box from '@mui/material/Box';
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useWidth } from 'src/hooks/use-responsive';
import Carousel, { CarouselDots, useCarousel } from 'src/components/carousel';
import SvgColor from 'src/components/svg-color';

type Props = {
  features: {
    alias: string;
    icon: string;
    title: string;
    description: string;
  }[];
};

const slidesToShowByBreakPoints = { 'xs': 1, 'sm': 2, 'md': 3, 'lg': 3, 'xl': 3 };

const StyledProductCardRoot = styled(Stack)(({ theme }) => ({
    margin: '0 8px',
    width: 'unset !important',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.grey[800],
  }));

export default function CarouselMainFeatures({ features }: Props) {
  const theme = useTheme();
  const breakpoints = useWidth();
  const carousel = useCarousel({
    speed: 800,
    infinite: true,
    centerPadding: theme.spacing(0),
    slidesToShow: slidesToShowByBreakPoints[breakpoints],
    ...CarouselDots({ rounded: true, sx: { py: 3 } }),
  });

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', mt: 3 }}>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {features.map((feature) => (
          <StyledProductCardRoot key={feature.alias} spacing={2}>
            <Stack direction='row' spacing={1} justifyContent='center'>
              <Box sx={{ minWidth: { xs: theme.spacing(4), sm: theme.spacing(3) } }}>
                <SvgColor src={feature.icon} sx={{
                  width: { xs: theme.spacing(3), sm: theme.spacing(3) },
                  height: { xs: theme.spacing(3), sm: theme.spacing(3) },
                }} />
              </Box>
              <Typography variant='subtitle1'>{feature.title}</Typography>
            </Stack>
            <Typography variant='body2' textAlign='center'>{feature.description}</Typography>
          </StyledProductCardRoot>
        ))}
      </Carousel>
    </Box>
  );
}
