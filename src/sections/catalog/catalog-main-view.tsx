'use client';

import { useParams } from 'next/navigation';
import { useScroll } from 'framer-motion';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import MainLayout from 'src/layouts/main';
import ScrollProgress from 'src/components/scroll-progress';
import Iconify from 'src/components/iconify';
import getCategoryAlias from 'src/utils/get-category-alias';
import CatalogGrid from 'src/components/catalog-grid';
import { IFilterContainerOut } from 'src/utils/get-filter-container';
import Filters from 'src/components/filters/filters';
import { IProductItemCatalog } from 'src/types/product';
import { ICategoryItem } from 'src/types/category';

interface Props {
	category: ICategoryItem;
	products: IProductItemCatalog[];
	filterContainer: IFilterContainerOut;
}

export default function CatalogMainView({ category, products, filterContainer }: Props) {
	console.log('category', category);
	console.log('products', products);
	const theme = useTheme();
	const { scrollYProgress } = useScroll();
	const query = useParams();
	const alias = getCategoryAlias(query);

	return (
		<MainLayout>
			<ScrollProgress scrollYProgress={scrollYProgress} />
			<Filters categoryAlias={alias} filterContainer={filterContainer} />

			<Container maxWidth='lg' disableGutters>
				<CatalogGrid products={products} />
			</Container>

			<Box py={2} display='flex' justifyContent='center' alignItems='center' sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
				<Button
					sx={{ width: '100%', maxWidth: '480px' }}
					variant='contained'
					startIcon={<Iconify icon='mdi:reload' width={24} sx={{ color: 'common.white' }} />}
				>Показати ще</Button>
			</Box>
		</MainLayout>
	);
}
