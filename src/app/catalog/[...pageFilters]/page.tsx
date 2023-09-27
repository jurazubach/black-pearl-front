import { redirect } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import CatalogMainView from 'src/sections/catalog/catalog-main-view';
import { httpGetCatalogProducts, httpGetCategory } from 'src/services/catalog';
import getFilterContainer from 'src/utils/get-filter-container';
import getCategoryAlias from 'src/utils/get-category-alias';
import { PATH_PAGE } from 'src/routes/paths';
import { ICategoryItem } from 'src/types/category';

interface Props {
  params: { pageFilters: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let category: ICategoryItem | null = null;
  const alias = getCategoryAlias(params);

  try {
    category = await httpGetCategory(alias);
  } catch (err) {
    return redirect(PATH_PAGE.home);
  }

  const parentMeta = await parent;

  return {
    title: category ? `Каталог: ${category.singleTitle} | The Black Pearl` : parentMeta.title,
    // other seo
  }
}

export default async function CatalogPage({ params }: Props) {
  const alias = getCategoryAlias(params);
  const filterContainer = getFilterContainer(params);
  let category: ICategoryItem;

  try {
    category = await httpGetCategory(alias);
  } catch (err) {
    return redirect(PATH_PAGE.home);
  }

  const products = await httpGetCatalogProducts(filterContainer.currentPage, filterContainer.sort, filterContainer.list);

  return <CatalogMainView category={category} products={products} filterContainer={filterContainer} />;
}
