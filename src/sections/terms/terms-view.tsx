'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MainLayout from 'src/layouts/main';
import ContainerTitle from 'src/components/container-title';

const StyledSquare = styled(Box)(({ theme }) => ({
	width: theme.spacing(2),
	height: theme.spacing(2),
	marginTop: '6px',
	backgroundColor: theme.palette.primary.main,
	paddingRight: theme.spacing(2),
}));

const SquaredText = ({ children }: { children: string }) => (
		<Stack direction='row' spacing={1} justifyContent='flex-start' alignItems='flex-start'>
			<StyledSquare />
			<Typography>{children}</Typography>
		</Stack>
	)

export default function TermsView() {
	return (
		<MainLayout>
			<ContainerTitle center title='Угода користувача' />

			<Container maxWidth='xl'>
				<Stack direction='column' spacing={3}>
					<Typography variant='h4' sx={{ mt: 3 }}>1. ЗАГАЛЬНІ ПОЛОЖЕННЯ</Typography>

					<Stack direction='column' spacing={1} sx={{ paddingLeft: '20px' }}>
						<SquaredText>1.1 Ця Угода користувача (далі – Угода) відноситься до сайту Інтернет-магазину «The Black Pearl», розташованого за адресою https://theblackpearl.com.ua/, та до всіх відповідних сайтів, пов'язаних з сайтом www.theblackpearl.com.ua.</SquaredText>
						<SquaredText>1.2 Сайт Інтернет-магазину The Black Pearl (далі – Сайт) є власністю ТОВ "The Black Pearl".</SquaredText>
						<SquaredText>1.3 Договір оферти, є офіційною пропозицією, далі за текстом - «Продавець», укласти Договір купівлі-продажу товарів дистанційним способом, а саме через Інтернет-магазин, далі по тексту - «Договір», і розміщує Публічну оферту (пропозицію) на офіційному інтернет-сайті Продавця www.theblackpearl.com.ua (далі - «Інтернет-сайт»).</SquaredText>
						<SquaredText>1.4 Ця Угода регулює відносини між Адміністрацією сайту Інтернет-магазину «The Black Pearl» (далі – Адміністрація сайту) та Користувачем цього Сайту.</SquaredText>
						<SquaredText>1.5 Адміністрація сайту залишає за собою право в будь-який час змінювати, додавати або видаляти пункти цієї Угоди без попередження Користувача.</SquaredText>
						<SquaredText>1.6 Продовження використання Сайту Користувачем означає прийняття Угоди та змін, внесених до цієї Угоди.</SquaredText>
						<SquaredText>1.7 Користувач несе персональну відповідальність за перевірку цієї Угоди на наявність змін у ній.</SquaredText>
					</Stack>
				</Stack>

				<Stack direction='column' spacing={3}>
					<Typography variant='h4' sx={{ mt: 3 }}>2. ВИЗНАЧЕННЯ ТЕРМІНІВ</Typography>

					<Stack direction='column' spacing={1} sx={{ paddingLeft: '20px' }}>
						<SquaredText>2.1 Наведені нижче терміни мають для цілей цієї Угоди таке значення</SquaredText>
						<SquaredText>2.1.1 «The Black Pearl» – Інтернет-магазин, розташований на доменному імені www.theblackpearl.com.ua, який здійснює свою діяльність за допомогою Інтернет-ресурсу та супутніх йому сервісів.</SquaredText>
						<SquaredText>2.1.2 Інтернет-магазин – сайт, що містить інформацію про Товари, Продавця, що дозволяє здійснити вибір, замовлення та (або) придбання Товару.</SquaredText>
						<SquaredText>2.1.3 Адміністрація сайту Інтернет-магазину – уповноважені працівники на управління Сайтом, які діють від імені організації.</SquaredText>
						<SquaredText>2.1.4 Користувач сайту Інтернет-магазину (далі Користувач) – особа, яка має доступ до Сайту через мережу Інтернет та використовує Сайт.</SquaredText>
						<SquaredText>2.1.5 Зміст сайту Інтернет-магазину (далі – Зміст) - результати інтелектуальної діяльності, що охороняються, включаючи тексти літературних творів, їх назви, передмови, анотації, статті, ілюстрації, обкладинки, музичні твори з текстом або без тексту, графічні, текстові, фотографічні, похідні, складові та інші твори, інтерфейси користувача, візуальні інтерфейси, назви товарних знаків, логотипи, програми для ЕОМ, бази даних, а також дизайн, структура, вибір, координація, зовнішній вигляд, загальний стиль і розташування даного Змісту, що входить у склад Сайту та інші об'єкти інтелектуальної власності всі разом та/або окремо, що містяться на сайті Інтернет-магазину.</SquaredText>
					</Stack>
				</Stack>

				<Stack direction='column' spacing={3}>
					<Typography variant='h4' sx={{ mt: 3 }}>3. ПРЕДМЕТ УГОДИ</Typography>

					<Stack direction='column' spacing={1} sx={{ paddingLeft: '20px' }}>
						<SquaredText>3.1 Предметом цієї Угоди є надання Користувачеві Інтернет-магазину доступу до Товарів та послуг, що містяться на Сайті.</SquaredText>
						<SquaredText>3.1.1 Інтернет-магазин надає Користувачеві такі види послуг (сервісів):</SquaredText>
						<SquaredText>доступ до електронного контенту на платній основі, з правом придбання (завантаження), перегляду контенту;</SquaredText>
						<SquaredText>доступ до засобів пошуку та навігації Інтернет-магазину;</SquaredText>
						<SquaredText>надання Користувачеві можливості розміщення повідомлень, коментарів, рецензій Користувачів, виставлення оцінок контенту Інтернет-магазину;</SquaredText>
						<SquaredText>доступ до інформації про Товар та інформацію про придбання Товару на платній основі;</SquaredText>
						<SquaredText>інші види послуг (сервісів), що реалізуються на сторінках Інтернет-магазину.</SquaredText>
						<SquaredText>3.1.2 Під дію цієї Угоди підпадають усі існуючі (реально функціонуючі) на даний момент послуги (сервіси) Інтернет-магазину, а також будь-які їх подальші модифікації та додаткові послуги (сервіси) Інтернет-магазину, що з'являються надалі.</SquaredText>
						<SquaredText>3.2 Доступ до Інтернет-магазину надається безкоштовно.</SquaredText>
						<SquaredText>3.3 Ця Угода є публічною офертою. Отримуючи доступ до Сайту Користувач вважається таким, що приєднався до цієї Угоди.</SquaredText>
						<SquaredText>3.4 Використання матеріалів та сервісів Сайту регулюється нормами чинного законодавства України.</SquaredText>
					</Stack>

				</Stack>

				<Stack direction='column' spacing={3}>
					<Typography variant='h4' sx={{ mt: 3 }}>4. ПРАВА ТА ОБОВ'ЯЗКИ СТОРІН</Typography>

					<Stack direction='column' spacing={1} sx={{ paddingLeft: '20px' }}>
						<SquaredText>4.1 Адміністрація сайту має право:</SquaredText>
						<SquaredText>4.1.1 Змінювати правила користування Сайтом, а також змінювати зміст цього Сайту. Зміни набирають чинності з моменту опублікування нової редакції Угоди на Сайті.</SquaredText>
						<SquaredText>4.1.2 Обмежити доступ до Сайту у разі порушення Користувачем умов цієї Угоди.</SquaredText>
						<SquaredText>4.1.3 Змінювати розмір оплати, що стягується за доступ до використання сайту Інтернет-магазину. Зміна вартості не поширюватиметься на Користувачів, які мають реєстрацію до моменту зміни розміру оплати, за винятком випадків, особливо обумовлених Адміністрацією сайту інтернет-магазину.</SquaredText>
						<SquaredText>4.2 Користувач має право:</SquaredText>
						<SquaredText>4.2.1 Отримати доступ до використання Сайту після дотримання вимог щодо реєстрації та оплати.</SquaredText>
						<SquaredText>4.2.2 Користуватися всіма послугами, що є на Сайті, а також купувати будь-які Товари, що пропонуються на Сайті.</SquaredText>
						<SquaredText>4.2.3 Задавати будь-які питання, що стосуються послуг Інтернет-магазину за реквізитами, що знаходяться у розділі Сайту «Назва розділу».</SquaredText>
						<SquaredText>4.2.4 Користуватися Сайтом виключно з метою та порядком, передбаченим Угодою та не забороненим законодавством України.</SquaredText>
						<SquaredText>4.3 Користувач Сайту зобов'язується:</SquaredText>
						<SquaredText>4.3.1 Надавати за запитом Адміністрації сайту додаткову інформацію, яка має безпосереднє відношення до послуг цього Сайту, що надаються.</SquaredText>
						<SquaredText>4.3.2 Дотримуватися майнових та немайнових прав авторів та інших правовласників при використанні Сайту.</SquaredText>
						<SquaredText>4.3.3 Не вживати дій, які можуть розглядатися як такі, що порушують нормальну роботу Сайту.</SquaredText>
						<SquaredText>4.3.4 Не розповсюджувати з використанням Сайту будь-яку конфіденційну інформацію та інформацію, що охороняється законодавством України про фізичних чи юридичних осіб.</SquaredText>
						<SquaredText>4.3.5 Уникати будь-яких дій, внаслідок яких може бути порушена конфіденційність інформації, що охороняється законодавством України.</SquaredText>
						<SquaredText>4.3.6 Не використовувати Сайт для поширення інформації рекламного характеру, інакше як за згодою Адміністрації сайту.</SquaredText>
						<SquaredText>4.3.7 Не використовувати сервіси сайту Інтернет-магазину з метою:</SquaredText>
						<SquaredText>4.3.7.1 завантаження контенту, що є незаконним, порушує будь-які права третіх осіб; пропагує насильство, жорстокість, ненависть та (або) дискримінацію за расовою, національною, статевою, релігійною, соціальною ознаками; містить недостовірні відомості та (або) образи на адресу конкретних осіб, організацій, органів влади.</SquaredText>
						<SquaredText>4.3.7.2 спонукання до вчинення протиправних дій, а також сприяння особам, дії яких спрямовані на порушення обмежень та заборон, що діють на території України.</SquaredText>
						<SquaredText>4.3.7.3 3 порушення прав неповнолітніх осіб та (або) заподіяння їм шкоди у будь-якій формі.</SquaredText>
						<SquaredText>4.3.7.4 обмеження прав меншин.</SquaredText>
						<SquaredText>4.3.7.5 подання себе за іншу людину або представника організації та (або) спільноти без достатніх на те прав, у тому числі за працівників цього Інтернет-магазину.</SquaredText>
						<SquaredText>4.3.7.6 введення в оману щодо властивостей та характеристик будь-якого Товару з каталогу Інтернет-магазину, розміщеного на Сайті.</SquaredText>
						<SquaredText>4.3.7.7 некоректного порівняння Товару, а також формування негативного ставлення до осіб, які не користуються певними Товарами, або засудження таких осіб.</SquaredText>
						<SquaredText>4.4 Користувачеві забороняється:</SquaredText>
						<SquaredText>4.4.1 Використовувати будь-які пристрої, програми, процедури, алгоритми та методи, автоматичні пристрої або еквівалентні ручні процеси для доступу, придбання, копіювання або відстеження змісту Сайту цього Інтернет-магазину;</SquaredText>
						<SquaredText>4.4.2 Порушувати належне функціонування Сайту;</SquaredText>
						<SquaredText>4.4.3 Будь-яким способом обходити навігаційну структуру Сайту для отримання або спроби отримання будь-якої інформації, документів або матеріалів будь-якими засобами, які спеціально не представлені сервісами цього Сайту;</SquaredText>
						<SquaredText>4.4.4 Несанкціонований доступ до функцій Сайту, будь-яких інших систем або мереж, що належать до цього Сайту, а також до будь-яких послуг, що пропонуються на Сайті;</SquaredText>
						<SquaredText>4.4.5 Порушувати систему безпеки або автентифікації на Сайті або будь-якій мережі, що відноситься до Сайту.</SquaredText>
						<SquaredText>4.4.6 Здійснювати зворотний пошук, відслідковувати або намагатися відстежувати будь-яку інформацію про будь-якого іншого Користувача Сайту.</SquaredText>
						<SquaredText>4.4.7 Використовувати Сайт та його Зміст у будь-яких цілях, заборонених законодавством України, а також підбурювати будь-яку незаконну діяльність або іншу діяльність, що порушує права інтернет-магазину або інших осіб.</SquaredText>
					</Stack>
				</Stack>

				<Stack direction='column' spacing={3}>
					<Typography variant='h4' sx={{ mt: 3 }}>5. ВИКОРИСТАННЯ САЙТУ ІНТЕРНЕТ-МАГАЗИНУ</Typography>

					<Stack direction='column' spacing={1} sx={{ paddingLeft: '20px' }}>
						<SquaredText>5.1 Сайт та Зміст, що входить до складу Сайту, належить та керується Адміністрацією сайту.</SquaredText>
						<SquaredText>5.2 Зміст Сайту не може бути скопійований, опублікований, відтворений, переданий або розповсюджений будь-яким способом, а також розміщений у глобальній мережі «Інтернет» без попередньої письмової згоди Адміністрації сайту.</SquaredText>
						<SquaredText>5.3 Зміст Сайту захищено авторським правом, законодавством про товарні знаки, а також іншими правами, пов'язаними з інтелектуальною власністю, та законодавством щодо недобросовісної конкуренції.</SquaredText>
						<SquaredText>5.4 Придбання Товару, який пропонується на Сайті, може вимагати створення облікового запису Користувача.</SquaredText>
						<SquaredText>5.5 Користувач несе персональну відповідальність за збереження конфіденційності інформації облікового запису, включаючи пароль, а також за всю без винятку діяльність, що ведеться від імені Користувача облікового запису.</SquaredText>
						<SquaredText>5.6 Користувач повинен негайно повідомити Адміністрацію сайту про несанкціоноване використання його облікового запису або пароля, або будь-яке інше порушення системи безпеки.</SquaredText>
						<SquaredText>5.7 Адміністрація сайту має право в односторонньому порядку анулювати обліковий запис Користувача, якщо він не використовувався більше (указать период!) календарних місяців поспіль без повідомлення Користувача.</SquaredText>
						<SquaredText>5.7 Ця Угода поширює свої дії на всі додаткові положення та умови купівлі Товару та надання послуг, що надаються на Сайті.</SquaredText>
						<SquaredText>5.8 Інформація, що розміщується на Сайті, не повинна тлумачитися як зміна цієї Угоди.</SquaredText>
						<SquaredText>5.9 Адміністрація сайту має право в будь-який час без повідомлення Користувача вносити зміни до переліку Товарів та послуг, що пропонуються на Сайті, та (або) у ціни, застосовані до таких Товарів щодо їх реалізації та (або) послуг, що надаються Інтернет-магазином.</SquaredText>
						<SquaredText>5.10 Документи, зазначені у пунктах 5.10.1 - 5.10.4 цієї Угоди регулюють у відповідній частині та поширюють свою дію на використання Користувачем Сайту. До цієї Угоди входять такі документи:</SquaredText>
						<SquaredText>5.10.1 Політика конфіденційності;</SquaredText>
						<SquaredText>5.10.2 Договір купівлі-продажу товарів дистанційним способом;</SquaredText>
						<SquaredText>5.10.3 Заявка на оформлення замовлення;</SquaredText>
						<SquaredText>5.10.4 Пропозиції та зауваження.</SquaredText>
						<SquaredText>5.11 Будь-який із документів, перелічених у пункті 5.10. цієї Угоди може підлягати оновленню. Зміни набирають чинності з їх опублікування на Сайті.</SquaredText>
					</Stack>
				</Stack>

				<Stack direction='column' spacing={3}>
					<Typography variant='h4' sx={{ mt: 3 }}>6. ВІДПОВІДАЛЬНІСТЬ</Typography>

					<Stack direction='column' spacing={1} sx={{ paddingLeft: '20px' }}>
						<SquaredText>6.1 Будь-які збитки, які Користувач може зазнати у разі навмисного або необережного порушення будь-якого положення цієї Угоди, а також через несанкціонований доступ до комунікацій іншого Користувача, Адміністрацією сайту не відшкодовуються.</SquaredText>
						<SquaredText>6.2 Адміністрація сайту не несе відповідальності за:</SquaredText>
						<SquaredText>6.2.1 Затримки або збої в процесі здійснення операції, що виникли внаслідок непереборної сили, а також будь-якого випадку неполадок у телекомунікаційних, комп'ютерних, електричних та інших суміжних системах.</SquaredText>
						<SquaredText>6.2.2 Дії систем переказів, банків, платіжних систем та за затримки, пов'язані з їх роботою.</SquaredText>
						<SquaredText>6.2.3 Належне функціонування Сайту, якщо Користувач не має необхідних технічних засобів для його використання, а також не несе жодних зобов'язань щодо забезпечення користувачів такими засобами.</SquaredText>
					</Stack>
				</Stack>

				<Stack direction='column' spacing={3}>
					<Typography variant='h4' sx={{ mt: 3 }}>7. ПОРУШЕННЯ УМОВ УГОДИ КОРИСТУВАЧА</Typography>

					<Stack direction='column' spacing={1} sx={{ paddingLeft: '20px' }}>
						<SquaredText>7.1 Адміністрація сайту має право розкрити будь-яку зібрану про Користувача даного Сайту інформацію, якщо розкриття необхідно у зв'язку з розслідуванням або скаргою щодо неправомірного використання Сайту або для встановлення (ідентифікації) Користувача, який може порушувати або втручатися у права Адміністрації сайту або права інших Користувачів Сайту.</SquaredText>
						<SquaredText>7.2 Адміністрація сайту має право розкрити будь-яку інформацію про Користувача, яку вважатиме за необхідну для виконання положень чинного законодавства або судових рішень, забезпечення виконання умов цієї Угоди, захисту прав чи безпеки назви організації, Користувачів.</SquaredText>
						<SquaredText>7.3 Адміністрація сайту має право розкрити інформацію про Користувача, якщо чинне законодавство України вимагає чи дозволяє таке розкриття.</SquaredText>
						<SquaredText>7.4 Адміністрація сайту має право без попереднього повідомлення Користувача припинити та (або) заблокувати доступ до Сайту, якщо Користувач порушив цю Угоду або умови користування Сайтом, що містяться в інших документах, а також у разі припинення дії Сайту або з причин технічної неполадки або проблеми.</SquaredText>
						<SquaredText>7.5 Адміністрація сайту не несе відповідальності перед Користувачем або третіми особами за припинення доступу до Сайту у разі порушення Користувачем будь-якого положення цієї Угоди або іншого документа, що містить умови користування Сайтом.</SquaredText>
					</Stack>
				</Stack>

				<Stack direction='column' spacing={3}>
					<Typography variant='h4' sx={{ mt: 3 }}>8. ВИРІШЕННЯ СУПЕРЕЧОК</Typography>

					<Stack direction='column' spacing={1} sx={{ paddingLeft: '20px' }}>
						<SquaredText>8.1 У разі виникнення будь-яких розбіжностей чи суперечок між Сторонами цієї Угоди обов'язковою умовою до звернення до суду є пред'явлення претензії (письмової пропозиції щодо добровільного врегулювання спору).</SquaredText>
						<SquaredText>8.2 Одержувач претензії протягом 30 календарних днів з дня її отримання письмово повідомляє заявника претензії про результати розгляду претензії.</SquaredText>
						<SquaredText>8.3 За неможливості вирішити спір у добровільному порядку будь-яка із Сторін має право звернутися до суду за захистом своїх прав, які надані ним чинним законодавством України.</SquaredText>
						<SquaredText>8.4 Будь-який позов щодо умов використання Сайту повинен бути пред'явлений протягом строку після виникнення підстав для позову, за винятком захисту авторських прав на матеріали Сайту, що охороняються відповідно до законодавства. За порушення умов цього пункту будь-який позов або підстави для позову погашаються позовною давністю.</SquaredText>
					</Stack>
				</Stack>

				<Stack direction='column' spacing={3} sx={{ mb: 10 }}>
					<Typography variant='h4' sx={{ mt: 3 }}>9. ДОДАТКОВІ УМОВИ</Typography>

					<Stack direction='column' spacing={1} sx={{ paddingLeft: '20px' }}>
						<SquaredText>9.1 Адміністрація сайту не приймає зустрічних пропозицій від Користувача щодо змін цієї Угоди.</SquaredText>
						<SquaredText>9.2 Відгуки Користувача, розміщені на Сайті, не є конфіденційною інформацією та можуть бути використані Адміністрацією сайту без обмежень.</SquaredText>
					</Stack>
				</Stack>
			</Container>
		</MainLayout>
	);
}
