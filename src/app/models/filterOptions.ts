import { CharacterStatus } from './characterStatus.enum';

export interface FilterState {
  byName: string;
  bySpecies: string;
  byStatus: CharacterStatus | null;
}
