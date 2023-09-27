'use client';

import { useScroll } from 'framer-motion';
import Container from '@mui/material/Container';
import MainLayout from 'src/layouts/main';
import ScrollProgress from 'src/components/scroll-progress';
import ContainerTitle from 'src/components/container-title';
import CarouselProducts from 'src/sections/_examples/extra/carousel-view/carousel-products';
import CarouselAnimation from 'src/sections/_examples/extra/carousel-view/carousel-animation';
import CarouselPosts from 'src/sections/_examples/extra/carousel-view/carousel-posts';
import CarouselInstagramPosts from 'src/sections/_examples/extra/carousel-view/carousel-instagram-posts';
import { _mock } from 'src/_mock';
import AboutUs from '../about-us';

const images = [
	'https://cdn3.lichi.com/constructor/static//28/2/fdvf.jpg',
	'https://cdn3.lichi.com/constructor/static//28/2/ddsd.jpg',
	'https://cdn3.lichi.com/constructor/static//28/2/fdvf.jpg',
	'https://cdn3.lichi.com/constructor/static//28/2/ddsd.jpg',
	'https://cdn3.lichi.com/constructor/static//28/2/fdvf.jpg',
	'https://cdn3.lichi.com/constructor/static//28/2/ddsd.jpg',
	// 'https://media.zoho.in.ua/resized-images/4cb9bb17-4fbd-4db2-b161-f72de973711c-W1000?v=1685558522278',
	// 'https://media.zoho.in.ua/5c197335-6091-4edb-97ec-399d82c07d25?v=1685560168494',
	// 'https://media.zoho.in.ua/49ce71e2-62ce-4839-93ad-d000b49d3a0e?v=1687041598746',
	// 'https://media.zoho.in.ua/d38c7f8e-2ff4-4147-9472-f0a148271044?v=1685554868008',
	// 'https://media.zoho.in.ua/a0b89399-7f16-4f8f-a5f0-de3f0016b09a?v=1685575774541',
];

const _carouselsExample = [...Array(4)].map((_, index) => ({
	id: _mock.id(index),
	title: _mock.postTitle(index),
	coverUrl: images[index],
	description: _mock.description(index),
}));

const popularProducts = [
	{
		id: 5,
		title: 'Футболка базова бежева',
		description: 'Жовта однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб. Коли потрібно щоб було комфортно та стильно - обирай базову футболку та доповнюй стильними джинсами, шортами або спідницею.',
	},
	{
		id: 11,
		title: 'Спортивний костюм з тринитки молочний жіночий',
		description: 'Гарний та стильний костюм який зігріє тебе в прохолодну погоду. Зручний крій робить дану модель ідеальною для повсякденних справ та активного відпочинку. Костюм виготовлено з якісної тканини яка не кашлатиться та не втрачає колір навіть після багаторазового прання. Поповни свій гардероб яскравою новинкою.',
	},

	{
		id: 7,
		title: 'Футболка базова аквамарин',
		description: 'Аквамарин однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб. Коли потрібно щоб було комфортно та стильно - обирай базову футболку та доповнюй стильними джинсами, шортами або спідницею.',
	},
	{
		id: 9,
		title: 'Спортивний костюм з тринитки малахіт жіночий',
		description: 'Гарний та стильний костюм який зігріє тебе в прохолодну погоду. Зручний крій робить дану модель ідеальною для повсякденних справ та активного відпочинку. Костюм виготовлено з якісної тканини яка не кашлатиться та не втрачає колір навіть після багаторазового прання. Поповни свій гардероб яскравою новинкою.',
	},
	{
		id: 3,
		title: 'Спортивний костюм з тринитки малахіт жіночий',
		description: 'Гарний та стильний костюм який зігріє тебе в прохолодну погоду. Зручний крій робить дану модель ідеальною для повсякденних справ та активного відпочинку. Костюм виготовлено з якісної тканини яка не кашлатиться та не втрачає колір навіть після багаторазового прання. Поповни свій гардероб яскравою новинкою.',
	},
];
const noveltyProducts = [
	{
		id: 5,
		title: 'Спортивний костюм з тринитки молочний жіночий',
		description: 'Гарний та стильний костюм який зігріє тебе в прохолодну погоду. Зручний крій робить дану модель ідеальною для повсякденних справ та активного відпочинку. Костюм виготовлено з якісної тканини яка не кашлатиться та не втрачає колір навіть після багаторазового прання. Поповни свій гардероб яскравою новинкою.',
	},
	{
		id: 7,
		title: 'Спортивний костюм з тринитки малахіт жіночий',
		description: 'Гарний та стильний костюм який зігріє тебе в прохолодну погоду. Зручний крій робить дану модель ідеальною для повсякденних справ та активного відпочинку. Костюм виготовлено з якісної тканини яка не кашлатиться та не втрачає колір навіть після багаторазового прання. Поповни свій гардероб яскравою новинкою.',
	},
	{
		id: 9,
		title: 'Футболка базова аквамарин',
		description: 'Аквамарин однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб. Коли потрібно щоб було комфортно та стильно - обирай базову футболку та доповнюй стильними джинсами, шортами або спідницею.',
	},
	{
		id: 11,
		title: 'Футболка базова бежева',
		description: 'Жовта однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб. Коли потрібно щоб було комфортно та стильно - обирай базову футболку та доповнюй стильними джинсами, шортами або спідницею.',
	},
	{
		id: 13,
		title: 'Футболка базова бежева',
		description: 'Жовта однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб. Коли потрібно щоб було комфортно та стильно - обирай базову футболку та доповнюй стильними джинсами, шортами або спідницею.',
	},
];

