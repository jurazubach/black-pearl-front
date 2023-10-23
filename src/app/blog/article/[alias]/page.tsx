import MainView from 'src/sections/blog-article/main-view';

export const metadata = {
  title: 'Блог | NVRMORE',
};

const blogPost = {
  id: 5,
  imageSrc: 'https://wwd.com/wp-content/uploads/2023/01/3-2.jpg',
  alias: 'sportyvnyj_kostyum_z_trynytky_akvamaryn_zhinochyj',
  title: 'Спортивний костюм з тринитки молочний жіночий',
  description: 'Гарний та стильний костюм який зігріє тебе в прохолодну погоду. Зручний крій робить дану модель ідеальною для повсякденних справ та активного відпочинку. Костюм виготовлено з якісної тканини яка не кашлатиться та не втрачає колір навіть після багаторазового прання. Поповни свій гардероб яскравою новинкою.',
};

export default function ArticleBlogPage() {
  Object.assign(metadata, { title: `${blogPost.title} | NVRMORE` });

  return <MainView post={blogPost} />;
}

