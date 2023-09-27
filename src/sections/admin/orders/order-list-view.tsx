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
import { IOrderTableFilterValue, IOrderTableFilters , IOrderItem } from 'src/types/order';
import useDrawer from 'src/hooks/use-drawer';
import { DrawerIds } from 'src/context/drawer-context';
import OrderTableFiltersResult from './order-table-filters-result';
import OrderTableToolbar from './order-table-toolbar';
import OrderTableRow from './order-table-row';

const STATUS_OPTIONS = [
	{ value: 'all', label: 'Всі' },
	{ value: 'open', label: 'Нові' },
	{ value: 'processing', label: 'В процессі' },
	{ value: 'delivering', label: 'В дорозі' },
	{ value: 'delivered', label: 'На пошті' },
	{ value: 'completed', label: 'Виконанні' },
	{ value: 'canceled', label: 'Відмова' },
];

const TABLE_HEAD = [
	{ id: 'orderNumber', label: '№' },
	{ id: 'status', label: 'Статус' },
	{ id: 'firstName', label: 'Имя' },
	{ id: 'lastName', label: 'Прізвище' },
	{ id: 'email', label: 'Email' },
	{ id: 'phone', label: 'Телефон' },
	{ id: 'post', label: 'Доставка' },
	{ id: 'coupon', label: 'Купон' },
	{ id: 'payment', label: 'Статус оплати' },
	{ id: 'paymentType', label: 'Тип оплати' },
	{ id: 'createdAt', label: 'Дата' },
	{ id: '', width: 88 },
];

const defaultFilters: IOrderTableFilters = { search: '', payment: [], paymentType: [], status: 'all' };

export default function OrderListView() {
	const table = useTable({ defaultRowsPerPage: 25 });
	const confirm = useBoolean();
	const [tableData, setTableData] = useState<any[]>([]);
	const [filters, setFilters] = useState(defaultFilters);
	const { openDrawer } = useDrawer();
	const onCreateClick = useCallback(() => openDrawer({
		id: DrawerIds.ORDER_DRAWER_FORM,
		width: '768px',
	}, {}), [openDrawer]);

	const dataInPage = tableData.slice(
		table.page * table.rowsPerPage,
		table.page * table.rowsPerPage + table.rowsPerPage,
	);

	const canReset = !isEqual(defaultFilters, filters);
	const notFound = (!tableData.length && canReset) || !tableData.length;

	const handleFilters = useCallback(
		(name: string, value: IOrderTableFilterValue) => {
			table.onResetPage();
			setFilters((prevState) => ({
				...prevState,
				[name]: value,
			}));
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
		(row: IOrderItem) => {
			openDrawer({ id: DrawerIds.ORDER_DRAWER_FORM, width: '768px' }, { Look: row });
		},
		[openDrawer],
	);

	const handleFilterStatus = useCallback(
		(event: React.SyntheticEvent, newValue: string) => {
			handleFilters('status', newValue);
		},
		[handleFilters],
	);

	const handleResetFilters = useCallback(() => {
		setFilters(defaultFilters);
	}, []);

	return (
		<>
			<Container maxWidth='lg'>
				<CustomBreadcrumbs
					heading='Замовлення'
					action={
						<Button
							onClick={onCreateClick}
							variant='contained'
							startIcon={<Iconify icon='mingcute:add-line' />}
						>
							Створити нове
						</Button>
					}
					sx={{ mb: { xs: 3, md: 5 } }}
				/>

				<Card>
					<Tabs
						value={filters.status}
						onChange={handleFilterStatus}
						sx={{
							px: 2.5,
							boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
						}}
					>
						{STATUS_OPTIONS.map((tab) => (
							<Tab
								key={tab.value}
								iconPosition='end'
								value={tab.value}
								label={tab.label}
							/>
						))}
					</Tabs>

					<OrderTableToolbar filters={filters} onFilters={handleFilters} />

					{canReset && (
						<OrderTableFiltersResult
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
											<OrderTableRow
												key={row.id}
												row={row}
												selected={table.selected.includes(row.id)}
												onDeleteRow={() => handleDeleteRow(row.id)}
												onEditRow={() => handleEditRow(row.id)}
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