const posts = [
	{
		id: 123,
		href: '/fawdawdwadaw',
		imageSrc: 'https://wwd.com/wp-content/uploads/2023/01/3-2.jpg',
		title: 'Жовта однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб',
		date: '2023-01-20 20:05:00',
	},
	{
		id: 125,
		href: '/dgwadwda',
		imageSrc: 'https://wwd.com/wp-content/uploads/2023/01/3-2.jpg',
		title: 'Жовта однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб',
		date: '2023-01-20 20:05:00',
	},
	{
		id: 125,
		href: '/greeegw',
		imageSrc: 'https://wwd.com/wp-content/uploads/2023/01/3-2.jpg',
		title: 'Жовта однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб',
		date: '2023-01-20 20:05:00',
	},
	{
		id: 126,
		href: '/greeegw',
		imageSrc: 'https://wwd.com/wp-content/uploads/2023/01/3-2.jpg',
		title: 'Жовта однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб',
		date: '2023-01-20 20:05:00',
	},
	{
		id: 127,
		href: '/greeegw',
		imageSrc: 'https://wwd.com/wp-content/uploads/2023/01/3-2.jpg',
		title: 'Жовта однотонна базова футболка - річ, яка легко впишеться в будь-який гардероб',
		date: '2023-01-20 20:05:00',
	},
];

