'use client';

import { m } from 'framer-motion';
// @mui
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// layouts
import Stack from "@mui/material/Stack";
import MainLayout from 'src/layouts/main';
// routes
import { RouterLink } from 'src/routes/components';
// components
import { MotionContainer, varBounce } from 'src/components/animate';
// assets
import { PageNotFoundIllustration } from 'src/assets/illustrations';

// ----------------------------------------------------------------------

export default function NotFoundView() {
  return (
    <MainLayout>
      <Stack
        sx={{
          py: 6,
          m: 'auto',
          maxWidth: '768px',
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        <MotionContainer>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Вибачте, але сторінку не знайденно!
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: 'text.secondary' }}>
              Вибачте, але сторінка, яку ви шукаєте, не існує або більше не доступна. Повертайтеся на головну сторінку та продовжуйте покупки на The Black Pearl!
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <PageNotFoundIllustration
              sx={{
                height: 260,
                my: { xs: 5, sm: 10 },
              }}
            />
          </m.div>

          <Button color="primary" component={RouterLink} href="/" size="large" variant="contained">
            Повернутися на головну сторінку
          </Button>
        </MotionContainer>
      </Stack>
    </MainLayout>
  );
}
