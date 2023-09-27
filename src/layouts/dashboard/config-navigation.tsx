import { PATH_PAGE } from 'src/routes/paths';
import Iconify from 'src/components/iconify';

const ICON_HEIGHT = 24;

export function useNavData() {
  return [
    {
      subheader: 'Головна',
      items: [
        { title: 'Dashboard', path: PATH_PAGE.admin.dashboard, icon: <Iconify icon="material-symbols:dashboard" width={ICON_HEIGHT} /> },
      ],
    },
    {
      subheader: 'Контент',
      items: [
        { title: 'Баннери', path: PATH_PAGE.admin.banners, icon: <Iconify icon="ic:round-view-carousel" width={ICON_HEIGHT} /> },
        { title: 'Блог', path: PATH_PAGE.admin.blog, icon: <Iconify icon="ic:round-article" width={ICON_HEIGHT} /> },
        { title: 'Соц. мережі', path: PATH_PAGE.admin.social, icon: <Iconify icon="mdi:image-multiple" width={ICON_HEIGHT} /> },
      ],
    },
    {
      subheader: 'Акційні пропозиції',
      items: [
        { title: 'Купони', path: PATH_PAGE.admin.coupons, icon: <Iconify icon="ic:round-card-giftcard" width={ICON_HEIGHT} /> },
        { title: 'Акції', path: PATH_PAGE.admin.promotions, icon: <Iconify icon="ic:baseline-discount" width={ICON_HEIGHT} /> },
      ],
    },
    {
      subheader: 'Склад та товари',
      items: [
        { title: 'Категорії товарів', path: PATH_PAGE.admin.categories, icon: <Iconify icon="material-symbols:category" width={ICON_HEIGHT} /> },
        { title: 'Товари', path: PATH_PAGE.admin.products, icon: <Iconify icon="material-symbols:description" width={ICON_HEIGHT} /> },
        { title: 'Образи з товарів', path: PATH_PAGE.admin.looks, icon: <Iconify icon="ic:baseline-color-lens" width={ICON_HEIGHT} /> },
        { title: 'Склад товарів', path: PATH_PAGE.admin.warehouse, icon: <Iconify icon="material-symbols:warehouse" width={ICON_HEIGHT} /> },
      ],
    },
    {
      subheader: 'Покупки',
      items: [
        { title: 'Замовлення', path: PATH_PAGE.admin.orders, icon: <Iconify icon="material-symbols:shopping-cart" width={ICON_HEIGHT} /> },
        { title: 'Клієнти', path: PATH_PAGE.admin.customers, icon: <Iconify icon="mdi:user-supervisor-circle" width={ICON_HEIGHT} /> },
      ],
    },
  ];
}
