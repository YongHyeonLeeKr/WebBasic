export interface IProductTagsServiceBulkInsert {
  names: {
    name: string;
  }[];
}

export interface IProductsTagsServiceFindByNames {
  tagNames: string[];
}
