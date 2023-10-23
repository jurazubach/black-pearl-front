import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CustomBreadcrumbsProps } from './types';
import { hideScroll } from 'src/theme/css';
import React, { useMemo } from 'react';
import Link from '@mui/material/Link';
import { RouterLink } from 'src/routes/components';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export default function CustomBreadcrumbs({ links = [], sx, ...other }: CustomBreadcrumbsProps) {
  const theme = useTheme();

  const renderLinksMemo = useMemo(() => links.map(({ name, href }) => {
    return (
      <Box component='li' key={name} sx={{
        padding: theme.spacing(0.5, 1, 0.5, 0),
        '&:not(:first-of-type)': {
          padding: theme.spacing(0.5, 1),
        },
        '&:last-of-type': {
          padding: theme.spacing(0.5, 0, 0.5, 1),
          paddingRight: { xs: 2, sm: 3 },
        },
      }}>
        {href ? (
          <Link
            component={RouterLink}
            href={href}
            sx={{ '&:hover': { textDecoration: 'none' } }}
          >
            <Typography variant='body2' component='span' sx={{
              color: theme.palette.grey[300],
              position: 'relative',
              cursor: 'pointer',
              transition: 'color .3s ease',
              '&:hover': {
                color: theme.palette.grey[100],
              },
            }}>{name}</Typography>
          </Link>
        ) : (
          <Typography variant='body2' component='span' sx={{
            color: theme.palette.grey[500],
            position: 'relative',
          }}>{name}</Typography>
        )}
      </Box>
    )
  }), [links, theme]);

  return (
    <Box sx={{
      px: { xs: 2, sm: 3 },
      py: { xs: 1, md: 2 },
      width: '100%',
      ...hideScroll.x,
      ...sx,
    }} {...other}>
      <Stack direction='row' divider={<Separator />} component='ul' sx={{
        width: '100%',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        alignItems: 'center',
        flexWrap: 'nowrap',
        whiteSpace: 'nowrap',
      }}>
        {renderLinksMemo}
      </Stack>
    </Box>
  );
}

function Separator() {
  return (
    <Box
      component="span"
      sx={{
        margin: 1,
        padding: '2px',
        borderRadius: '50%',
        bgcolor: 'primary.main',
      }}
    />
  );
}
