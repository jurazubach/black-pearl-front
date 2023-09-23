import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useResponsive } from 'src/hooks/use-responsive';
import Image from 'src/components/image';
import ContainerTitle from 'src/components/container-title';

export default function AboutFeatures() {
  const mdUp = useResponsive('up', 'md');

  return (
    <Box sx={{ bgcolor: 'grey.800' }}>
      <ContainerTitle center title="У чому наша унікальність" />

      <Container
        maxWidth='xl'
        sx={{ py: 6, textAlign: { xs: 'center', md: 'unset' } }}
      >
        <Grid container columnSpacing={{ md: 6 }} alignItems="flex-start">
          {mdUp && (
            <Grid container xs={5} alignItems="center">
              <Grid xs={12}>
                <Image sx={{ borderRadius: '8px' }} alt="our mission" src="/assets/images/about/features.png" />
              </Grid>
            </Grid>
          )}

          <Grid xs={7}>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography variant='h6'>Елегантні форми та дизайн</Typography>
                <Typography>
                  Ми поєднуємо розкіш з елегантністю в кожному дизайні. Наші вироби не просто одяг - це втілення вишуканості та стилю. Ми докладаємо особливу увагу до деталей, створюючи речі, які виражають ваш вишуканий смак та неперевершеність.
                </Typography>
              </Stack>

              <Stack spacing={1}>
                <Typography variant='h6'>Розкіш у кожній деталі</Typography>
                <Typography>
                  Наш бренд втілює справжню розкіш у кожному виробі. Кожен шов, кожна строчка та кожна деталь наших виробів втілені з міцною вірою в вишуканість. Ми завжди створюємо вироби, які відзначаються бездоганністю та вишуканістю, надаючи вам можливість відчути себе особливим.
                </Typography>
              </Stack>

              <Stack spacing={1}>
                <Typography variant='h6'>Висока якість та витонченість</Typography>
                <Typography>
                  Наш бренд завжди прагне до найвищих стандартів якості та витонченості. Ми обираємо лише найкращі матеріали та використовуємо найсучасніші технології для створення виробів, які радують вас своєю довговічністю та стильністю.
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
