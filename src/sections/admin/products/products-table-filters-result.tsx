import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import { IProductTableFilters, IProductTableFilterValue, STATUS_OPTIONS } from 'src/types/product';

type Props = StackProps & {
  filters: IProductTableFilters;
  onFilters: (name: string, value: IProductTableFilterValue) => void;
  onResetFilters: VoidFunction;
  results: number;
};

export default function ProductsTableFiltersResult({
  filters,
  onFilters,
  onResetFilters,
  results,
  ...other
}: Props) {
  const handleRemoveStatus = () => onFilters('status', 'all');
  const typeMemo = useMemo(() => STATUS_OPTIONS.find(({ value }) => value === filters.status)?.label || 'Всі', [filters.status]);

  return (
    <Stack spacing={1.5} {...other}>
      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {filters.status !== 'all' && (
          <Block label="Статус:">
            <Chip size="small" label={typeMemo} onDelete={handleRemoveStatus} />
          </Block>
        )}

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

type BlockProps = StackProps & {
  label: string;
};

function Block({ label, children, sx, ...other }: BlockProps) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
