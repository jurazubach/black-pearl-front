import Typography from '@mui/material/Typography';
import Paper, { PaperProps } from '@mui/material/Paper';

interface Props extends PaperProps {
  query?: string;
}

export default function SearchNotFound({ query, sx, ...other }: Props) {
  return query ? (
    <Paper
      sx={{ bgcolor: 'unset', textAlign: 'center', ...sx, }}
      {...other}
    >
      <Typography variant="h6" gutterBottom>
        Нічого не знайдено
      </Typography>

      <Typography variant="body2">
        Немає результатів для &nbsp;
        <strong>&quot;{query}&quot;</strong>.
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2" sx={sx}>
      Введіть артикул або назву моделі
    </Typography>
  );
}
