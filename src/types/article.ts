export type IArticleTableFilterValue = string | Date | null | string[];

export enum EArticleStatus {
  ACTIVE = 'active',
  INACTIVE = 'in-active',
}

export type TArticleStatus = EArticleStatus.ACTIVE | EArticleStatus.INACTIVE;

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Всі' },
  { value: EArticleStatus.ACTIVE, label: 'Активні' },
  { value: EArticleStatus.INACTIVE, label: 'Виключені' },
];

export type IArticleTableFilters = {
  search: string;
  status: TArticleStatus | 'all';
};

export type IArticleItem = {
  id: string;
  imageSrc: string;
  alias: string;
  title: string;
  description: string;
  status: TArticleStatus;
  createdAt: string;
};
