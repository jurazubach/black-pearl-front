import { forwardRef } from 'react';
import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
import { RouterLink } from 'src/routes/components';

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  src?: string;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const logo = (
      <Box
        component="img"
        src="/assets/logo/logo-transparent.png"
        sx={{ width: 64, height: 64, cursor: 'pointer', ...sx }}
        {...other}
      />
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
