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
import getFilterContainer from 'src/utils/get-filter-container';
import Filters from 'src/components/filters/filters';

const products = [
	{
		id: 5,
		title: 'Спортивний костюм з тринитки молочний жіночий',
		description: 'Гарний та стильний костюм який зігріє тебе в прохолодну погоду. Зручний крій робить дану модель ідеальною для повсякденних справ та активного відпочинку. Костюм виготовлено з якісної тканини яка не кашлатиться та не втрачає колір навіть після багаторазового прання. Поповни свій гардероб яскравою новинкою.',
	},
	{
		id: 7,
		title: 'Спортивний костюм з тринитки малахіт жіночий',
		description: 'Гарний та стильний костюм який зігріє тебе в прохолодну погоду. Зручний крій робить дану модель ідеальною для повсякденних справ та активного відпочинку. Костюм виготовлено з якісної тканини яка не кашлатиться та не втрачає колір навіть після багаторазового прання. Поповни свій гардероб яскравою новинкою.',
	},
	{
		id: 9,
		title: 'Футболка базова аквамарин',
		description: 'Аквамарин однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб. Коли потрібно щоб було комфортно та стильно - обирай базову футболку та доповнюй стильними джинсами, шортами або спідницею.',
	},
	{
		id: 11,
		title: 'Футболка базова бежева',
		description: 'Жовта однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб. Коли потрібно щоб було комфортно та стильно - обирай базову футболку та доповнюй стильними джинсами, шортами або спідницею.',
	},
	{
		id: 13,
		title: 'Футболка базова бежева',
		description: 'Жовта однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб. Коли потрібно щоб було комфортно та стильно - обирай базову футболку та доповнюй стильними джинсами, шортами або спідницею.',
	},
];

export default function MainView() {
	const theme = useTheme();
	const { scrollYProgress } = useScroll();
	const query = useParams();
	const alias = getCategoryAlias(query);
	const filterContainer = getFilterContainer(query);

	return (
		<MainLayout>
			<ScrollProgress scrollYProgress={scrollYProgress} />
			<Filters categoryAlias={alias} filterContainer={filterContainer} />

			<Container maxWidth='lg' disableGutters>
				<CatalogGrid products={[...products, ...products, ...products.slice(0, 3)]} />
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
