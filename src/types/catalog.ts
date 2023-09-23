export enum ECatalogSection {
  SUITS = 'suits',
  HOODIES = 'hoodies',
  SWEATSHIRTS = 'sweatshirts',
  T_SHIRTS = 't-shirts',
  PANTS = 'pants',
  SHORTS = 'shorts',
  SALE = 'sale',
}

export type TCatalogSection = ECatalogSection.SUITS
  | ECatalogSection.HOODIES
  | ECatalogSection.SWEATSHIRTS
  | ECatalogSection.T_SHIRTS
  | ECatalogSection.PANTS
  | ECatalogSection.SHORTS;

export const CatalogTitles = {
  [ECatalogSection.SUITS]: 'Костюми',
  [ECatalogSection.HOODIES]: 'Худі',
  [ECatalogSection.SWEATSHIRTS]: 'Світшоти',
  [ECatalogSection.T_SHIRTS]: 'Футболки',
  [ECatalogSection.PANTS]: 'Штани',
  [ECatalogSection.SHORTS]: 'Шорти',
}

export const CatalogDescriptions = {
    [ECatalogSection.SUITS]: 'Елегантність та стиль у кожній деталі вашого образу',
    [ECatalogSection.HOODIES]: 'Зігрівайтеся в комфортних худі',
    [ECatalogSection.SWEATSHIRTS]: 'Зігрівайте себе в зручних та стильних світшотах',
    [ECatalogSection.T_SHIRTS]: 'Виразіть себе через модні та оригінальні футболки',
    [ECatalogSection.PANTS]: 'Повсякденний комфорт у вишуканих штанях',
    [ECatalogSection.SHORTS]: 'Зручні та стильні шорти для активного життя',
}
