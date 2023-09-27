import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import { DISCOUNT_TYPE_OPTIONS, ICouponTableFilters, ICouponTableFilterValue, TYPE_OPTIONS } from 'src/types/coupon';

type Props = StackProps & {
  filters: ICouponTableFilters;
  onFilters: (name: string, value: ICouponTableFilterValue) => void;
  onResetFilters: VoidFunction;
  results: number;
};

export default function CouponTableFiltersResult({
  filters,
  onFilters,
  onResetFilters,
  results,
  ...other
}: Props) {
  const handleRemoveType = () => onFilters('type', 'all');
  const handleRemoveDiscountType = (inputValue: string) => {
    const newValue = filters.discountType.filter((item) => item !== inputValue);
    onFilters('discountType', newValue);
  };

  const typeMemo = useMemo(() => TYPE_OPTIONS.find(({ value }) => value === filters.type)?.label || 'Всі', [filters.type]);

  const discountTypesMemo = useMemo(() => DISCOUNT_TYPE_OPTIONS.filter((i) => filters.discountType.includes(i.value)), [filters.discountType]);

  return (
    <Stack spacing={1.5} {...other}>
      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {filters.type !== 'all' && (
          <Block label="Тип:">
            <Chip size="small" label={typeMemo} onDelete={handleRemoveType} />
          </Block>
        )}

        {!!filters.discountType.length && (
          <Block label="Тип знижки:">
            {discountTypesMemo.map((item) => (
              <Chip key={item.value} label={item.label} size="small" onDelete={() => handleRemoveDiscountType(item.value)} />
            ))}
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
