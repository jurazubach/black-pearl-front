import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { ICustomerItem } from 'src/types/customer';

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: ICustomerItem;
  onDeleteRow: VoidFunction;
};

export default function CustomersTableRow({
  row,
  selected,
  onEditRow,
  onDeleteRow,
}: Props) {
  const { firstName, lastName, email, phone, city, region, createdAt } = row;
  const confirm = useBoolean();
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{firstName}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{lastName}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phone}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{city}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{region}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{createdAt}</TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Видалити
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Редагувати
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
