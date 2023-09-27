import React, { useState, useEffect, useCallback } from 'react';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { IFilterContainerOut } from 'src/utils/get-filter-container';
import Scrollbar from 'src/components/scrollbar/scrollbar';
import Iconify from 'src/components/iconify';
import { paper } from 'src/theme/css';
import UrlBuilder from 'src/utils/url-builder';
import { PATH_PAGE } from 'src/routes/paths';

interface Props {
	openMenu: boolean;
	openMenuToggle: () => void;
	categoryAlias: string;
	filterContainer: IFilterContainerOut;
}

const FilterDrawer = ({ openMenuToggle, categoryAlias, openMenu, filterContainer }: Props) => {
	const theme = useTheme();
	const routes = useRouter();

	const [tempFilters, setTempFilters] = useState<{ [key: string]: string[] }>(filterContainer.list as { [key: string]: string[] });

	useEffect(() => {
		if (!openMenu) {
			setTempFilters({});
		}
	}, [openMenu, setTempFilters]);

	const onResetClick = useCallback(() => {
		const nextUrl = new UrlBuilder({ baseUrl: `${PATH_PAGE.catalog}/${categoryAlias}` })
			.setPage(1)
			.setSort(filterContainer.sort)
			.build();

		openMenuToggle();

		return routes.push(nextUrl);
	}, [routes, filterContainer, categoryAlias, openMenuToggle]);


	const onApplyClick = useCallback(() => {
		const nextUrl = new UrlBuilder({ baseUrl: `${PATH_PAGE.catalog}/${categoryAlias}` })
			.setPage(1)
			.setSort(filterContainer.sort)
			.setFilters(tempFilters)
			.build();

		openMenuToggle();

		return routes.push(nextUrl);
	}, [routes, filterContainer, tempFilters, categoryAlias, openMenuToggle]);

	return (
		<Drawer
			anchor='left'
			open={openMenu}
			onClose={openMenuToggle}
			sx={{
				[`& .${drawerClasses.paper}`]: {
					...paper({ theme, bgcolor: theme.palette.background.default }),
					borderRight: { xs: 'none', sm: `1px solid ${theme.palette.divider}` },
					width: { xs: '100%', sm: '540px' },
				},
			}}
		>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				sx={{ py: 2, pr: 2, pl: 2 }}
			>
				<Typography variant='h4' sx={{ flexGrow: 1 }}>
					Фільтри
				</Typography>

				<IconButton onClick={openMenuToggle}>
					<Iconify icon='mingcute:close-line' />
				</IconButton>
			</Stack>

			<Divider />

			<Scrollbar sx={{ height: 'calc(100vh - 68px - 144px)' }}>
				<Box sx={{ padding: theme.spacing(2) }}>
					<Typography>тут надо все перематчить</Typography>
					<Typography>и подсвечивать галочками шо ми наклацали</Typography>
				</Box>
			</Scrollbar>

			<Divider />

			<Box sx={{ p: 2 }}>
				<Stack spacing={1}>
					<Button
						fullWidth
						size='large'
						variant='outlined'
						color='inherit'
						onClick={onResetClick}
						startIcon={<Iconify icon='mdi:restore' color='inherit' width={24} />}
					>
						Скасувати
					</Button>
					<Button
						fullWidth
						size='large'
						variant='contained'
						color='primary'
						onClick={onApplyClick}
						startIcon={<Iconify icon='mdi:check-all' color='inherit' width={24} />}
					>
						Застосувати
					</Button>
				</Stack>
			</Box>
		</Drawer>
	);
}

export default FilterDrawer;
