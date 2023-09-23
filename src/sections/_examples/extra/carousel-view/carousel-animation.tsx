import { m } from 'framer-motion';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { bgGradient } from 'src/theme/css';
import Image from 'src/components/image';
import { MotionContainer, varFade } from 'src/components/animate';
import Carousel, { CarouselArrowIndex, useCarousel } from 'src/components/carousel';

type Props = {
  data: {
    id: string;
    title: string;
    coverUrl: string;
    description: string;
  }[];
};

export default function CarouselAnimation({ data }: Props) {
  const carousel = useCarousel({ speed: 800, autoplay: true });

  return (
    <Box sx={{ position: 'relative' }}>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {data.map((item, index) => (
          <CarouselItem key={item.id} item={item} active={index === carousel.currentIndex} />
        ))}
      </Carousel>

      <CarouselArrowIndex
        index={carousel.currentIndex}
        total={data.length}
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      />
    </Box>
  );
}

type CarouselItemProps = {
  item: {
    title: string;
    description: string;
    coverUrl: string;
  };
  active: boolean;
};

function CarouselItem({ item, active }: CarouselItemProps) {
  const theme = useTheme();
  const { coverUrl, title } = item;

  return (
    <Box sx={{ position: 'relative', maxHeight: { xs: 'calc(100vh - 115px)', sm: 'calc(100vh - 140px)'} }}>
      <Image dir="ltr" alt={title} src={coverUrl} ratio="16/9" />

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
        <m.div variants={varFade().inRight}>
          <Typography variant="h6" gutterBottom>
            {item.title}
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Typography variant="body2" color="grey.300" noWrap gutterBottom>
            {item.description}
          </Typography>
        </m.div>

        <m.div variants={varFade().inRight}>
          <Button color="primary" variant="contained" sx={{ mt: { xs: 1, sm: 3 } }}>
            Переглянути
          </Button>
        </m.div>
      </Box>
    </Box>
  );
}
