import React, { useState, useEffect, useCallback } from 'react';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled, useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/navigation';
import _isEqual from 'lodash/isEqual';
import { IFilterContainerOut, LISTEN_FILTERS } from 'src/utils/get-filter-container';
import Scrollbar from 'src/components/scrollbar/scrollbar';
import Iconify from 'src/components/iconify';
import { paper } from 'src/theme/css';
import UrlBuilder from 'src/utils/url-builder';
import { PATH_PAGE } from 'src/routes/paths';
import { IFilterModels } from 'src/types/filters';
import Label from '../label';

interface Props {
	openMenu: boolean;
	openMenuToggle: () => void;
	categoryAlias: string;
	filterContainer: IFilterContainerOut;
	categoryFilters: IFilterModels;
}

const StyledAccordionRoot = styled(Accordion)(({ theme }) => ({
	backgroundColor: 'transparent !important',
	paddingRight: theme.spacing(2),
}))

const FilterDrawer = ({ categoryFilters, openMenuToggle, categoryAlias, openMenu, filterContainer }: Props) => {
	const theme = useTheme();
	const routes = useRouter();

	const [tempFilters, setTempFilters] = useState<{ [key: string]: string[] }>(filterContainer.list as { [key: string]: string[] });

	const { sizes, properties } = categoryFilters;

	const isPropertyApply = useCallback((propertyAlias: string) => !!tempFilters[propertyAlias], [tempFilters]);
	const isPropertyValueApply = useCallback((propertyAlias: string, propertyValueAlias: string) => {
		return !!tempFilters[propertyAlias] && tempFilters[propertyAlias].includes(propertyValueAlias);
	}, [tempFilters]);

	useEffect(() => {
		setTempFilters(filterContainer.list as { [key: string]: string[] });
	}, [filterContainer]);

	const onResetClick = useCallback(() => {
		const nextUrl = new UrlBuilder({ baseUrl: `${PATH_PAGE.catalog}/${categoryAlias}` })
			.setPage(1)
			.setSort(filterContainer.sort)
			.build();

		openMenuToggle();

		return routes.push(nextUrl);
	}, [routes, filterContainer, categoryAlias, openMenuToggle]);

	const onApplyClick = useCallback(() => {
		const isFiltersEqual = _isEqual(filterContainer.list, tempFilters);
		if (isFiltersEqual) {
			openMenuToggle();
			return false;
		}

		const nextUrl = new UrlBuilder({ baseUrl: `${PATH_PAGE.catalog}/${categoryAlias}` })
			.setPage(1)
			.setSort(filterContainer.sort)
			.setFilters(tempFilters)
			.setQueryParams(filterContainer.queryParams)
			.build();

		openMenuToggle();

		return routes.push(nextUrl);
	}, [routes, filterContainer, tempFilters, categoryAlias, openMenuToggle]);

	const onFilterChange = useCallback((propertyAlias: string, propertyValueAlias: string) => {
		return () => {
			if (Array.isArray(tempFilters[propertyAlias])) {
				const isPropertyValueChecked = tempFilters[propertyAlias].includes(propertyValueAlias);
				if (isPropertyValueChecked) {
					// remove
					setTempFilters({
						...tempFilters,
						[propertyAlias]: tempFilters[propertyAlias].filter((i) => i !== propertyValueAlias),
					});
				} else {
					// add
					setTempFilters({
						...tempFilters,
						[propertyAlias]: [...tempFilters[propertyAlias], propertyValueAlias],
					});
				}
			} else {
				setTempFilters({
					...tempFilters,
					[propertyAlias]: [propertyValueAlias],
				});
			}
		};
	}, [tempFilters, setTempFilters]);

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
				<Box>
					<StyledAccordionRoot defaultExpanded>
						<AccordionSummary
							expandIcon={<Iconify icon='solar:alt-arrow-down-bold' color='primary' width={18} />}>
							<Typography variant='h6'>Розміри</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Stack>
								{sizes.map(({ alias, title }) => (
									<FormControlLabel
										key={alias}
										control={
											<Checkbox
												checked={isPropertyValueApply(LISTEN_FILTERS.SIZE, alias)}
												onClick={onFilterChange(LISTEN_FILTERS.SIZE, alias)}
											/>
										}
										label={title}
									/>
								))}
							</Stack>
						</AccordionDetails>
					</StyledAccordionRoot>

					{properties.map((property) => {
						const isPropertyApplied = isPropertyApply(property.alias);
						const countAppliedPropertyValues = isPropertyApplied ? tempFilters[property.alias].length : 0;

						const counter = (
							countAppliedPropertyValues > 0
								? (
									<Label variant='soft' color='primary'>
										<Typography variant='caption' sx={{ fontWeight: 'bold', textTransform: 'none' }}>{countAppliedPropertyValues}</Typography>
									</Label>
								)
								: null
						);

						return (
							<StyledAccordionRoot key={property.alias} defaultExpanded={isPropertyApply(property.alias)}>
								<AccordionSummary
									expandIcon={<Iconify icon='solar:alt-arrow-down-bold' color='primary' width={18} />}>
									<Typography variant='h6'>{property.title} {counter}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Stack>
										{property.children.map(({ alias, title }) => (
											<FormControlLabel
												key={alias}
												control={
													<Checkbox
														checked={isPropertyValueApply(property.alias, alias)}
														onClick={onFilterChange(property.alias, alias)}
													/>
												}
												label={title}
											/>
										))}
									</Stack>
								</AccordionDetails>
							</StyledAccordionRoot>
						);
					})}
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
						startIcon={<Iconify icon='solar:trash-bin-2-outline' color='inherit' width={24} />}
					>
						Скасувати
					</Button>
					<Button
						fullWidth
						size='large'
						variant='contained'
						color='primary'
						onClick={onApplyClick}
						startIcon={<Iconify icon='solar:checklist-broken' color='inherit' width={24} />}
					>
						Застосувати
					</Button>
				</Stack>
			</Box>
		</Drawer>
	);
}

export default FilterDrawer;
