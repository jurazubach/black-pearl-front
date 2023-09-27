import { m, MotionProps } from 'framer-motion';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MotionContainer, varFade } from 'src/components/animate';

export default function AboutHero() {
  return (
    <Box
      sx={{
        height: { xs: 'calc(100vh - 105px)', sm: 560 },
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'url(/assets/images/about/hero_main.png)',
      }}
    >
      <Container maxWidth='lg' component={MotionContainer}>
        <Box
          sx={{
            height: { xs: 'calc(100vh - 105px)', sm: 560 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack spacing={1} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
            <TextAnimate sx={{ typography: 'h4' }} text="Ласкаво" variants={varFade().inRight} />
            <TextAnimate sx={{ typography: 'h4' }} text="просимо" variants={varFade().inRight} />
            <TextAnimate sx={{ typography: 'h4' }} text="у" variants={varFade().inRight} />
            <TextAnimate sx={{ typography: 'h4' }} text="світ" variants={varFade().inRight} />
          </Stack>

          <Stack spacing={1} display="inline-flex" direction="row" sx={{ color: 'primary.main' }}>
            <TextAnimate text="The" variants={varFade().inRight} />
            <TextAnimate text="Black" variants={varFade().inRight} />
            <TextAnimate text="Pearl" variants={varFade().inRight} />
          </Stack>

          <m.div variants={varFade().inUp}>
            <Typography variant="h6" sx={{ mt: 2, textAlign: 'center', color: 'common.white' }}>
              Унікального бренду, де розкіш зустрічається з індивідуальністю.
              <br />Ми з гордістю створюємо чудові речі класу люкс, уособлюючи стиль, якість та витонченість.
            </Typography>
          </m.div>
        </Box>
      </Container>
    </Box>
  );
}

type TextAnimateProps = BoxProps &
  MotionProps & {
    text: string;
  };

function TextAnimate({ text, variants, sx, ...other }: TextAnimateProps) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h3',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}
