type pageSizeOptions = 5 | 10 | 20;

export interface PaginatorInfo {
  length: number;
  pageSizeOptions: pageSizeOptions[];
  pageSize: pageSizeOptions;
  nextPage: string;
  previousPage: string;
  pageIndex: number;
}
