import { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import {
  IWarehouseProductTableFilters,
  SIZES_OPTIONS,
  IWarehouseProductTableFilterValue,
  TWarehouseProductSize,
} from 'src/types/warehouseProduct';
import Iconify from 'src/components/iconify';

type Props = {
  filters: IWarehouseProductTableFilters;
  onFilters: (name: string, value: IWarehouseProductTableFilterValue) => void;
};

export default function WarehouseTableToolbar({
  filters,
  onFilters,
}: Props) {
  const handleFilterSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onFilters('search', event.target.value), [onFilters]
  );

  const handleFilterSizes = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'sizes',
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
          <InputLabel>Розміри</InputLabel>

          <Select
            multiple
            value={filters.sizes}
            onChange={handleFilterSizes}
            input={<OutlinedInput label="Розміри" />}
            renderValue={(selected) => {
              const filtered = SIZES_OPTIONS.filter((i) => selected.includes(i.value as TWarehouseProductSize));
              return filtered.map(({ label }) => label).join(', ');
            }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
          >
            {SIZES_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox disableRipple size="small" checked={filters.sizes.includes(option.value as TWarehouseProductSize)} />
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
            placeholder="Пошук..."
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
