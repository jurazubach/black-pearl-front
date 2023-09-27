import { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Iconify from 'src/components/iconify';
import {
  ICouponTableFilters,
  ICouponTableFilterValue,
  DISCOUNT_TYPE_OPTIONS,
} from 'src/types/coupon';

type Props = {
  filters: ICouponTableFilters;
  onFilters: (name: string, value: ICouponTableFilterValue) => void;
};

export default function CouponTableToolbar({
  filters,
  onFilters,
}: Props) {
  const handleFilterSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onFilters('search', event.target.value), [onFilters]
  );

  const handleFilterDiscountType = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'discountType',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  return (
    <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5 } }}
      >
        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
          <InputLabel>Тип оплати</InputLabel>

          <Select
            multiple
            value={filters.discountType}
            onChange={handleFilterDiscountType}
            input={<OutlinedInput label="Тип знижки" />}
            renderValue={(selected) => {
              const filtered = DISCOUNT_TYPE_OPTIONS.filter((i) => selected.includes(i.value));
              return filtered.map(({ label }) => label).join(', ');
            }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
          >
            {DISCOUNT_TYPE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox disableRipple size="small" checked={filters.discountType.includes(option.value)} />
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={filters.search}
            onChange={handleFilterSearch}
            placeholder="Пошук по коду..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
  );
}
