'use client';

import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import { PATH_PAGE } from 'src/routes/paths';
import UrlBuilder from 'src/utils/url-builder';
import { ESortPage, IFilterContainerOut, SortTitles, TSortPage } from 'src/utils/get-filter-container';

interface ISortPanelProps {
	categoryAlias: string;
	filterContainer: IFilterContainerOut;
}

const SortPanel = ({ categoryAlias, filterContainer }: ISortPanelProps) => {
	const routes = useRouter();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget), []);
	const handleClose = useCallback(() => setAnchorEl(null), []);

	const onSortClick = useCallback((clickedSort: TSortPage) => () => {
		if (clickedSort !== filterContainer.sort) {
			setAnchorEl(null);

			const nextUrl = new UrlBuilder({ baseUrl: `${PATH_PAGE.catalog}/${categoryAlias}` })
				.setPage(1)
				.setSort(clickedSort)
				.setFilters(filterContainer.list)
				.build();

			return routes.push(nextUrl);
		}

		return false;
	}, [filterContainer, routes, categoryAlias]);

	const menuItemsMemo = useMemo(() => Object.values(ESortPage).map((sortPage) => {
		const title = SortTitles[sortPage];
		const styleOptions = { color: 'grey.100' };

		if (filterContainer.sort === sortPage) {
			Object.assign(styleOptions, { color: 'primary.main' });
		}

		return (
			<MenuItem key={sortPage} onClick={onSortClick(sortPage)}>
				<Typography variant='subtitle2' sx={styleOptions}>{title}</Typography>
			</MenuItem>
		);
	}), [filterContainer, onSortClick]);

	return (
		<Box sx={{ width: '125px' }}>
			<Button
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				startIcon={<Iconify icon='mdi:sort' color='inherit' width={24} />}
			>
				{SortTitles[filterContainer.sort]}
			</Button>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{ 'aria-labelledby': 'basic-button' }}
			>
				{menuItemsMemo}
			</Menu>
		</Box>
	);
};

export default SortPanel;
