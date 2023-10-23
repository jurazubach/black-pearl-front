import Iconify, { IconifyProps } from '../iconify';

type Props = {
  icon?: IconifyProps; // Right icon
};

export function LeftIcon({ icon = 'solar:double-alt-arrow-left-line-duotone' }: Props) {
  return (
    <Iconify icon={icon} />
  );
}

export function RightIcon({ icon = 'solar:double-alt-arrow-right-line-duotone' }: Props) {
  return (
    <Iconify icon={icon} />
  );
}
