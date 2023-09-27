export type ILookTableFilterValue = string | Date | null | string[];

export enum ELookStatus {
  ACTIVE = 'active',
  INACTIVE = 'in-active',
}

export type TLookStatus = ELookStatus.ACTIVE | ELookStatus.INACTIVE;

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Всі' },
  { value: ELookStatus.ACTIVE, label: 'Активні' },
  { value: ELookStatus.INACTIVE, label: 'Виключені' },
];

export type ILookTableFilters = {
  search: string;
  status: TLookStatus | 'all';
};

export type ILookItem = {
  id: string;
  imageSrc: string;
  alias: string;
  title: string;
  description: string;
  status: TLookStatus;
  createdAt: string;
};
