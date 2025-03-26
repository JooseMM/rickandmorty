import { CharacterStatus } from './characterStatus.enum';
import { Gender } from './gender.enum';

export interface Character {
  id: number; // The id of the character.
  name: string; // The name of the character.
  status: CharacterStatus;
  species: string; // The species of the character.
  type: string; // The type or subspecies of the character.
  gender: Gender;
  origin: string;
  location: string;
  image: string; // Link to the character's image (URL).
  episode: string[]; // List of episode URLs in which the character appeared.
}
