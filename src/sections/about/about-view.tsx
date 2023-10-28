'use client';

import { m } from 'framer-motion';
import { MotionContainer, varFade } from 'src/components/animate';
import AboutHero from './about-hero';
import AboutWhat from './about-what';
import AboutTeam from './about-team';
import AboutFeatures from './about-features';

export default function AboutView() {
  return (
    <MotionContainer>
      <m.div variants={varFade().in}>
        <AboutHero />
        <AboutWhat />
        <AboutFeatures />
        <AboutTeam />
      </m.div>
    </MotionContainer>
  );
}
