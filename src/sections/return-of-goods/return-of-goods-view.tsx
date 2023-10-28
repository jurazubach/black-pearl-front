'use client';

import React from 'react';
import { m } from 'framer-motion';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ContainerTitle from 'src/components/container-title';
import { MotionContainer, varFade } from 'src/components/animate';

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

export default function ReturnOfGoodsView() {
	return (
		<MotionContainer>
			<m.div variants={varFade().in}>
				<ContainerTitle center title='Обмін і повернення' />

				<Container maxWidth='lg'>
					<Stack direction='column' spacing={3}>
						<Typography variant='h4' sx={{ mt: 3 }}>ПОВЕРНЕННЯ НЕЯКІСНОГО ТОВАРУ</Typography>

						<Typography sx={{ textIndent: '20px' }}>За законом України, є 2 причини, через які Ви можете повернути товар. Перша – це товар неналежної якості. Якщо Ви придбали товар із явним заводським браком, Ви маєте право повернути такий товар, спираючись на статтю 8 «Про захист прав споживача». Бракованим вважається такий товар, у якому:</Typography>

						<Stack direction='column' spacing={1} sx={{ paddingLeft: '20px' }}>
							<SquaredText>Усунення дефекту неможливе;</SquaredText>
							<SquaredText>На усунення дефекту потрібно більше двох тижнів;</SquaredText>
							<SquaredText>Дефект змінює товар так, що він не відповідає своєму опису в договорі про покупку;</SquaredText>
						</Stack>

						<Typography sx={{ textIndent: '20px' }}>Бракований товар підлягає поверненню, після чого Ви вибираєте зручний для Вас спосіб компенсації:</Typography>

						<Stack direction='column' spacing={1} sx={{ paddingLeft: '20px' }}>
							<SquaredText>Обмін виробу на аналогічний такої ж якості (якщо на даний момент такого ж немає, Ви можете почекати, поки з'явиться або вибрати інший спосіб компенсації);</SquaredText>
							<SquaredText>Отримати інший товар на ту саму суму, яку Ви заплатили за бракований товар;</SquaredText>
							<SquaredText>Повернення грошей на ту саму суму, за яку Ви купили цей товар.</SquaredText>
						</Stack>
					</Stack>

					<Stack direction='column' spacing={3}>
						<Typography variant='h4' sx={{ mt: 3 }}>ПОВЕРНЕННЯ ЯКІСНОГО ТОВАРУ</Typography>

						<Typography sx={{ textIndent: '20px' }}>Друга причина – товар якісний, але він Вам просто не сподобався або не підійшов за кольором, розміром тощо. Протягом 14-ти днів Ви маєте повне право повернути товар, що вам не сподобався. Для цього є кілька умов, які мають бути дотримані з Вашого боку:</Typography>

						<Stack direction='column' spacing={1} sx={{ paddingLeft: '20px' }}>
							<SquaredText>Наявність номеру замовлення з нашого інтернет-магазину доводить, що цей товар Ви придбали саме у нас;</SquaredText>
							<SquaredText>Збереження повної комплектації товару;</SquaredText>
							<SquaredText>Збереження цілісного заводського пакування, пломби, печаток;</SquaredText>
							<SquaredText>Товар збережений у тому вигляді, в якому був куплений;</SquaredText>
							<SquaredText>Товар не використовувався.</SquaredText>
						</Stack>

						<Typography sx={{ textIndent: '20px' }}>Пам'ятайте, що у разі повернення якісного товару, закон України захищає не лише Вас, а й наступних покупців. Товар, який Ви повернули тільки тому, що він не сподобався особисто Вам, буде проданий тій людині, якій цей товар сподобається. Він буде використаний за призначенням і тому важливо, щоб він залишився таким самим, яким потрапив у Ваші руки.</Typography>
					</Stack>

					<Stack direction='column' spacing={3}>
						<Typography variant='h4' sx={{ mt: 3 }}>ЩО РОБИТИ, ЯКЩО ТОВАР ВАС НЕ ВЛАШТОВУЄ:</Typography>

						<Stack direction='column' spacing={1} sx={{ paddingLeft: '20px' }}>
							<SquaredText>Ви можете зателефонувати за контактними телефонами на нашій сторінці та уточнити всю процедуру повернення або обміну товару у менеджера;</SquaredText>
							<SquaredText>Вказуєте ім'я, прізвище та номер замовлення на нашому сайті (приходить Вам у вигляді e-mail повідомлення після повного оформлення замовлення на нашому сайті);</SquaredText>
							<SquaredText>Якщо у Вас немає цих даних, вкажіть місто та приблизну дату оформлення замовлення, щоб менеджер міг знайти Ваше замовлення в базі та підтвердити те, що Ви є нашим клієнтом;</SquaredText>
							<SquaredText>Вкажіть причину обміну чи повернення товару;</SquaredText>
							<SquaredText>Опишіть дефект або причину обміну/повернення товару та на прохання менеджера надайте фото доказ;</SquaredText>
						</Stack>

						<Typography sx={{ textIndent: '20px' }}>Товари, що не підлягають поверненню та обміну згідно із Законом України «Про захист прав споживачів» (крім випадків браку):</Typography>
						<Stack direction='column' spacing={1} sx={{ paddingLeft: '20px' }}>
							<SquaredText>Усі головні убори (шапки, баффи, балаклави, кепки, снепбеки та інші);</SquaredText>
							<SquaredText>Панчішно-шкарпеткові вироби;</SquaredText>
							<SquaredText>Спідня білизна;</SquaredText>
							<SquaredText>Рукавички.</SquaredText>
						</Stack>

					</Stack>

					<Stack direction='column' spacing={3}>
						<Typography variant='h4' sx={{ mt: 3 }}>ЯК СПРОСТИТИ ПРОЦЕДУРУ ПОВЕРНЕННЯ ТА ОБМІНУ ТОВАРУ?</Typography>

						<Typography sx={{ textIndent: '20px' }}>Перед тим, як забрати товар із «Нової Пошти» або «Укр.Пошти», відкрийте упаковку та переконайтеся, що Вас все влаштовує. Це допоможе Вам значно скоротити часові витрати на повернення у разі заводського браку або якщо товар Вам не сподобався. При отриманні «накладеним платежем» обов'язково ознайомтеся з товаром при отриманні, по можливості приміряйте його прямо у відділенні.</Typography>
					</Stack>

					<Stack direction='column' spacing={3} sx={{ mb: 10 }}>
						<Typography variant='h4' sx={{ mt: 3 }}>КОМПЕНСАЦІЯ ГРОШЕЙ ЗА ТОВАР І ДОСТАВКУ</Typography>

						<Stack direction='column' spacing={1} sx={{ paddingLeft: '20px' }}>
							<SquaredText>Якщо Ви відмовилися від товару на точці видачі «Нової пошти», Ви не сплачуєте жодної копійки за товар та за доставку (при доставці «Післяплата»);</SquaredText>
							<SquaredText>Якщо на момент повернення в касі не виявилося потрібної суми, ми зобов'язуємося повернути Вам Ваші фінанси в період 7 днів з моменту отримання Вашої заявки на повернення грошей за покупку;</SquaredText>
							<SquaredText>Якщо Ви вирішили повернути товар після покупки, Вам необхідно повернути товар до нашого відділення «Нової Пошти» (БЕЗ НАКЛАДЕНОГО ПЛАТЕЖУ). Це робиться, щоб уникнути шахрайства з боку клієнтів. Ми не маємо гарантій, що кожен клієнт поверне нам саме наш товар. Після того, як ми приймемо товар, перевіримо комплектацію та визначимо причину відмови від товару, ми повернемо Вам ваші гроші на картку ПриватБанку. Гроші за доставку ми компенсуємо лише у разі заводського браку. Якщо Ви повертаєте нам товар, який Вам не сподобався, за пересилання товару платить клієнт.</SquaredText>
						</Stack>

						<Stack direction='column' spacing={3}>
							<Typography variant='h4' sx={{ mt: 3 }}>ОБМІН ТОВАРУ</Typography>

							<Typography sx={{ textIndent: '20px' }}>В якості компенсації, за законом України, ми надаємо Вам право обрати такий самий товар з іншої партії, або вибрати інший товар на ту саму суму грошей. Якщо Ви хочете обміняти заводський брак, доставку в обидві сторони сплачуємо ми. Якщо ж ви змінюєте якісний товар, за доставку платите Ви.</Typography>
						</Stack>
					</Stack>
				</Container>
			</m.div>
		</MotionContainer>
	);
}
