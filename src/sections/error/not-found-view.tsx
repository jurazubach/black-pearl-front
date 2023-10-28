'use client';

import { m } from 'framer-motion';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import { usePathname } from 'next/navigation';
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varBounce, varFade } from 'src/components/animate';
import { PageNotFoundIllustration } from 'src/assets/illustrations';
import { PATH_PAGE } from 'src/routes/paths';

export default function NotFoundView() {
  const pathname = usePathname();
  const isAdmin = String(pathname).includes(PATH_PAGE.admin.root);

  return (
    <MotionContainer>
      <m.div variants={varFade().in}>
        <Stack
          sx={{
            py: 3,
            height: '100%',
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
                Вибачте, але сторінка, яку ви шукаєте, не існує або більше не доступна. Повертайтеся на головну сторінку та продовжуйте покупки на NVRMORE!
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

            <Button
              color="primary"
              component={RouterLink}
              href={isAdmin ? PATH_PAGE.admin.dashboard : PATH_PAGE.home}
              size="large"
              variant="contained"
            >
              Повернутися на головну сторінку
            </Button>
          </MotionContainer>
        </Stack>
      </m.div>
    </MotionContainer>
  );
}
