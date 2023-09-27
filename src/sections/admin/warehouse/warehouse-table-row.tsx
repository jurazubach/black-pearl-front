import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { IWarehouseProductItem } from 'src/types/warehouseProduct';

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IWarehouseProductItem;
  onDeleteRow: VoidFunction;
};

export default function WarehouseTableRow({
  row,
  selected,
  onEditRow,
  onDeleteRow,
}: Props) {
  const { quantity, oldPrice, costPrice, price, lastUpdatedAt, size, productId } = row;
  const confirm = useBoolean();
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{productId}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{quantity}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{oldPrice}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{costPrice}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{price}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{size}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{lastUpdatedAt}</TableCell>
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
