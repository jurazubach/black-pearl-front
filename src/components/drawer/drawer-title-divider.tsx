import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
  sx?: any;
  number: number;
  title: string;
  children: any;
}

export interface IDividerProps {
  number: number;
  title: string;
}

const RootDivider = styled(Box)({
  height: '42px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  userSelect: 'none',
});

const StyledCircle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '36px',
  height: '36px',
  left: '0',
  top: '4px',
  borderRadius: '50%',
  color: theme.palette.common.white,
  textAlign: 'center',
  backgroundColor: theme.palette.primary.main,
}));

const StyledTitle = styled(Typography)({
  fontWeight: 'bold',
  lineHeight: '42px',
  marginLeft: '56px',
});

const Divider = ({ number, title }: IDividerProps) => (
    <RootDivider>
      <StyledCircle>
        <Typography component='span' sx={{ lineHeight: 2.2 }}>{number}</Typography>
      </StyledCircle>

      <StyledTitle>{title}</StyledTitle>
    </RootDivider>
  )

export default ({ sx = {}, number, title, children }: Props) => (
    <Stack spacing={3} sx={{ p: 2, '& + &': { pt: 0 }, ...sx }}>
      <Divider number={number} title={title} />

      {children}
    </Stack>
  )
