export type IPromotionTableFilterValue = string | Date | null | string[];

export enum EPromotionStatus {
  ACTIVE = 'active',
  INACTIVE = 'in-active',
}

export type TPromotionStatus = EPromotionStatus.ACTIVE | EPromotionStatus.INACTIVE;

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Всі' },
  { value: EPromotionStatus.ACTIVE, label: 'Активні' },
  { value: EPromotionStatus.INACTIVE, label: 'Виключені' },
];

export type IPromotionTableFilters = {
  search: string;
  status: TPromotionStatus | 'all';
};

export type IPromotionItem = {
  id: string;
  imageSrc: string;
  alias: string;
  title: string;
  description: string;
  status: TPromotionStatus;
  startAt: string;
  endAt: string;
};
