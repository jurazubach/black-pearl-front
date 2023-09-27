import { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import {
  ICustomerTableFilters,
  ICustomerTableFilterValue,
} from 'src/types/customer';

type Props = {
  filters: ICustomerTableFilters;
  onFilters: (name: string, value: ICustomerTableFilterValue) => void;
};

export default function CustomersTableToolbar({
  filters,
  onFilters,
}: Props) {
  const handleFilterSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => onFilters('search', event.target.value), [onFilters]
  );

  return (
    <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5 } }}
      >
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
