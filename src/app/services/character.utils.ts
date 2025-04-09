import { HttpParams } from '@angular/common/http';
import { PaginatorInfo } from '../models';
import { FilterState } from '../models/filterOptions';

export const filterInitialState: FilterState = {
  byName: '',
  bySpecies: '',
  byStatus: null,
};

export const paginatorInitialState: PaginatorInfo = {
  pageIndex: 0,
  length: 0,
  pageSizeOptions: [20],
  pageSize: 20,
  previousPage: '',
  nextPage: '',
};

export const createQueries = (filterState: FilterState): HttpParams => {
  let params = new HttpParams();

  if (filterState.byName) {
    params = params.set('name', filterState.byName);
  }
  if (filterState.byStatus) {
    params = params.set('status', filterState.byStatus);
  }
  if (filterState.bySpecies) {
    params = params.set('species', filterState.bySpecies);
  }

  return params;
};
