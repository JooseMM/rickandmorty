import { CharacterDto } from './characterDto';

export interface ResponseDto {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: string;
  };
  results: CharacterDto[];
}
