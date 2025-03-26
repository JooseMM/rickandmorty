import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './services/theme.service';
import { MainContainerComponent } from './components/main-container/main-container.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbar,
    MatIcon,
    MatSlideToggle,
    FormsModule,
    MainContainerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly themeService = inject(ThemeService);
  protected isDarkTheme = computed(() => this.themeService.getCurrentTheme());

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
