import { Breakpoint } from '@mui/material';

type Breakpoints = {
  values: { [key in Breakpoint]: number };
};

const breakpoints: Breakpoints = {
  values: {
    xs: 0,
    sm: 768,
    md: 1280,
    lg: 1920,
    xl: 2560,
  },
};

export default breakpoints;
