'use client';

import React from 'react';
import { m, useScroll } from 'framer-motion';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { MotionContainer, varFade } from 'src/components/animate';
import ScrollProgress from 'src/components/scroll-progress';
import ContainerTitle from 'src/components/container-title';
import BlogHero from './blog-hero';

interface Props {
	post: any;
}

export default function MainView({ post }: Props) {
	const { scrollYProgress } = useScroll();

	return (
		<MotionContainer>
			<m.div variants={varFade().in}>
				<ScrollProgress scrollYProgress={scrollYProgress} />
				<BlogHero />
				<ContainerTitle center title={post.title} />

				<Container maxWidth='lg' sx={{ my: { xs: 2, sm: 3 } }} disableGutters>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							{post.description}
						</Grid>
					</Grid>
				</Container>
			</m.div>
		</MotionContainer>
	);
}
