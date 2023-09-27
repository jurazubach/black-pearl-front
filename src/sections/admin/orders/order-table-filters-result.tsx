import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import { IOrderTableFilters, IOrderTableFilterValue } from 'src/types/order';

type Props = StackProps & {
  filters: IOrderTableFilters;
  onFilters: (name: string, value: IOrderTableFilterValue) => void;
  onResetFilters: VoidFunction;
  results: number;
};

export default function OrderTableFiltersResult({
  filters,
  onFilters,
  onResetFilters,
  results,
  ...other
}: Props) {
  const handleRemoveStatus = () => {
    onFilters('status', 'all');
  };

  const handleRemovePayment = (inputValue: string) => {
    const newValue = filters.payment.filter((item) => item !== inputValue);
    onFilters('payment', newValue);
  };

  const handleRemovePaymentType = (inputValue: string) => {
    const newValue = filters.paymentType.filter((item) => item !== inputValue);
    onFilters('paymentType', newValue);
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {filters.status !== 'all' && (
          <Block label="Статус:">
            <Chip size="small" label={filters.status} onDelete={handleRemoveStatus} />
          </Block>
        )}

        {!!filters.payment.length && (
          <Block label="Статус оплати:">
            {filters.payment.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemovePayment(item)} />
            ))}
          </Block>
        )}

        {!!filters.paymentType.length && (
          <Block label="Тип оплати:">
            {filters.paymentType.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemovePaymentType(item)} />
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
