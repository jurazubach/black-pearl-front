'use client';

import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Link from '@mui/material/Link';
import Scrollbar from 'src/components/scrollbar';
import { usePathname } from 'src/routes/hooks';
import { NavSectionVertical } from 'src/components/nav-section';
import { RouterLink } from 'src/routes/components';
import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const pathname = usePathname();
  const navData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Link component={RouterLink} href="/admin" sx={{ display: 'contents' }}>
        <Box
          component="img"
          src="/assets/logo/text-transparent.png"
          sx={{ width: '230px', cursor: 'pointer', mx: 3, my: 2 }}
        />
      </Link>

      <NavSectionVertical data={navData} config={{ currentRole: 'admin' }} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { lg: 0 } }}
    >
      <Drawer
        open={openNav}
        onClose={onCloseNav}
        PaperProps={{ sx: { width: NAV.W_VERTICAL } }}
      >
        {renderContent}
      </Drawer>
    </Box>
  );
}
