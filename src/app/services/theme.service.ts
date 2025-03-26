import { DOCUMENT } from '@angular/common';
import {
  effect,
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly documentService = inject(DOCUMENT);
  private isDarkThemeSelected: WritableSignal<boolean> = signal(
    this.getPreviousTheme(),
  );
  constructor() {
    effect(() => {
      this.setTheme();
    });
  }

  private getPreviousTheme(): boolean {
    //TODO: implement localstorage fetching
    return true;
  }
  getCurrentTheme(): boolean {
    return this.isDarkThemeSelected();
  }
  toggleTheme(): void {
    this.isDarkThemeSelected.update((prev) => !prev);
  }

  private setTheme(): void {
    if (this.isDarkThemeSelected()) {
      this.documentService.documentElement.classList.add('root--dark_theme');
    } else {
      this.documentService.documentElement.classList.remove('root--dark_theme');
    }
  }
}
