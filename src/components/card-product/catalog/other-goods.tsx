import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

interface Props {
	defaultGoods: any;
	otherGoods: any[];
	setWarehouseId: (id: string) => void;
}

const OtherGoods = ({ defaultGoods, otherGoods, setWarehouseId }: Props) => {
	const theme = useTheme();
	const onGoodClick = useCallback((warehouseId: string) => () => setWarehouseId(warehouseId), [setWarehouseId]);

	return (
		<Stack direction='row' spacing={1}>
			{otherGoods.map((productGoods: any) => (
				<Box
					onClick={onGoodClick(productGoods.id)}
					key={productGoods.id}
					sx={{
						display: 'flex',
						cursor: 'pointer',
						justifyContent: 'center',
						alignItems: 'center',
						width: '36px',
						height: '36px',
						transition: 'all .1s ease-in',
						backgroundColor: defaultGoods.size === productGoods.size ? 'primary.main' : 'grey.100',
						'&:hover': {
							backgroundColor: defaultGoods.size === productGoods.size ? 'primary.dark' : 'grey.200',
						},
					}}
				>
					<Typography
						sx={{ padding: theme.spacing(1), color: defaultGoods.size === productGoods.size ? 'common.white' : 'common.black' }}
						variant='subtitle1'
					>
						{productGoods.size}
					</Typography>
				</Box>
			))}
		</Stack>
	);
};

export default OtherGoods;
