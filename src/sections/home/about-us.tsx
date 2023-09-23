import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import CarouselMainFeatures from 'src/sections/_examples/extra/carousel-view/carousel-main-features';

const OUR_FEATURES = [
	{
		alias: 'panel1',
		icon: '/assets/icons/features/shirt.svg',
		title: 'Елегантні форми та дизайн',
		description: 'Ми поєднуємо розкіш з елегантністю в кожному дизайні. Наші вироби не просто одяг - це втілення вишуканості та стилю. Ми докладаємо особливу увагу до деталей, створюючи речі, які виражають ваш вишуканий смак та неперевершеність.',
	},
	{
		alias: 'panel2',
		icon: '/assets/icons/features/luxury.svg',
		title: 'Розкіш у кожній деталі',
		description: 'Наш бренд втілює справжню розкіш у кожному виробі. Кожен шов, кожна строчка та кожна деталь наших виробів втілені з міцною вірою в вишуканість. Ми завжди створюємо вироби, які відзначаються бездоганністю та вишуканістю, надаючи вам можливість відчути себе особливим.',
	},
	{
		alias: 'panel3',
		icon: '/assets/icons/features/quality-medal.svg',
		title: 'Висока якість та витонченість',
		description: 'Наш бренд завжди прагне до найвищих стандартів якості та витонченості. Ми обираємо лише найкращі матеріали та використовуємо найсучасніші технології для створення виробів, які радують вас своєю довговічністю та стильністю.',
	},
];

const AboutUs = () => {
	const theme = useTheme();

	return (
		<Box sx={{ padding: theme.spacing(2) }}>
			<Stack spacing={1}>
				<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
					<Typography sx={{ maxWidth: '768px' }} variant='body2' textAlign='center'>
						Ми - український бренд одягу, який об'єднав в собі утилітарний, лаконічний і зручний дизайн.
						Динамічний ритм життя і прагнення до свободи творчих людей надихнув нас створювати самобутний одяг.
						Оригінальний дизайн і особлива увага до деталей - головна відмінна риса нашої роботи.
						Кожна модель детально продумана до найменших дрібниць.
					</Typography>
				</Box>

				<CarouselMainFeatures features={OUR_FEATURES}/>
			</Stack>
		</Box>
	);
};

export default AboutUs;
