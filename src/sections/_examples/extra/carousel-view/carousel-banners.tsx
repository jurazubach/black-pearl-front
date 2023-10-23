import { m } from 'framer-motion';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React from 'react';
import Stack from '@mui/material/Stack';
import { bgGradient } from 'src/theme/css';
import Image from 'src/components/image';
import { MotionContainer, varFade } from 'src/components/animate';
import Carousel, { CarouselArrowIndex, useCarousel } from 'src/components/carousel';
import { IBannerItem } from 'src/types/banner';
import { RouterLink } from 'src/routes/components';
import { HEADER_MAIN } from 'src/layouts/config-layout';

type Props = {
  banners: IBannerItem[];
};

export default function CarouselBanners({ banners }: Props) {
  const carousel = useCarousel({ speed: 800, autoplay: false });

  return (
    <Box sx={{ position: 'relative' }}>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {banners.map((banner, index) => (
          <CarouselItem key={banner.alias} banner={banner} active={index === carousel.currentIndex} />
        ))}
      </Carousel>

      <CarouselArrowIndex
        index={carousel.currentIndex}
        total={banners.length}
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      />
    </Box>
  );
}

type CarouselItemProps = {
  banner: IBannerItem;
  active: boolean;
};

function CarouselItem({ banner, active }: CarouselItemProps) {
  const theme = useTheme();
  const { imageSrc, description, title, link } = banner;

  return (
    <Box sx={{
      position: 'relative',
      height: { xs: `calc(100vh - ${HEADER_MAIN.H_MOBILE}px)`, md: `calc(100vh - ${HEADER_MAIN.H_DESKTOP}px)` },
      maxHeight: { xs: `calc(100vh - ${HEADER_MAIN.H_MOBILE}px)`, md: `calc(100vh - ${HEADER_MAIN.H_DESKTOP}px)` }
    }}>
      <Image
        decoding='async'
        disabledEffect
        loading='lazy'
        alt={title}
        src={imageSrc}
        sx={{ height: '100%', width: '100%' }}
      />

      <Box
        sx={{
          top: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          ...bgGradient({
            direction: 'to top',
            startColor: `${theme.palette.grey[900]} 0%`,
            endColor: `${alpha(theme.palette.grey[900], 0)} 100%`,
          }),
        }}
      />

      <Box
        component={MotionContainer}
        animate={active}
        action
        sx={{
          display: { xs: 'flex', sm: 'none' },
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          left: 0,
          top: 0,
          height: '100%',
          width: '100vw',
          maxWidth: 720,
          position: 'absolute',
        }}
      >
        <Stack spacing={1} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <m.div variants={varFade().inRight}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
          </m.div>

          <m.div variants={varFade().inRight}>
            <Typography variant="body2" color="grey.300" gutterBottom>
              {description}
            </Typography>
          </m.div>
        </Stack>
      </Box>

      <Box
        component={MotionContainer}
        animate={active}
        action
        sx={{
          padding: 3,
          left: 0,
          bottom: 0,
          width: '100vw',
          maxWidth: 720,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Stack spacing={1} sx={{
          textAlign: { xs: 'center', sm: 'left' },
          display: { xs: 'none', sm: 'flex' },
        }}>
          <m.div variants={varFade().inRight}>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
          </m.div>

          <m.div variants={varFade().inRight}>
            <Typography variant="body2" color="grey.300" gutterBottom>
              {description}
            </Typography>
          </m.div>
        </Stack>

        <m.div variants={varFade().inRight}>
          <Link component={RouterLink} href={link}>
            <Button color="primary" variant="contained" sx={{ mt: { xs: 1, sm: 3 } }}>
              Переглянути
            </Button>
          </Link>
        </m.div>
      </Box>
    </Box>
  );
}
