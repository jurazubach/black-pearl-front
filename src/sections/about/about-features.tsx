import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import React from 'react';
import Image from 'src/components/image';
import ContainerTitle from 'src/components/container-title';

const AboutFeatures = () => (
    <Box sx={{ bgcolor: 'grey.800' }}>
      <ContainerTitle center title="У чому наша унікальність" />
      <Container maxWidth='lg' sx={{ py: 3, textAlign: { xs: 'center', md: 'unset' } }}>
        <Grid container columnSpacing={6} rowSpacing={3} alignItems="flex-start" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
          <Grid xs={12} md={5} alignItems="center">
            <Image sx={{ borderRadius: '8px', maxHeight: '380px' }} alt="our mission" src="/assets/images/about/features.png" />
          </Grid>

          <Grid xs={12} md={7}>
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
  )

export default AboutFeatures;

