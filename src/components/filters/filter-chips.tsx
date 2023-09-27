import React, { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import _omit from 'lodash/omit';
import UrlBuilder from 'src/utils/url-builder';
import { PATH_PAGE } from 'src/routes/paths';
import { IFilterContainerOut } from 'src/utils/get-filter-container';
import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';

interface Props {
	categoryAlias: string;
	filterContainer: IFilterContainerOut;
}

const FilterChips = ({ categoryAlias, filterContainer }: Props) => {
	const router = useRouter();
	const smUp = useResponsive('up', 'sm');

	const chipsMemo = useMemo(() => {
		const chips: React.ReactNode[] = [];

		Object.entries(filterContainer.list).forEach(([filterKey, filterValues]) => {
			if (Array.isArray(filterValues) && filterValues.length > 0) {
				filterValues.forEach((filterValue) => {
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
						<Chip
							key={filterValue}
							label={filterValue}
							variant="outlined"
							onDelete={() => router.push(nextUrl)}
						/>
					);
				})
			}
		});

		return chips;
	}, [filterContainer, router, categoryAlias]);

	if (chipsMemo.length === 0 || !smUp) {
		return null;
	}

	return (
		<Stack direction="row" spacing={1} alignItems="center">
			{chipsMemo}
		</Stack>
	);
};

export default FilterChips;
