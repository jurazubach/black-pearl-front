'use client';

import { m, useScroll } from 'framer-motion';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import ScrollProgress from 'src/components/scroll-progress';
import Iconify from 'src/components/iconify';
import CatalogGrid from 'src/components/catalog-grid';
import { IFilterContainerOut } from 'src/utils/get-filter-container';
import Filters from 'src/components/filters/filters';
import { IProductItemCatalog } from 'src/types/product';
import { ICategoryItem } from 'src/types/category';
import { varFade } from 'src/components/animate';
import { IFilterModels } from 'src/types/filters';

interface Props {
	categoryFilters: IFilterModels;
	category: ICategoryItem;
	products: IProductItemCatalog[];
	filterContainer: IFilterContainerOut;
}

const variantsContainer = {
	hidden: varFade().in.initial,
	show: {
		...varFade().in.animate,
		transition: { ...varFade().in.animate.transition, staggerChildren: 0.05 }
	},
};

export default function CatalogMainView({ categoryFilters, category, products, filterContainer }: Props) {
	const theme = useTheme();
	const { scrollYProgress } = useScroll();

	return (
		<Stack>
			<ScrollProgress scrollYProgress={scrollYProgress} />
			<Filters categoryFilters={categoryFilters} categoryAlias={category.alias} filterContainer={filterContainer} />

			<Container maxWidth='lg' disableGutters>
				<m.div variants={variantsContainer} initial="hidden" animate="show">
					<CatalogGrid products={products} />
				</m.div>
			</Container>

			<Box py={2} display='flex' justifyContent='center' alignItems='center' sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
				<Button
					sx={{ width: '100%', maxWidth: '480px' }}
					variant='contained'
					startIcon={<Iconify icon='mdi:reload' width={24} sx={{ color: 'common.white' }} />}
				>Показати ще</Button>
			</Box>
		</Stack>

	);
}
