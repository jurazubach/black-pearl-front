import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Label from 'src/components/label';

type Props = {
  title: {
    text: string;
    highlight: boolean;
  }[];
  path: string;
  code: {
    text: string;
    highlight: boolean;
  }[];
  onClickItem: VoidFunction;
};

export default function ResultItem({ title, path, code, onClickItem }: Props) {
  return (
    <ListItemButton
      onClick={onClickItem}
      sx={{
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'transparent',
        borderBottomColor: (theme) => theme.palette.divider,
        '&:hover': {
          borderRadius: 1,
          borderColor: (theme) => theme.palette.primary.main,
          backgroundColor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
        },
      }}
    >
      <ListItemText
        primaryTypographyProps={{ typography: 'subtitle2' }}
        secondaryTypographyProps={{ typography: 'caption' }}
        primary={title.map((part, index) => (
          <Box key={index} component="span" sx={{ color: part.highlight ? 'primary.main' : 'text.primary' }}>
            {part.text}
          </Box>
        ))}
        secondary={(
          <Box component="span" sx={{ color: 'text.secondary' }}>
            {path}
          </Box>
        )}
      />

      <Label variant='soft' color="primary">{
        code.map((part, index) => (
          <Box key={index} component="span" sx={{ color: part.highlight ? 'primary.main' : 'text.primary' }}>
            {part.text}
          </Box>
        ))
      }</Label>
    </ListItemButton>
  );
}
