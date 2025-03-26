import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainContainerComponent } from '../main-container/main-container.component';

@Component({
  selector: 'app-home',
  imports: [MainContainerComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
