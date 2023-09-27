import React, { useCallback, useMemo, useState } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Iconify from 'src/components/iconify';
import { IFilterContainerOut } from 'src/utils/get-filter-container';
import SortPanel from './sort-panel';
import FilterChips from './filter-chips';
import FilterDrawer from './filter-drawer';

interface Props {
	categoryAlias: string;
	filterContainer: IFilterContainerOut;
}

const Filters = ({ categoryAlias, filterContainer }: Props) => {
	const theme = useTheme();

	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const openMenuToggle = useCallback(() => {
		setOpenMenu((prevState) => !prevState);
	}, [setOpenMenu]);

	const countFiltersApplied = useMemo(() => Object.keys(filterContainer.list).length, [filterContainer.list]);

	return (
		<Box>
			<Stack
				sx={{
					p: theme.spacing(2, 2),
					borderTop: `1px solid ${theme.palette.divider}`,
					borderBottom: `1px solid ${theme.palette.divider}`,
				}}
			>
				<Container disableGutters maxWidth='lg' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					<Stack direction='row' alignItems="center" spacing={1} sx={{ width: '100%' }}>
						<Badge
							badgeContent={countFiltersApplied}
							color='error'
							anchorOrigin={{ vertical: 'top', horizontal: 'left'}}
						>
							<Button
								variant='text'
								color='primary'
								onClick={openMenuToggle}
								startIcon={<Iconify icon='mdi:filter-multiple' color='inherit' width={24} />}
							>
								Фільтри
							</Button>
						</Badge>

						<FilterChips categoryAlias={categoryAlias} filterContainer={filterContainer} />
					</Stack>

					<SortPanel categoryAlias={categoryAlias} filterContainer={filterContainer} />
				</Container>
			</Stack>

			<FilterDrawer
				openMenu={openMenu}
				openMenuToggle={openMenuToggle}
				categoryAlias={categoryAlias}
				filterContainer={filterContainer}
			/>
		</Box>
	)
}

export default Filters;
