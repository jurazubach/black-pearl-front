import { useContext } from 'react';
import { DialogContext } from 'src/context/dialog-context';

const useDialog = () => useContext(DialogContext);

export default useDialog;
