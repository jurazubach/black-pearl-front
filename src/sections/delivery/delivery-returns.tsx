import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useResponsive } from 'src/hooks/use-responsive';
import Image from 'src/components/image';
import ContainerTitle from 'src/components/container-title';

export default function DeliveryReturns() {
  const mdUp = useResponsive('up', 'md');

  return (
    <Box sx={{ bgcolor: 'grey.800' }}>
      <ContainerTitle center title="Повернення товару" />

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
            <Stack spacing={6}>
              <Stack spacing={2}>
                <Typography variant="h6">
                  Умови повернення для товарів належної якості
                </Typography>
                <Typography>
                  Шановні покупці! При отриманні товару у відділеннях служби доставки обов'язково перевіряйте цілісність упаковки та її вмісту, відсутність дефектів та пошкоджень. Якщо під час перевірки ви виявили видимі дефекти чи несправності, ви маєте право не оплачувати товар та відмовитися від його отримання.
                </Typography>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="h6">
                  Загальні умови повернення або обміну
                </Typography>
                <Typography>
                  Повернення або обмін товару здійснюється протягом 14 днів з моменту покупки (не враховуючи день покупки); товар не підійшов за кольором, формою, розмірами або іншими характеристиками; товар має механічні пошкодження, несправності, пошкоджену упаковку чи шлюб із вини виробника чи служби доставки; повернення/обмін товару належної якості можливе лише за умови, якщо товар не використовувався, збережено всі споживчі якості та товарний вигляд, має повну комплектацію, не порушено цілісність виробу, присутні всі ярлики, пломби, а також наявність розрахункової накладної, отриманої разом із товаром.
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
