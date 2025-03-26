import { Injectable, signal, WritableSignal } from '@angular/core';
import { Character } from '../models/';
import { characterMock } from './mockCharacter';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private CharacterBank: WritableSignal<Character[]> = signal(characterMock);
  getCharacter(): Character[] {
    return this.CharacterBank();
  }
}
