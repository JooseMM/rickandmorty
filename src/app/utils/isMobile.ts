export function isMobile(width: number): boolean {
  if (width >= 1000) {
    return false;
  }
  return true;
}
