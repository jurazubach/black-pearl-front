import React, { useCallback, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import _omit from 'lodash/omit';
import Box from '@mui/material/Box';
import UrlBuilder from 'src/utils/url-builder';
import { PATH_PAGE } from 'src/routes/paths';
import { IFilterContainerOut, LISTEN_FILTERS } from 'src/utils/get-filter-container';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { IFilterModels } from 'src/types/filters';
import Scrollbar from 'src/components/scrollbar';
import { varFade } from '../animate';
import { m } from 'framer-motion';

interface Props {
	categoryFilters: IFilterModels;
	categoryAlias: string;
	filterContainer: IFilterContainerOut;
}

const variantsContainer = {
	hidden: varFade().in.initial,
	show: {
		...varFade().in.animate,
		transition: { ...varFade().in.animate.transition, staggerChildren: 0.05 }
	},
};

const variantsVarFadeInRight = {
	hidden: varFade().in.initial,
	show: varFade().in.animate
};

const FilterChips = ({ categoryFilters, categoryAlias, filterContainer }: Props) => {
	const router = useRouter();
	const mdUp = useResponsive('up', 'md');

	const getPropertyFromFilters = useCallback((propertyAlias: string) => {
		if (propertyAlias === LISTEN_FILTERS.SIZE) {
			return { children: categoryFilters.sizes };
		}

		return categoryFilters.properties.find((i) => i.alias === propertyAlias);
	}, [categoryFilters]);

	const chipsMemo = useMemo(() => {
		const chips: React.ReactNode[] = [];

		Object.entries(filterContainer.list).forEach(([filterKey, filterValues]) => {
			if (Array.isArray(filterValues) && filterValues.length > 0) {
				const categoryProperty = getPropertyFromFilters(filterKey);

				if (categoryProperty) {
					filterValues.forEach((filterValue) => {
						const categoryPropertyValue = categoryProperty.children.find((i) => i.alias === filterValue);

						if (categoryPropertyValue) {
							const restValues = filterValues.filter((i) => i !== filterValue);
							let nextFilters = {};

							if (restValues.length > 0) {
								nextFilters = { ...filterContainer.list, [filterKey]: restValues };
							} else {
								nextFilters = _omit(filterContainer.list, [filterKey]);
							}

							const nextUrl = new UrlBuilder({ baseUrl: `${PATH_PAGE.catalog}/${categoryAlias}` })
								.setPage(1)
								.setSort(filterContainer.sort)
								.setFilters(nextFilters)
								.build();

							chips.push(
								<m.div variants={variantsVarFadeInRight} key={`${categoryPropertyValue.title}_${categoryPropertyValue.alias}`}>
									<Chip
										key={categoryPropertyValue.alias}
										label={categoryPropertyValue.title}
										variant='outlined'
										onDelete={() => router.push(nextUrl)}
									/>
								</m.div>,
							);
						}
					});
				}
			}
		});

		return chips;
	}, [filterContainer, router, categoryAlias, getPropertyFromFilters]);

	if (chipsMemo.length === 0 || !mdUp) {
		return null;
	}

	return (
		<Box sx={{ width: 'calc(100vw - 221px - 80px)', maxWidth: '1660px' }}>
			<Scrollbar sx={{ '.simplebar-horizontal': { display: 'none' } }}>
				<m.div variants={variantsContainer} initial="hidden" animate="show">
					<Stack direction='row' spacing={1} alignItems='center'>
						{chipsMemo}
					</Stack>
				</m.div>
			</Scrollbar>
		</Box>
	);
};

export default FilterChips;
