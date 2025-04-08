import {
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  Character,
  CharacterDto,
  PaginatorInfo,
  ResponseDto,
} from '../models/';
import { characterAdapter } from '../utils/characterAdapter';
import { paginationAdapter } from '../utils/paginatorAdapter';
import { HttpClient } from '@angular/common/http';
import {
  createQueries,
  filterInitialState,
  paginatorInitialState,
} from './character.utils';
import { FilterState } from '../models/filterOptions';
import { FilterOptions } from '../models/filterState';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private http = inject(HttpClient);
  private characterBank: WritableSignal<Character[]> = signal([]);
  private filterState: WritableSignal<FilterState> = signal(filterInitialState);
  private paginatorInfo: WritableSignal<PaginatorInfo> = signal(
    paginatorInitialState,
  );

  constructor() {
    effect(() => {
      this.refreshBank(this.filterState());
    });
  }

  getFilterState(): FilterState {
    return this.filterState();
  }
  getPaginatorInfo(): PaginatorInfo {
    return this.paginatorInfo();
  }
  getCharacter(): Character[] {
    return this.characterBank();
  }
  private refreshBank(filterOption?: FilterState): void {
    let endpoint = 'https://rickandmortyapi.com/api/character';
    let params;

    if (filterOption) {
      params = createQueries(filterOption);
    }

    this.http
      .get<ResponseDto>(endpoint, filterOption && { params })
      .pipe()
      .subscribe((res) => {
        this.paginatorInfo.update((prev: PaginatorInfo) =>
          paginationAdapter(prev, res),
        );
        this.characterBank.set(
          res.results.map((character: CharacterDto) =>
            characterAdapter(character),
          ),
        );
      });
  }
  setFilterState(key: FilterOptions, newValue: string): void {
    this.filterState.update((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  }
}
