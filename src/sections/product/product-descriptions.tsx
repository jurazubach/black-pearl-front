import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled, useTheme } from '@mui/material/styles';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Iconify from 'src/components/iconify';
import { PATH_PAGE } from '../../routes/paths';
import { paper } from '../../theme/css';

interface Props {
	product: any;
}

const StyledAccordion = styled(Accordion)(({ theme, expanded }) => {
	return {
		transition: 'all 0.2s ease-in',
		...(expanded ? paper({ theme, bgcolor: theme.palette.background.default }): {}),
		marginTop: '0px !important',
	};
});

const BetweenTextWrapper = ({ leftText, rightText }: { leftText: string, rightText: string }) => {
	const theme = useTheme();

	return (
		<Stack direction='row' justifyContent='space-between'>
			<Typography sx={{
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
			}}>{leftText}</Typography>
			<Box sx={{ borderBottom: `1px dashed ${theme.palette.divider}`, width: '100%', mx: 3 }} />
			<Typography sx={{
				whiteSpace: 'nowrap',
				textOverflow: 'ellipsis',
				fontWeight: 'bold',
			}}>{rightText}</Typography>
		</Stack>
	);
};

const ProductDescriptions = ({ product }: Props) => {
	const [expanded, setExpanded] = useState<string | boolean>('descriptions');
	const handleChange = (accordion: string) => (_event: any, isExpanded: any) => setExpanded(isExpanded ? accordion : false);

	return (
		<Box sx={{ '& .MuiPaper-root.MuiAccordion-root.Mui-expanded': { bgcolor: 'grey.800' } }}>
			<StyledAccordion expanded={expanded === 'descriptions'} onChange={handleChange('descriptions')}>
				<AccordionSummary
					expandIcon={<Iconify icon='solar:alt-arrow-down-bold' color='primary' width={24} />}>
					<Typography variant='h6'>Короткий опис товару</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>{product.description}</Typography>
				</AccordionDetails>
			</StyledAccordion>
			<StyledAccordion expanded={expanded === 'properties'} onChange={handleChange('properties')}>
				<AccordionSummary
					expandIcon={<Iconify icon='solar:alt-arrow-down-bold' color='primary' width={24} />}>
					<Typography variant='h6'>Деталі</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Stack direction='column' spacing={1}>
						{product.properties.map(({ property, value }: any) => (
							<BetweenTextWrapper leftText={property.title} rightText={value.title} />
						))}
					</Stack>
				</AccordionDetails>
			</StyledAccordion>
			<StyledAccordion expanded={expanded === 'returns'} onChange={handleChange('returns')}>
				<AccordionSummary
					expandIcon={<Iconify icon='solar:alt-arrow-down-bold' color='primary' width={24} />}>
					<Typography variant='h6'>Гарантія та повернення</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Stack spacing={2}>
						<Typography>
							Повернення або обмін товару здійснюється протягом 14 днів з моменту покупки (не враховуючи день покупки);
							товар не підійшов за кольором, формою, розмірами або іншими характеристиками; товар має механічні
							пошкодження, несправності, пошкоджену упаковку чи шлюб із вини виробника чи служби доставки;
							повернення/обмін товару належної якості можливе лише за умови, якщо товар не використовувався, збережено
							всі споживчі якості та товарний вигляд, має повну комплектацію, не порушено цілісність виробу, присутні
							всі ярлики, пломби, а також наявність розрахункової накладної, отриманої разом із товаром.
						</Typography>

						<Link component={NextLink} href={PATH_PAGE.returnOfGoods}>
							<Typography variant='subtitle1'>Більше інформації тут</Typography>
						</Link>
					</Stack>
				</AccordionDetails>
			</StyledAccordion>
			<StyledAccordion expanded={expanded === 'instructions'} onChange={handleChange('instructions')}>
				<AccordionSummary
					expandIcon={<Iconify icon='solar:alt-arrow-down-bold' color='primary' width={24} />}
				>
					<Typography variant='h6'>Інструкція з догляду</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Stack direction='column' spacing={1}>
						<Stack direction='row' spacing={1}>
							<Iconify icon='ps:do-not-bleach' color='inherit' width={24} />
							<Typography>Не відбілювати</Typography>
						</Stack>

						<Stack direction='row' spacing={1}>
							<Iconify icon='icon-park-outline:iron' color='inherit' width={24} />
							<Typography>Макс. темп. прасування 110 C / 230 F</Typography>
						</Stack>

						<Stack direction='row' spacing={1}>
							<Iconify icon='tabler:wash-tumble-off' color='inherit' width={24} />
							<Typography>Не сушити в пральній машині</Typography>
						</Stack>
					</Stack>
				</AccordionDetails>
			</StyledAccordion>
			<StyledAccordion expanded={expanded === 'sizes'} onChange={handleChange('sizes')}>
				<AccordionSummary
					expandIcon={<Iconify icon='solar:alt-arrow-down-bold' color='primary' width={24} />}
				>
					<Typography variant='h6'>Розмірна сітка</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Stack direction='column' spacing={1}>
						<Stack direction='row' spacing={1}>
							<Iconify icon='ps:do-not-bleach' color='inherit' width={24} />
							<Typography>Не відбілювати</Typography>
						</Stack>
					</Stack>
				</AccordionDetails>
			</StyledAccordion>
		</Box>
	);
};

export default ProductDescriptions;
