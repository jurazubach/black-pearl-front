import QS from 'querystring';
import {
  DEFAULT_PAGE,
  DEFAULT_SORT,
  FILTER_DELIMITER,
  FILTER_VALUE_DELIMITER,
  LISTEN_FILTERS, TSortPage,
} from './get-filter-container';

const DEFAULT_EMPTY_CONTAINER = {
  currentPage: DEFAULT_PAGE,
  list: {},
  sort: DEFAULT_SORT,
  queryParams: {},
};

class UrlBuilder {
  private _filterContainer: any;

  private _baseUrl: any;

  private _page: any;

  private _filters: any;

  private _sort: any;

  private _queryParams: any;

  constructor({ baseUrl = '', filterContainer = DEFAULT_EMPTY_CONTAINER }) {
    this._filterContainer = filterContainer;
    this._baseUrl = baseUrl;
    this._page = filterContainer.currentPage;
    this._sort = filterContainer.sort;
    this._filters = filterContainer.list;
    this._queryParams = filterContainer.queryParams;
  }

  setPage(page: number = DEFAULT_PAGE) {
    this._page = Number(page);

    return this;
  }

  setSort(sort: TSortPage = DEFAULT_SORT) {
    this._sort = sort;

    return this;
  }

  setFilters(filters = {}) {
    const _filters: any = {};
    Object.entries(filters).forEach(([filterKey, filterValues]) => {
      if (Array.isArray(filterValues) && filterValues.length > 0) {
        _filters[filterKey] = filterValues;
      }
    });

    this._filters = _filters;

    return this;
  }

  setQueryParams(queryParams = {}) {
    this._queryParams = queryParams;

    return this;
  }

  toFirstPage() {
    this._page = DEFAULT_PAGE;

    return this.build();
  }

  buildPrevPage() {
    this._page = this._filterContainer.prevPage;

    return this.build();
  }

  buildNextPage() {
    this._page = this._filterContainer.nextPage;

    return this.build();
  }

  build() {
    const basePath = this._baseUrl;
    const page = this._page;
    const sort = this._sort;
    const filters = this._filters;
    const queryParams = this._queryParams;

    const filterUrls = [];
    if (page > 1) filterUrls.push(`${LISTEN_FILTERS.PAGE}=${page}`);
    if (sort !== DEFAULT_SORT) filterUrls.push(`${LISTEN_FILTERS.SORT}=${sort}`);

    Object.entries(filters).forEach(([filterName, filterValue]) => {
      if (filterName && Array.isArray(filterValue)) {
        filterUrls.push(`${filterName}${FILTER_DELIMITER}${filterValue.join(FILTER_VALUE_DELIMITER)}`);
      }
    });

    const filterPath = filterUrls.length > 0 ? `/${filterUrls.join('/')}` : '';
    const resultQueryParams = Object.keys(queryParams).length > 0 ? `?${QS.stringify(queryParams)}` : '';

    return `${basePath}${filterPath}${resultQueryParams}`;
  }
}

export default UrlBuilder;
