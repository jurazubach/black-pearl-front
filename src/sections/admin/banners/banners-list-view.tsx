'use client';

import isEqual from 'lodash/isEqual';
import { useCallback, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
	emptyRows,
	TableEmptyRows,
	TableHeadCustom,
	TableNoData,
	TablePaginationCustom,
	useTable,
} from 'src/components/table';
import { IBannerTableFilters, STATUS_OPTIONS, IBannerTableFilterValue, IBannerItem } from 'src/types/banner';
import { DrawerIds } from 'src/context/drawer-context';
import useDrawer from 'src/hooks/use-drawer';
import BannersTableRow from './banners-table-row';
import BannersTableToolbar from './banners-table-toolbar';
import BannersTableFiltersResult from './banners-table-filters-result';

const TABLE_HEAD = [
	{ id: 'imageSrc', label: 'Зображення' },
	{ id: 'alias', label: 'Алиас' },
	{ id: 'title', label: 'Назва' },
	{ id: 'link', label: 'Посилання' },
	{ id: 'description', label: 'Опис' },
	{ id: 'status', label: 'Статус' },
	{ id: 'startAt', label: 'Дата початку' },
	{ id: 'endAt', label: 'Дата кінця' },
	{ id: '', width: 88 },
];

const defaultFilters: IBannerTableFilters = { search: '', status: 'all' };

export default function BannersListView() {
	const table = useTable({ defaultRowsPerPage: 25 });
	const confirm = useBoolean();
	const [tableData, setTableData] = useState<any[]>([]);
	const [filters, setFilters] = useState(defaultFilters);
	const { openDrawer } = useDrawer();
	const onCreateClick = useCallback(() => openDrawer({
		id: DrawerIds.BANNER_DRAWER_FORM,
		width: '768px',
	}, {}), [openDrawer]);

	const dataInPage = tableData.slice(
		table.page * table.rowsPerPage,
		table.page * table.rowsPerPage + table.rowsPerPage,
	);

	const canReset = !isEqual(defaultFilters, filters);
	const notFound = (!tableData.length && canReset) || !tableData.length;

	const handleFilters = useCallback(
		(name: string, value: IBannerTableFilterValue) => {
			table.onResetPage();
			setFilters((prevState) => ({ ...prevState, [name]: value }));
		},
		[table],
	);

	const handleDeleteRow = useCallback(
		(id: string) => {
			const deleteRow = tableData.filter((row) => row.id !== id);
			setTableData(deleteRow);

			table.onUpdatePageDeleteRow(dataInPage.length);
		},
		[dataInPage.length, table, tableData],
	);

	const handleDeleteRows = useCallback(() => {
		const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
		setTableData(deleteRows);

		table.onUpdatePageDeleteRows({
			totalRows: tableData.length,
			totalRowsInPage: dataInPage.length,
			totalRowsFiltered: tableData.length,
		});
	}, [dataInPage.length, table, tableData]);

	const handleEditRow = useCallback(
		(row: IBannerItem) => {
			openDrawer({ id: DrawerIds.BANNER_DRAWER_FORM, width: '768px' }, { Banner: row });
		},
		[openDrawer],
	);

	const handleFilterStatus = useCallback(
		(event: React.SyntheticEvent, newValue: string) => handleFilters('status', newValue),
		[handleFilters],
	);

	const handleResetFilters = useCallback(() => {
		setFilters(defaultFilters);
	}, []);

	return (
		<>
			<Container maxWidth='lg'>
				<CustomBreadcrumbs
					heading='Баннери'
					action={
						<Button
							onClick={onCreateClick}
							variant='contained'
							startIcon={<Iconify icon='mingcute:add-line' />}
						>
							Створити новий
						</Button>
					}
					sx={{ mb: { xs: 3, md: 5 } }}
				/>

				<Card>
					<Tabs
						value={filters.status}
						onChange={handleFilterStatus}
						sx={{ px: 2.5, boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}` }}
					>
						{STATUS_OPTIONS.map((tab) => (
							<Tab key={tab.value} iconPosition='end' value={tab.value} label={tab.label} />
						))}
					</Tabs>

					<BannersTableToolbar filters={filters} onFilters={handleFilters} />

					{canReset && (
						<BannersTableFiltersResult
							filters={filters}
							onFilters={handleFilters}
							onResetFilters={handleResetFilters}
							results={tableData.length}
							sx={{ p: 2.5, pt: 0 }}
						/>
					)}

					<TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
						<Scrollbar>
							<Table size='small' sx={{ minWidth: 960 }}>
								<TableHeadCustom
									order={table.order}
									orderBy={table.orderBy}
									headLabel={TABLE_HEAD}
									rowCount={tableData.length}
								/>

								<TableBody>
									{tableData
										.slice(
											table.page * table.rowsPerPage,
											table.page * table.rowsPerPage + table.rowsPerPage,
										)
										.map((row) => (
											<BannersTableRow
												key={row.id}
												row={row}
												selected={table.selected.includes(row.id)}
												onDeleteRow={() => handleDeleteRow(row)}
												onEditRow={() => handleEditRow(row)}
											/>
										))}

									<TableEmptyRows
										height={52}
										emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
									/>

									<TableNoData notFound={notFound} />
								</TableBody>
							</Table>
						</Scrollbar>
					</TableContainer>

					<TablePaginationCustom
						count={tableData.length}
						page={table.page}
						rowsPerPage={table.rowsPerPage}
						onPageChange={table.onChangePage}
						onRowsPerPageChange={table.onChangeRowsPerPage}
					/>
				</Card>
			</Container>

			<ConfirmDialog
				open={confirm.value}
				onClose={confirm.onFalse}
				title='Delete'
				content={
					<>
						Are you sure want to delete <strong> {table.selected.length} </strong> items?
					</>
				}
				action={
					<Button
						variant='contained'
						color='error'
						onClick={() => {
							handleDeleteRows();
							confirm.onFalse();
						}}
					>
						Delete
					</Button>
				}
			/>
		</>
	);
}
