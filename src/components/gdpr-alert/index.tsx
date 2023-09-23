'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme, alpha } from '@mui/material/styles';
import { useLocalStorage } from 'src/hooks/use-local-storage';

export const GDPR_DEFAULT_FLAG = false;
export const GDPR_STORAGE_KEY = 'gdpr-policy';
export const GDPR_STORAGE_FLAG_KEY = 'is-accepted';

let expiredTimer: any;

const GdprAlert = () => {
	const theme = useTheme();
	const [isOpen, setOpen] = useState<boolean>(false);
	const { state, update } = useLocalStorage(GDPR_STORAGE_KEY, GDPR_DEFAULT_FLAG);

	const onAcceptClick = useCallback(() => {
		update(GDPR_STORAGE_FLAG_KEY, true);
		setOpen(false);
	}, [update, setOpen]);

	useEffect(() => {
		clearTimeout(expiredTimer);
		expiredTimer = setTimeout(() => {
			if (!state || (!!state && !state[GDPR_STORAGE_FLAG_KEY])) {
				setOpen(true);
			}
		}, 2000);
	}, [state]);

	return (
		<Box sx={{
			display: isOpen ? 'flex' : 'none',
			position: 'fixed',
			width: '100vw',
			height: '100vh',
			backgroundColor: alpha(theme.palette.grey[900], 0.8),
			zIndex: '10000',
			alignItems: 'flex-end',
			transition: 'all .2s ease-in',
		}}>
			<Box sx={{ backgroundColor: theme.palette.grey[800], py: 6, px: 3, width: '100%' }}>
				<Container maxWidth='lg'>
					<Stack spacing={3}>
						<Stack spacing={1} sx={{ userSelect: 'none' }}>
							<Typography sx={{ color: theme.palette.grey[300], textIndent: theme.spacing(3) }}>Щоб надавати послуги на найвищому рівні на нашому веб-сайті, ми використовуємо файли cookies та подібні технології. Це дозволяє нам забезпечити належну роботу нашого веб-сайту, його безпеку та виконання його основних функцій, також завдяки базовій статистичній інформації і після отримання Вашої згоди, файли cookies використовуються нами для проведення додаткових вимірювань та аналізу використання веб-сайту, що дозволяє пристосувати його до Ваших інтересів і представляти товари, вміст і рекламу, що підходять для Вас.</Typography>

							<Typography sx={{ color: theme.palette.grey[300], textIndent: theme.spacing(3) }}>Щоб дати згоду на встановлення файлів cookies всіх категорій, зазначених вище, на Вашому кінцевому пристрої, натисніть кнопку «Згода».</Typography>
						</Stack>

						<Button variant="contained" onClick={onAcceptClick}>Згода! ❤️</Button>
					</Stack>
				</Container>
			</Box>
		</Box>
	);
}

export default GdprAlert;
