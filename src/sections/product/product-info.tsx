import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Label from 'src/components/label';

interface Props {
	product: any;
}

const ProductInfo = ({ product }: Props) => (
		<Stack direction='column' spacing={3}>
			<Typography variant='h3' sx={{ fontWeight: 'bold' }}>{product.title}</Typography>

			<Stack direction='row' justifyContent='space-between' spacing={2}>
				<Label variant='soft' color='success'>
					<Typography sx={{ fontWeight: 'bold', textTransform: 'none' }}>В наявності</Typography>
				</Label>

				<Stack direction='row' spacing={1}>
					<Typography variant='body2'>Актикул:</Typography>
					<Typography variant='body1' sx={{ fontWeight: 'bold', color: '#e7e7e7' }}>{product.code}</Typography>
				</Stack>
			</Stack>
		</Stack>
	)

export default ProductInfo;
