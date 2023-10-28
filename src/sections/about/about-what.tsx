import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'src/components/image';
import ContainerTitle from 'src/components/container-title';

export default function AboutWhat() {
  return (
    <Box>
      <ContainerTitle center title="Наша місія" />
      <Container maxWidth='lg' sx={{ py: 3, textAlign: { xs: 'center', md: 'unset' } }}>
        <Grid container columnSpacing={6} rowSpacing={3} alignItems="flex-start" sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}>
          <Grid xs={12} md={7}>
            <Typography>
              NVRMORE – це не просто назва, це символ нашої прихильності до глибоких цінностей та філософії. Чорний колір у наших виробах втілює в собі елегантність, міць та загадковість. А перлина – символ вишуканості та неповторності, що підкреслює унікальність кожного виробу, як перлини в океані.
              <br /><br />Наші витоки сягають давнини, коли майстерність і творчість були неподільною частиною життя. Сьогодні NVRMORE надихається цими традиціями, надаючи їм сучасної інтерпретації. Кожен виріб, створений нашими досвідченими руками, – це витвір мистецтва, що втілює в собі унікальність та увагу до деталей.
              <br /><br />Ми пишаємося не лише якістю наших виробів, а й цінностями, які вони відображають. NVRMORE – це вираз індивідуальності, впевненості та пристрасті до життя. Ми прагнемо зробити кожне ваше вбрання особливим, допомагаючи вам висловити свій стиль та елегантність.
              <br /><br />Наші творчі майстри та дизайнери віддані ідеалу досконалості, а наші клієнти – нашій сім'ї, що надихає. Ми дякуємо вам за вибір NVRMORE і сподіваємося, що кожен виріб, створений нами, принесе вам радість та задоволення.
            </Typography>
          </Grid>

          <Grid xs={12} md={5} alignItems="center">
            <Image sx={{ borderRadius: '8px', maxHeight: '380px' }} alt="our mission" src="/assets/images/about/mission.png" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
