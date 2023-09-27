export type ICategoryTableFilterValue = string | Date | null | string[];

export enum ECategoryStatus {
  ACTIVE = 'active',
  INACTIVE = 'in-active',
}

export type TCategoryStatus = ECategoryStatus.ACTIVE | ECategoryStatus.INACTIVE;

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Всі' },
  { value: ECategoryStatus.ACTIVE, label: 'Активні' },
  { value: ECategoryStatus.INACTIVE, label: 'Виключені' },
];

export type ICategoryTableFilters = {
  search: string;
  status: TCategoryStatus | 'all';
};

export type ICategoryItem = {
  id: string;
  alias: string;
  singleTitle: string;
  multipleTitle: string;
  description?: string;
  status?: TCategoryStatus;
};
