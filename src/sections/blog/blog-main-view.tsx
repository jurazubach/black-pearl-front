'use client';

import { m, useScroll } from 'framer-motion';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import React from 'react';
import Container from '@mui/material/Container';
import ScrollProgress from 'src/components/scroll-progress';
import Iconify from 'src/components/iconify';
import CardPost from 'src/components/card-post';
import ContainerTitle from 'src/components/container-title';
import { _mock } from 'src/_mock';
import { MotionContainer, varFade } from 'src/components/animate';

const posts: any = Array.from({ length: 10 }).map((_, idx) => ({
	id: 5 + idx,
	href: '/dawdawdaw',
	imageSrc: 'https://wwd.com/wp-content/uploads/2023/01/3-2.jpg',
	alias: 'sportyvnyj_kostyum_z_trynytky_akvamaryn_zhinochyj',
	title: _mock.postTitle(idx),
	description: _mock.description(idx),
}));

export default function BlogMainView() {
	const theme = useTheme();
	const { scrollYProgress } = useScroll();

	return (
		<Stack>
			<ScrollProgress scrollYProgress={scrollYProgress} />
			<ContainerTitle center title='Блог' description='Слідкуйте за модними трендами, та нашими новинками' />

			<MotionContainer>
				<m.div variants={varFade().in}>
					<Container maxWidth='lg' disableGutters>
						<Box sx={{
							my: 1,
							position: 'relative',
							display: 'grid',
							gridGap: '8px 0',
							gridTemplateColumns: {
								xs: 'repeat(1, 1fr)',
								sm: 'repeat(2, 1fr)',
								md: 'repeat(3, 1fr)',
								lg: 'repeat(4, 1fr)',
								xl: 'repeat(5, 1fr)',
							},
						}}>
							{posts.map((post: any) => <CardPost key={post.id} blogPost={post} />)}
						</Box>
					</Container>
				</m.div>
			</MotionContainer>

			<Box py={2} display='flex' justifyContent='center' alignItems='center'
			     sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
				<Button
					sx={{ width: '100%', maxWidth: '480px' }}
					variant='contained'
					startIcon={<Iconify icon='mdi:reload' width={24} sx={{ color: 'common.white' }} />}
				>Показати ще</Button>
			</Box>
		</Stack>
	);
}
