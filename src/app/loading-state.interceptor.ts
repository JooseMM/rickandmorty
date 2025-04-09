import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingContentService } from './services/loading-content.service';
import { finalize } from 'rxjs';

export const loadingStateInterceptor: HttpInterceptorFn = (req, next) => {
  const loadinStateService = inject(LoadingContentService);
  loadinStateService.setLoadingState(true);
  return next(req).pipe(
    finalize(() => loadinStateService.setLoadingState(false)),
  );
};
