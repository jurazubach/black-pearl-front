import MainView from 'src/sections/product/main-view';

export const metadata = {
  title: 'Товар | The Black Pearl',
};

const product = {
  id: 5,
  code: '11654',
  alias: 'sportyvnyj_kostyum_z_trynytky_akvamaryn_zhinochyj',
  title: 'Спортивний костюм з тринитки молочний жіночий',
  description: 'Гарний та стильний костюм який зігріє тебе в прохолодну погоду. Зручний крій робить дану модель ідеальною для повсякденних справ та активного відпочинку. Костюм виготовлено з якісної тканини яка не кашлатиться та не втрачає колір навіть після багаторазового прання. Поповни свій гардероб яскравою новинкою.',
  goods: [{ id: 123, size: 'XS', oldPrice: 1400, price: 900, quantity: 6, }, { id: 125, size: 'S', oldPrice: 1400, price: 900, quantity: 6, }, { id: 127, size: 'M', oldPrice: 1400, price: 900, quantity: 6, }],
  properties: [
    { property: { title: 'Склад' }, value: { title: 'Бавовна 100%' } },
    { property: { title: 'Матеріал' }, value: { title: '3-нитка' } },
    { property: { title: 'Стать' }, value: { title: 'Жінка' } },
    { property: { title: 'Сезон' }, value: { title: 'Демисезон' } },
    { property: { title: 'Колір' }, value: { title: 'Аквамарин' } },
  ],
};

export default function ProductPage() {
  Object.assign(metadata, { title: `${product.title} | The Black Pearl` });

  return <MainView product={product} />;
}

