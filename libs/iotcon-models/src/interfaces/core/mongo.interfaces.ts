export interface IProjection {
  [key: string]: boolean;
}

export interface ISearchQuery {
  [key: string]: unknown;
}

export interface ISortingOptions {
  [key: string]:
    | 1
    | -1
    | 'asc'
    | 'ascending'
    | 'desc'
    | 'descending'
    | { $meta: 'textScore' };
}
