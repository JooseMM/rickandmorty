import { CharacterStatus } from './characterStatus.enum';
import { Gender } from './gender.enum';

export interface CharacterDto {
  id: number; // The id of the character.
  name: string; // The name of the character.
  status: string;
  species: string; // The species of the character.
  type: string; // The type or subspecies of the character.
  gender: string;
  origin: {
    name: string; // Name of the character's origin location.
    link: string; // Link to the character's origin location.
  };
  location: {
    name: string; // Name of the character's last known location.
    link: string; // Link to the character's last known location endpoint.
  };
  image: string; // Link to the character's image (URL).
  episode: string[]; // List of episode URLs in which the character appeared.
  url: string; // Link to the character's own URL endpoint.
  created: string; // Time at which the character was created in the database.
}
