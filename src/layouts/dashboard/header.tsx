import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { bgBlur } from 'src/theme/css';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import SvgColor from 'src/components/svg-color';
import { HEADER } from '../config-layout';
import { Searchbar } from '../_common';
import AccountPopover from '../_common/account-popover';
import { RouterLink } from '../../routes/components';

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();
  const lgUp = useResponsive('up', 'lg');
  const offset = useOffSetTop(HEADER.H_DESKTOP);

  const renderContent = (
    <>
      <IconButton onClick={onOpenNav}>
        <SvgColor src="/assets/icons/navbar/ic_menu_item.svg" />
      </IconButton>

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={3}
      >
        <Link component={RouterLink} href='/'>
          <Typography>Перейти до магазину</Typography>
        </Link>

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({ color: theme.palette.background.default }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          height: HEADER.H_DESKTOP,
          ...(offset && {
            height: HEADER.H_DESKTOP_OFFSET,
          }),
        }),
      }}
    >
      <Container maxWidth='lg' disableGutters>
        <Toolbar sx={{ height: 1, px: { lg: 5 } }}>
          {renderContent}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
