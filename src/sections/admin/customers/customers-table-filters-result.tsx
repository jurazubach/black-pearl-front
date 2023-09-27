import React from 'react';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
import Iconify from 'src/components/iconify';

type Props = StackProps & {
  onResetFilters: VoidFunction;
};

export default function CustomersTableFiltersResult({
  onResetFilters,
  ...other
}: Props) {
  return (
    <Stack spacing={1.5} {...other}>
      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Очистити
        </Button>
      </Stack>
    </Stack>
  );
}
