export enum ESortPage {
	ASC_PRICE = 'asc',
	DESC_PRICE = 'desc',
	NOVELTY = 'novelty',
	POPULAR = 'popular',
}

export type TSortPage = ESortPage.POPULAR | ESortPage.ASC_PRICE | ESortPage.DESC_PRICE | ESortPage.NOVELTY;

export const FILTER_DELIMITER = '=';
export const FILTER_VALUE_DELIMITER = '_';
export const DEFAULT_PAGE = 1;
export const DEFAULT_SORT = ESortPage.POPULAR;

export const LISTEN_FILTERS = {
	PAGE: 'page',
	SORT: 'sort',
	COLOR: 'color',
	SEX: 'sex',
	SIZE: 'size',
};

export const SortTitles = {
	[ESortPage.POPULAR]: 'популярні',
	[ESortPage.NOVELTY]: 'новинки',
	[ESortPage.ASC_PRICE]: 'дешевші',
	[ESortPage.DESC_PRICE]: 'дорожчі',
};

const VALID_FILTERS = Object.values(LISTEN_FILTERS);

function handlerPageFilters(pageFilters: string[]): { [key: string]: string | string[] } {
	return pageFilters.reduce((accumulator, currentValue) => {
		const [filterKey, filterValue] = currentValue.split(FILTER_DELIMITER);

		if (VALID_FILTERS.includes(filterKey)) {
			if (filterKey === LISTEN_FILTERS.SORT) {
				const validSort = Object.values(ESortPage).includes(filterValue as TSortPage) ? filterValue : ESortPage.POPULAR;

				return { ...accumulator, [LISTEN_FILTERS.SORT]: validSort };
			}

			return { ...accumulator, [filterKey]: filterValue.split(FILTER_VALUE_DELIMITER) };
		}

		return accumulator;
	}, {});
}

export interface IFilterContainerOut {
	list: { [key: string]: string | string[] };
	currentPage: number;
	sort: TSortPage;
	prevPage: number;
	nextPage: number;
	queryParams: { [key: string]: any };
}

function getFilterContainer(queryParams: { [key: string]: any }): IFilterContainerOut {
	const { pageFilters = [], ...otherQueryParams } = queryParams;
	const decodedPageFilters = pageFilters.map((pageFilter: string) => decodeURIComponent(pageFilter));
	const {
		[LISTEN_FILTERS.PAGE]: page = DEFAULT_PAGE,
		[LISTEN_FILTERS.SORT]: sort = DEFAULT_SORT,
		...filters
	} = handlerPageFilters(decodedPageFilters);

	const currentPage = Number(page);
	const prevPage = Number(currentPage <= 1 ? DEFAULT_PAGE : (currentPage - 1));
	const nextPage = Number(currentPage + 1);

	return {
		list: filters,
		currentPage,
		sort: sort as TSortPage,
		prevPage,
		nextPage,
		queryParams: otherQueryParams,
	};
}

export default getFilterContainer;
