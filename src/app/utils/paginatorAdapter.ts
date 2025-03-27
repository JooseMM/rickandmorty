import { PaginatorInfo, ResponseDto } from '../models';

export function paginationAdapter(
  currentState: PaginatorInfo,
  response: ResponseDto,
): PaginatorInfo {
  currentState.nextPage = response.info.next;
  currentState.previousPage = response.info.prev;
  currentState.length = response.info.count;
  return { ...currentState };
}
