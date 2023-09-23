import React, { useMemo, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';

const StyledPreview: any = styled(Image)(({ theme }) => ({
	opacity: 0.25,
	border: `1px solid ${theme.palette.primary.main}`,
	'&:hover': {
		opacity: 1,
	},
	transition: 'all 0.3s ease-in',
	cursor: 'pointer',
}));

interface IProductGalleryProps {
	images?: string[];
}

const DEFAULT_IMAGES = [
	'https://media.zoho.in.ua/a5915417-f840-4386-95bf-dbf22da20a95?v=1687116191918',
	'https://media.zoho.in.ua/76a8708c-e031-4761-ae52-91ac6b823ed3?v=1685579827105',
	'https://media.zoho.in.ua/d05360ef-8322-4f01-93ab-6a194e1af6f7?v=1684886687847',
	'https://media.zoho.in.ua/10265833-0dea-4eaf-ad54-c15caab866c5?v=1686337810125',
	'https://media.zoho.in.ua/c68ecd68-000e-43d4-a9a3-93b5001e5c09?v=1684971879341',
	'https://media.zoho.in.ua/787e9bf2-c32a-468f-97bd-c00f5c21f863?v=1684964571218',
	'https://media.zoho.in.ua/b38ac8cf-3acb-4568-83a4-74c705b29e6a?v=1688603423436',
	'https://media.zoho.in.ua/1c10d0c9-cf44-4384-8a80-cbcaf85b0d7d?v=1685565774032',
	'https://media.zoho.in.ua/38be3c30-fcf0-4614-8289-15f5c2c6f5ba?v=1688602962715',
	'https://media.zoho.in.ua/83a14b1e-eb04-42dd-90ea-a57c82e31053?v=1685582390485',
	'https://media.zoho.in.ua/2bae7f18-df35-454e-a39f-0bfe966e2d9f?v=1685583498246',
	'https://media.zoho.in.ua/a4060a7b-a26b-42fb-b129-3a18f7f9484b?v=1685559647042',
	'https://media.zoho.in.ua/6a8f1986-6c67-448a-a66e-530d6f0b1d67?v=1685574523914',
	'https://media.zoho.in.ua/bd0561f7-34b4-4d7b-b279-49013cc70506?v=1685580477049',
];

const ProductGallery = ({ images = DEFAULT_IMAGES }: IProductGalleryProps) => {
	const [currentImageIdx, setCurrentImageIdx] = useState<number>(0);
	const smUp = useResponsive('up', 'sm');
	const onImageClick = (idx: number) => () => setCurrentImageIdx(idx);

	const renderPreviewsMemo = useMemo(() => images?.slice(0, 5).map((imageSrc, idx) => {
		const isMatchIdx = idx === currentImageIdx;

		if (!imageSrc) {
			return null;
		}

		return (
			<StyledPreview
				onClick={onImageClick(idx)}
				disabledEffect
				src={imageSrc}
				sx={{ opacity: isMatchIdx ? 1 : 0.25, height: { xs: 90, sm: 125 } }}
			/>
		);
	}), [images, currentImageIdx]);

	return (
		<Grid container spacing={3} direction={smUp ? 'row' : 'column-reverse'}>
			<Grid item xs={12} sm={2}>
				<Stack direction={smUp ? 'column' : 'row'} spacing={smUp ? 3 : 1}>
					{renderPreviewsMemo}
				</Stack>
			</Grid>
			<Grid item xs={12} sm={10}>
				<Image disabledEffect src={images[currentImageIdx]} sx={{
					height: { xs: 'calc(100vh - 320px)', sm: '100%' },
					maxHeight: { sm: '721px' },
					width: '100%',
				}} />
			</Grid>
		</Grid>
	);
};

export default ProductGallery;
