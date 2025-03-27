import { Injectable, signal, WritableSignal } from '@angular/core';
import { Character, CharacterDto, PaginatorInfo } from '../models/';
import { mockResponse } from './mockCharacter';
import { characterAdapter } from '../utils/characterAdapter';
import { paginationAdapter } from '../utils/paginatorAdapter';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private characterBank: WritableSignal<Character[]> = signal([]);
  private paginatorInfo: WritableSignal<PaginatorInfo> = signal({
    length: 0,
    pageSizeOptions: [5, 10, 20],
    pageSize: 5,
    previousPage: '',
    nextPage: '',
  });

  constructor() {
    this.refreshBank();
  }

  getPaginatorInfo(): PaginatorInfo {
    return this.paginatorInfo();
  }
  getCharacter(): Character[] {
    return this.characterBank();
  }
  private refreshBank(): void {
    //TODO: hit the api here with the filterOptions
    const response = mockResponse;

    this.paginatorInfo.update((prev: PaginatorInfo) =>
      paginationAdapter(prev, response),
    );
    this.characterBank.set(
      response.results.map((character: CharacterDto) =>
        characterAdapter(character),
      ),
    );
    console.log(response.results.length);
  }
}
