import React, { useMemo } from 'react';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {useTheme} from "@mui/material/styles";
import { Breakpoint } from '@mui/system';

interface Props {
  title?: string;
  description?: string | React.ReactNode;
  center?: boolean;
  maxWidth?: Breakpoint;
}

export default ({ title, description = null, center, maxWidth = 'xl' }: Props) => {
  const theme = useTheme();

  const descriptionMemo = useMemo(() => {
    if (typeof description === 'string') {
      return <Typography sx={{ maxWidth: 768 }} color='grey.400' variant="h6" textAlign={center ? 'center' : 'right'}>{description}</Typography>;
    }

    return description;
  }, [description, center]);

  return (
    <Box sx={{
      borderTop: `1px solid ${theme.palette.divider}`,
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    }}>
      <Container maxWidth={maxWidth}>
        <Stack direction={center ? 'column' : 'row'} spacing={1} alignItems={center ? 'center' : "flex-end"}>
          {title && (
            <Typography variant="h3" textAlign={center ? 'center' : 'right'}>{title}</Typography>
          )}
          {descriptionMemo}
        </Stack>
      </Container>
    </Box>
  )
}
