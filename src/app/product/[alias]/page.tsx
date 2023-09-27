import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';
import ProductMainView from 'src/sections/product/product-main-view';
import { httpGetProduct, httpGetSimilarProducts } from 'src/services/product';
import { PATH_PAGE } from 'src/routes/paths';
import { IProductItem } from 'src/types/product';

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let product: IProductItem | null = null;

  try {
    product = await httpGetProduct(params.alias);
  } catch (err) {
    return redirect(PATH_PAGE.home);
  }

  const parentMeta = await parent;

  return {
    title: product ? `${product.title} | The Black Pearl` : parentMeta.title,
    // other seo
  }
}

interface Props {
  params: { alias: string; };
}

export default async function ProductPage({ params }: Props) {
  const product = await httpGetProduct(params.alias);
  const similarProducts = await httpGetSimilarProducts(params.alias);

  return <ProductMainView product={product} similarProducts={similarProducts} />;
}

