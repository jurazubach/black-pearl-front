import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useBoolean } from 'src/hooks/use-boolean';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { ECouponDiscountType, ECouponType, ICouponItem } from 'src/types/coupon';

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: ICouponItem;
  onDeleteRow: VoidFunction;
};

export default function CouponTableRow({
  row,
  selected,
  onEditRow,
  onDeleteRow,
}: Props) {
  const { code, discountType, discount, type, createdAt, startAt, endAt } = row;
  const confirm = useBoolean();
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <Label
            variant="soft"
            color={
              (type === ECouponType.SINGLE && 'success') ||
              (type === ECouponType.MULTIPLE && 'warning') ||
              'default'
            }
          >
            {type}
          </Label>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{code}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{discountType === ECouponDiscountType.PRICE ? 'Фіксована' : 'Процентна'}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{discount}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{startAt}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{endAt}</TableCell>
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
