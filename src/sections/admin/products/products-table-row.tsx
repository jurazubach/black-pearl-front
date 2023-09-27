import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useBoolean } from 'src/hooks/use-boolean';
import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { EProductStatus, IProductItem } from 'src/types/product';

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IProductItem;
  onDeleteRow: VoidFunction;
};

export default function ProductsTableRow({
  row,
  selected,
  onEditRow,
  onDeleteRow,
}: Props) {
  const { imageSrc, alias, title, code, description, status } = row;
  const confirm = useBoolean();
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Image disabledEffect decoding='async' loading='lazy' src={imageSrc} sx={{ height: '40px', width: '100%' }} />
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{code}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{alias}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{title}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{description.slice(0, 100)}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === EProductStatus.ACTIVE && 'success') ||
              (status === EProductStatus.INACTIVE && 'warning') ||
              'default'
            }
          >
            {status ? 'Вкл.' : 'Викл.'}
          </Label>
        </TableCell>
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
