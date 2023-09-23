import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useResponsive } from 'src/hooks/use-responsive';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import Iconify from 'src/components/iconify';
import Image from 'src/components/image';

interface IDiscountDialogProps {
	closeDialog: () => void;
}

const ImageLogoWrapper: any = styled(Image)({
	maxWidth: '288px',
});

export const DISCOUNT_DEFAULT_FLAG = false;
export const DISCOUNT_STORAGE_KEY = 'discount-dialog';
export const DISCOUNT_STORAGE_FLAG_KEY = 'not-display-again';

export default ({ closeDialog }: IDiscountDialogProps) => {
	const smUp = useResponsive('up', 'sm');
	const [email, setEmail] = useState<string>('');
	const { update } = useLocalStorage(DISCOUNT_STORAGE_KEY, DISCOUNT_DEFAULT_FLAG);

	const onCloseClick = useCallback(() => {
		update(DISCOUNT_STORAGE_FLAG_KEY, true);
		closeDialog();
	}, [closeDialog, update]);

	return (
		<DialogContent sx={{ p: 0 }}>
			<IconButton onClick={closeDialog} sx={{ position: 'absolute', top: '8px', right: '8px' }}>
				<Iconify icon='mingcute:close-line' />
			</IconButton>

			<Stack direction='row'>
				{smUp && (
					<Box sx={{ maxWidth: '320px' }}>
						<ImageLogoWrapper disabledEffect alt='discount-logo' src='/assets/images/discount/discount-dialog.png' />
					</Box>
				)}

				<Box sx={{ width: '480px' }}>
					<Stack spacing={3} sx={{ px: 6, py: 4 }}>
						<Typography variant='h3' textAlign='center' component='span'>
							Отримайте <Typography color='primary' variant='h3' component='span'>10% </Typography>
							<Typography variant='h3' component='span'>
								на першу покупку
							</Typography>
						</Typography>

						<Typography textAlign='center' variant='caption' color='grey.300'>
							Введіть адресу електронної пошти, щоб <b>отримати знижку</b> на перше замовлення. Інформацію про подальші
							розпродажі та пропозиції.
						</Typography>

						<Stack
							spacing={smUp ? 0 : 1}
							direction='row'
							sx={{ width: '100%', flexDirection: { xs: 'column', sm: 'row' } }}
						>
							<TextField
								fullWidth
								type="email"
								placeholder='Введіть ваш e-mail'
								value={email}
								onChange={(event) => setEmail(event.target.value)}
							/>
							<Button
								fullWidth={!smUp}
								sx={{ minWidth: '120px', width: { xs: '100%', sm: '120px' } }}
								variant='contained'
								disabled={!email}
							>
								Підписатись
							</Button>
						</Stack>

						<Link textAlign='center' href='#' underline='always' onClick={onCloseClick}>
							Більше не показувати це спливаюче вікно
						</Link>
					</Stack>
				</Box>
			</Stack>
		</DialogContent>
	);
}
