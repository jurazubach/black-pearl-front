export type IBannerTableFilterValue = string | Date | null | string[];

export enum EBannerStatus {
  ACTIVE = 'active',
  INACTIVE = 'in-active',
}

export type TBannerStatus = EBannerStatus.ACTIVE | EBannerStatus.INACTIVE;

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Всі' },
  { value: EBannerStatus.ACTIVE, label: 'Активні' },
  { value: EBannerStatus.INACTIVE, label: 'Виключені' },
];

export type IBannerTableFilters = {
  search: string;
  status: TBannerStatus | 'all';
};

export type IBannerItem = {
  id: string;
  imageSrc: string;
  alias: string;
  title: string;
  description: string;
  link: string;
  order: number;
  status: TBannerStatus;
  startAt: string;
  endAt: string;
};
