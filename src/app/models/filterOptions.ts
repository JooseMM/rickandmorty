import { CharacterStatus } from './characterStatus.enum';
import { FilterOptions } from './filterState';

export interface FilterState {
  Filter: string;
  bySpecies: string;
  byStatus: CharacterStatus | null;
}
