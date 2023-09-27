import Card, { CardProps } from '@mui/material/Card';
import { CarouselDots, CarouselArrows, useCarousel } from 'src/components/carousel';

type ItemProps = {
  id: string;
  title: string;
  coverUrl: string;
  description: string;
};

interface Props extends CardProps {
  list: ItemProps[];
}

export default function AppFeatured({ list, ...other }: Props) {
  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
    ...CarouselDots({
      sx: {
        top: 16,
        left: 16,
        position: 'absolute',
        color: 'primary.light',
      },
    }),
  });

  return (
    <Card {...other}>
      <CarouselArrows
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        sx={{ top: 8, right: 8, position: 'absolute', color: 'common.white' }}
      />
    </Card>
  );
}
