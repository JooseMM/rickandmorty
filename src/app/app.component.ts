import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './services/theme.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLinkActive,
    MatToolbar,
    MatIcon,
    MatSlideToggle,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.setDrawerMode();
  }
  private readonly themeService = inject(ThemeService);
  protected isDarkThemeSelected = computed(() =>
    this.themeService.getCurrentTheme(),
  );
  protected drawerMode: 'push' | 'over' | 'side' = 'side';
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  setDrawerMode() {
    if (window.innerWidth < 1000) {
      this.drawerMode = 'over';
    } else {
      this.drawerMode = 'side';
    }
  }
}
