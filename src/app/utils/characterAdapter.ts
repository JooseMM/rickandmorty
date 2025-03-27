import { Character, CharacterDto, CharacterStatus, Gender } from '../models';

export function characterAdapter(dto: CharacterDto): Character {
  return {
    id: dto.id,
    name: dto.name,
    status: mapStatus(dto.status),
    species: dto.species,
    type: dto.type,
    gender: mapGender(dto.gender),
    origin: dto.origin.name,
    location: dto.location.name,
    image: dto.image,
    episode: dto.episode,
  };
}
function mapStatus(status: string): CharacterStatus {
  switch (status.toLowerCase()) {
    case 'alive':
      return CharacterStatus.Alive;
    case 'dead':
      return CharacterStatus.Dead;
    default:
      return CharacterStatus.Unknown;
  }
}
function mapGender(gender: string): Gender {
  switch (gender.toLowerCase()) {
    case 'male':
      return Gender.Male;
    case 'female':
      return Gender.Female;
    default:
      return Gender.Unknown;
  }
}
