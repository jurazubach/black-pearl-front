import { useContext } from 'react';
import { DrawerContext } from 'src/context/drawer-context';

const useDrawer = () => useContext(DrawerContext);

export default useDrawer;
