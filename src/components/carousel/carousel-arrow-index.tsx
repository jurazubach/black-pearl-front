import { styled, Theme, SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { bgBlur } from 'src/theme/css';
import { IconifyProps } from '../iconify';
import { LeftIcon, RightIcon } from './arrow-icons';

const StyledRoot = styled(Box)(({ theme }) => ({
  ...bgBlur({
    opacity: 0.48,
    color: theme.palette.grey[900],
  }),
  zIndex: 9,
  display: 'inline-flex',
  alignItems: 'center',
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  padding: theme.spacing(0.25),
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
}));

const StyledIconButton = styled(IconButton)({
  width: 28,
  height: 28,
  padding: 0,
  opacity: 0.48,
  '&:hover': { opacity: 1 },
});

type Props = {
  index: number;
  total: number;
  icon?: IconifyProps; // Right icon
  onNext?: VoidFunction;
  onPrev?: VoidFunction;
  sx?: SxProps<Theme>;
};

export default function CarouselArrowIndex({
  index,
  total,
  onNext,
  onPrev,
  icon,
  sx,
  ...other
}: Props) {
  return (
    <StyledRoot sx={sx} {...other}>
      <StyledIconButton color="primary" onClick={onPrev}>
        <LeftIcon icon={icon} />
      </StyledIconButton>

      <Typography color="primary" variant="subtitle1" component="span" sx={{ mx: 0.25 }}>
        {index + 1} / {total}
      </Typography>

      <StyledIconButton color="primary" onClick={onNext}>
        <RightIcon icon={icon} />
      </StyledIconButton>
    </StyledRoot>
  );
}
