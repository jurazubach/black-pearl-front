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
import { IOrderTableFilters, IOrderTableFilterValue } from 'src/types/order';

const OrderPaymentTypeOption = [
  { value: 'cash', label: 'Готівка' },
  { value: 'card', label: 'Картка' },
];

const OrderPaymentOption = [
  { value: 'paid', label: 'Оплачено' },
  { value: 'waiting', label: 'Очікування' },
  { value: 'un-paid', label: 'Не оплачено' },
];

type Props = {
  filters: IOrderTableFilters;
  onFilters: (name: string, value: IOrderTableFilterValue) => void;
};

export default function OrderTableToolbar({
  filters,
  onFilters,
}: Props) {
  const handleFilterSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('search', event.target.value);
    },
    [onFilters]
  );

  const handleFilterPaymentType = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'paymentType',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  const handleFilterPayment = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'payment',
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
            value={filters.paymentType}
            onChange={handleFilterPaymentType}
            input={<OutlinedInput label="Тип оплати" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {OrderPaymentTypeOption.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                <Checkbox disableRipple size="small" checked={filters.paymentType.includes(option.label)} />
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
          <InputLabel>Статус оплати</InputLabel>

          <Select
            multiple
            value={filters.payment}
            onChange={handleFilterPayment}
            input={<OutlinedInput label="Статус оплати" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
          >
            {OrderPaymentOption.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                <Checkbox disableRipple size="small" checked={filters.payment.includes(option.label)} />
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
