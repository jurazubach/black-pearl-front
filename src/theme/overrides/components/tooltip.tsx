import { Theme } from '@mui/material/styles';

export function tooltip(theme: Theme) {
  const lightMode = theme.palette.mode === 'light';

  return {
    MuiTooltip: {
      defaultProps: {
        placement: 'top',
        arrow: true,
        disableInteractive: true,
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.grey[lightMode ? 800 : 700],
        },
        arrow: {
          color: theme.palette.grey[lightMode ? 800 : 700],
        },
      },
    },
  };
}
