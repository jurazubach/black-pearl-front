import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface IDeleteAlertDialogProps {
  closeDialog: () => void;
  title: string;
  description?: string;
  onSubmit: () => void;
}

export default ({ closeDialog, title, description, onSubmit }: IDeleteAlertDialogProps) => {
  const onSubmitClick = useCallback(() => {
    onSubmit();
    closeDialog();
  }, [onSubmit, closeDialog]);

  return (
    <>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} variant="outlined" color="warning">Відмінити</Button>
        <Button onClick={onSubmitClick} autoFocus variant="contained" color="error">Видалити</Button>
      </DialogActions>
    </>
  );
}
