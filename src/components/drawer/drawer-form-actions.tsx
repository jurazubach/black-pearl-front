import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Iconify from 'src/components/iconify';

interface Props {
	onClose: () => void;
}

const DrawerFormActions = ({ onClose }: Props) => {
	const theme = useTheme();

	return (
		<Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}`, }}>
			<Stack direction="row" spacing={1}>
				{onClose && (
					<Button
						fullWidth
						size='large'
						variant='outlined'
						color='inherit'
						onClick={onClose}
						startIcon={<Iconify icon='material-symbols:tab-close-outline-sharp' color='inherit' width={24} />}
					>
						Закрити
					</Button>
				)}

				<Button
					fullWidth
					type="submit"
					size='large'
					variant='contained'
					color='primary'
					startIcon={<Iconify icon='material-symbols:save-rounded' color='inherit' width={24} />}
				>
					Зберегти
				</Button>
			</Stack>
		</Box>
	);
}

export default DrawerFormActions;
