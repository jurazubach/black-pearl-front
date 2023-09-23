import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useResponsive } from 'src/hooks/use-responsive';
import Image from 'src/components/image';
import ContainerTitle from 'src/components/container-title';

export default function DeliveryTypes() {
  const mdUp = useResponsive('up', 'md');

  return (
    <Box>
      <ContainerTitle center title='Доставка і оплата' />
      <Container
        maxWidth='xl'
        sx={{
          py: 6,
          textAlign: { xs: 'center', md: 'unset' },
        }}
      >
        <Grid container columnSpacing={{ md: 6 }} alignItems="flex-start">
          {mdUp && (
            <Grid xs={7}>
              <Stack spacing={2}>
                <Typography variant="h6">
                  Доставка при повній передплаті
                </Typography>
                <Typography>
                  Доставка товару по Україні здійснюється транспортними компаніями Нова Пошта та Укрпошта. В середньому вартість доставки від 55 гривень на склад перевізника у Вашому місті. Після оплати комплектація замовлення та відправка здійснюється протягом 1-5 днів СПОСОБИ ОПЛАТИ ПРИВАТ24, НА КАРТУ ПРИВАТБАНКУ, Розрахунковий рахунок, LIQPAY
                </Typography>
              </Stack>

              <Stack spacing={2} mt={6}>
                <Typography variant="h6">
                  Доставка с післяплатою
                </Typography>
                <Typography>
                  Доставка здійснюється транспортною компанією "Нова пошта" після мінімальної передоплати 100 грн, які будуть відняті із загальної суми товару. Доставка та комісія за пересилання грошей за рахунок покупця. Важливо! Перевіряйте товар відразу при отриманні у відділенні Нової Пошти в присутності працівника компанії. При виявленні пошкодження упакування чи механічних пошкоджень товару ви можете відмовитися від замовлення чи виставити претензію службі доставки Нова Пошта. Сума замовлення вказується без врахування ціни доставки
                </Typography>
              </Stack>
            </Grid>
          )}

          <Grid container xs={5} alignItems="center">
            <Grid xs={12}>
              <Image sx={{ borderRadius: '8px', maxHeight: '380px' }} alt="our mission" src="/assets/images/about/mission.png" />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
