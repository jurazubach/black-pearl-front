import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useBoolean } from 'src/hooks/use-boolean';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { IOrderItem } from 'src/types/order';

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IOrderItem;
  onDeleteRow: VoidFunction;
};

export default function OrderTableRow({
  row,
  selected,
  onEditRow,
  onDeleteRow,
}: Props) {
  const { number, firstName, lastName, email, status, phone, coupon, createdAt, payment, post, paymentType } = row;
  const confirm = useBoolean();
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{number}</TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'active' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'banned' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{firstName}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{lastName}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phone}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{coupon}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{JSON.stringify(post)}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{payment}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{paymentType}</TableCell>
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
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
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
