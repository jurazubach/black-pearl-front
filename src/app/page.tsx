import { HomeView } from 'src/sections/home';
import {
  httpGetBannerHome,
  httpGetBlogHome,
  httpGetProductNoveltyHome,
  httpGetProductPopularHome,
  httpGetSocialInstagramHome,
} from 'src/services/app';

export const metadata = {
  title: 'Головна | NVRMORE',
};

async function getContent() {
  const banners = await httpGetBannerHome();
  const popularProducts = await httpGetProductPopularHome();
  const noveltyProducts = await httpGetProductNoveltyHome();
  const instagramPosts = await httpGetSocialInstagramHome();
  const blogPosts = await httpGetBlogHome();

  return {
    banners,
    popularProducts,
    noveltyProducts,
    instagramPosts,
    blogPosts,
  }
}

export default async function HomePage() {
  const { banners, popularProducts, noveltyProducts, blogPosts, instagramPosts } = await getContent()

  return (
    <HomeView
      banners={banners}
      popularProducts={popularProducts}
      noveltyProducts={noveltyProducts}
      blogPosts={blogPosts}
      instagramPosts={instagramPosts}
    />
  );
}
