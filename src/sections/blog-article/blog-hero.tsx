import React from 'react';
import Box from '@mui/material/Box';

const BlogHero = () => (
    <Box
      sx={{
        height: { xs: 'calc(100vh - 105px)', sm: 560 },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'url(/assets/images/about/hero_main.png)',
      }}
    />
  )

export default BlogHero;