const instagramPosts = [
	{
		id: 231,
		description: 'Вже встиг оцінити оновлені штани «Nero D»? 👀\n' +
			'\n' +
			'Пояс на резинці, великі зручні кишені, регульований низ штанини — модель стала ще зручнішою.\n' +
			'\n' +
			'Замовляй штани з нового дропу на сайті, доки у наявності багато розмірів.',
		imageSrc: 'https://scontent-iev1-1.cdninstagram.com/v/t39.30808-6/366667596_18275163151147863_5552899451945310524_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08&_nc_ht=scontent-iev1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=nW25_oyHJyoAX_znxhv&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzE2NTczMzMwMDU3OTM4ODY0MA%3D%3D.2-ccb7-5&oh=00_AfAgBKvQOrnzYu4XXq3RoIZgaf1OLSr1_qk7W0OQKpdCZw&oe=650DF555&_nc_sid=ee9879',
	},
	{
		id: 232,
		description: 'Вже встиг оцінити оновлені штани «Nero D»? 👀\n' +
			'\n' +
			'Пояс на резинці, великі зручні кишені, регульований низ штанини — модель стала ще зручнішою.\n' +
			'\n' +
			'Замовляй штани з нового дропу на сайті, доки у наявності багато розмірів.',
		imageSrc: 'https://scontent-iev1-1.cdninstagram.com/v/t39.30808-6/365042814_18274102672147863_1407060531373401115_n.jpg?stp=dst-jpg_e35_p720x720_sh0.08&_nc_ht=scontent-iev1-1.cdninstagram.com&_nc_cat=103&_nc_ohc=wXzz0FjUkKkAX_yv4ye&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzE2MDU4NjEwNDc2NjkzNTU4Mg%3D%3D.2-ccb7-5&oh=00_AfClYmvuUMDZ87CsjpYbdYC5mNhwuvKLOIY6FOjLYsDspg&oe=650EA52B&_nc_sid=ee9879',
	},
	{
		id: 233,
		description: 'Вже встиг оцінити оновлені штани «Nero D»? 👀\n' +
			'\n' +
			'Пояс на резинці, великі зручні кишені, регульований низ штанини — модель стала ще зручнішою.\n' +
			'\n' +
			'Замовляй штани з нового дропу на сайті, доки у наявності багато розмірів.',
		imageSrc: 'https://i.pinimg.com/1200x/a5/38/43/a5384304e7498a9192d90c0458f16616.jpg',
	},
	{
		id: 234,
		description: 'Вже встиг оцінити оновлені штани «Nero D»? 👀\n' +
			'\n' +
			'Пояс на резинці, великі зручні кишені, регульований низ штанини — модель стала ще зручнішою.\n' +
			'\n' +
			'Замовляй штани з нового дропу на сайті, доки у наявності багато розмірів.',
		imageSrc: 'https://wwd.com/wp-content/uploads/2023/01/3-2.jpg',
	},
	{
		id: 235,
		description: 'Вже встиг оцінити оновлені штани «Nero D»? 👀\n' +
			'\n' +
			'Пояс на резинці, великі зручні кишені, регульований низ штанини — модель стала ще зручнішою.\n' +
			'\n' +
			'Замовляй штани з нового дропу на сайті, доки у наявності багато розмірів.',
		imageSrc: 'https://cdn.shopify.com/s/files/1/2252/3393/files/WhatsApp_Image_2023-09-12_at_02.47.56_1024x1024.jpg?v=1694553455',
	},
	{
		id: 235,
		description: 'Вже встиг оцінити оновлені штани «Nero D»? 👀\n' +
			'\n' +
			'Пояс на резинці, великі зручні кишені, регульований низ штанини — модель стала ще зручнішою.\n' +
			'\n' +
			'Замовляй штани з нового дропу на сайті, доки у наявності багато розмірів.',
		imageSrc: 'https://cdn.shopify.com/s/files/1/2252/3393/files/WhatsApp_Image_2023-09-12_at_02.47.56_1024x1024.jpg?v=1694553455',
	},
	{
		id: 235,
		description: 'Вже встиг оцінити оновлені штани «Nero D»? 👀\n' +
			'\n' +
			'Пояс на резинці, великі зручні кишені, регульований низ штанини — модель стала ще зручнішою.\n' +
			'\n' +
			'Замовляй штани з нового дропу на сайті, доки у наявності багато розмірів.',
		imageSrc: 'https://cdn.shopify.com/s/files/1/2252/3393/files/WhatsApp_Image_2023-09-12_at_02.47.56_1024x1024.jpg?v=1694553455',
	},
	{
		id: 235,
		description: 'Вже встиг оцінити оновлені штани «Nero D»? 👀\n' +
			'\n' +
			'Пояс на резинці, великі зручні кишені, регульований низ штанини — модель стала ще зручнішою.\n' +
			'\n' +
			'Замовляй штани з нового дропу на сайті, доки у наявності багато розмірів.',
		imageSrc: 'https://cdn.shopify.com/s/files/1/2252/3393/files/WhatsApp_Image_2023-09-12_at_02.47.56_1024x1024.jpg?v=1694553455',
	},
];

export default function HomeView() {
	const { scrollYProgress } = useScroll();

	return (
		<MainLayout>
			<ScrollProgress scrollYProgress={scrollYProgress} />

			<Container maxWidth={false} disableGutters>
				<CarouselAnimation data={_carouselsExample} />
			</Container>

			<ContainerTitle center title='Хто ми?' />
			<Container maxWidth='lg'>
				<AboutUs />
			</Container>

			<ContainerTitle center title='Популярні товари' description='Обирайте з найпопулярніших моделей' />
			<Container maxWidth='lg' disableGutters>
				<CarouselProducts products={popularProducts} />
			</Container>

			<ContainerTitle center title='Новинки' description='Зустрічайте останні стильні новинки' />
			<Container maxWidth='lg' disableGutters>
				<CarouselProducts products={noveltyProducts} />
			</Container>

			<ContainerTitle center title='Ми також ведемо Блог' description='Слідкуйте за модними трендами, та нашими новинками' />
			<Container maxWidth='lg' disableGutters>
				<CarouselPosts posts={posts} />
			</Container>

			<ContainerTitle center title='Підписуйтесь на наш інстаграм' description='Наша офіційна сторінка @theblackpearl.com.ua' />
			<Container maxWidth='lg' disableGutters>
				<CarouselInstagramPosts posts={instagramPosts} />
			</Container>
		</MainLayout>
	);
}
