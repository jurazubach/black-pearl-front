'use client';

import MainLayout from 'src/layouts/main';
import AboutHero from '../about-hero';
import AboutWhat from '../about-what';
import AboutTeam from '../about-team';
import AboutFeatures from '../about-features';

export default function AboutView() {
  return (
    <MainLayout>
      <AboutHero />
      <AboutWhat />
      <AboutFeatures />
      <AboutTeam />
    </MainLayout>
  );
}
