import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Iconify from 'src/components/iconify';

interface Props {
	title: string;
	onClose: () => void;
}

const DrawerFormHeader = ({ title, onClose }: Props) => {
	const theme = useTheme();

	return (
		<Stack
			direction='row'
			alignItems='center'
			justifyContent='space-between'
			sx={{ py: 2, pr: 2, pl: 2, borderBottom: `1px solid ${theme.palette.divider}`, }}
		>
			<Typography variant='h4' sx={{ flexGrow: 1 }}>
				{title}
			</Typography>

			<IconButton onClick={onClose}>
				<Iconify icon='mingcute:close-line' />
			</IconButton>
		</Stack>
	);
}

export default DrawerFormHeader;
