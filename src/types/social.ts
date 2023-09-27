export type ISocialTableFilterValue = string | Date | null | string[];

export enum ESocialStatus {
  ACTIVE = 'active',
  INACTIVE = 'in-active',
}

export type TSocialStatus = ESocialStatus.ACTIVE | ESocialStatus.INACTIVE;

export enum ESocialType {
  INSTAGRAM = 'instagram',
}

export type TSocialType = ESocialType.INSTAGRAM;

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Всі' },
  { value: ESocialStatus.ACTIVE, label: 'Активні' },
  { value: ESocialStatus.INACTIVE, label: 'Виключені' },
];

export type ISocialTableFilters = {
  search: string;
  status: TSocialStatus | 'all';
};

export type ISocialItem = {
  id: number;
  type: TSocialType;
  imageSrc: string;
  description: string;
  link: string;
  order: number;
  status: TSocialStatus;
};
