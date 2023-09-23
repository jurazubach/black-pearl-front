'use client';

import React, { useCallback } from 'react';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme, alpha } from '@mui/material/styles';
import Iconify from 'src/components/iconify';

const ChatFab = () => {
	const theme = useTheme();
	const onFabClick = useCallback(() => {
		if (window) {
			window.open('https://t.me/JuraZubach');
		}
	}, []);

	return (
		<Box
			sx={{
				height: theme.spacing(8),
				width: theme.spacing(8),
				backgroundColor: alpha(theme.palette.background.default, 0.6),
				zIndex: 1000000,
				opacity: 0.8,
				position: 'fixed',
				bottom: { xs: theme.spacing(3), sm: theme.spacing(8) },
				right: theme.spacing(3),
				boxShadow: theme.customShadows.dropdown,
				borderRadius: '50%',
				"&:hover": {
					opacity: 1,
					backgroundColor: alpha(theme.palette.background.default, 0.8),
				}
			}}
		>
			<Tooltip title="Напишіть нам в Telegram ❤️" placement="left">
				<IconButton color="primary" onClick={onFabClick}>
					<Iconify icon="ic:outline-telegram" width={48} />
				</IconButton>
			</Tooltip>
		</Box>
	);
}

export default ChatFab;
