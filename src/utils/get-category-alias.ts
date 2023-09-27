export default (queryParams: { [key: string]: any }) => {
  const { pageFilters = [] } = queryParams;
  const [alias] = pageFilters.filter((i: string) => !String(i).includes('='));

  return alias || null;
}
