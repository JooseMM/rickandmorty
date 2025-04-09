import { effect, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingContentService {
  private isLoading: WritableSignal<boolean> = signal(true);

  constructor() {
    effect(() => console.log('is loading: ' + this.isLoading()));
  }
  getLoadingState(): boolean {
    return this.isLoading();
  }
  setLoadingState(isLoading: boolean): void {
    this.isLoading.set(isLoading);
  }
}
