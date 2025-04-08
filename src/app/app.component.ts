import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import {
  RouterLink,
  RouterOutlet,
  RouterLinkActive,
  Router,
  NavigationEnd,
} from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ThemeService } from './services/theme.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { isMobile } from './utils/isMobile';
import { DrawerMode } from './models';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { speciesArray } from './utils/characterSpeciesBank';
import { toSignal } from '@angular/core/rxjs-interop';
import { CharacterService } from './services/character.service';
import { FilterOptions } from './models/filterState';

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
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  protected readonly characterService = inject(CharacterService);
  protected readonly routerService = inject(Router);
  protected readonly speciesList = ['All', ...speciesArray];
  protected drawerMode: DrawerMode = 'over';
  private readonly themeService = inject(ThemeService);
  protected isDarkThemeSelected = computed(() =>
    this.themeService.getCurrentTheme(),
  );
  protected onRouterChange = toSignal(this.routerService.events);
  protected readonly isListRouteActive: Signal<boolean> = computed(() => {
    if (this.onRouterChange() instanceof NavigationEnd) {
      return (this.onRouterChange() as NavigationEnd).url.includes('list');
    } else {
      return false;
    }
  });
  ngOnInit(): void {
    this.setDrawerMode();
  }
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  onListSelectionChange(event: MatSelectionListChange): void {
    const selected = event.options[0].value;
    this.characterService.setFilterState(FilterOptions.BySpecies, selected);
  }
  setDrawerMode(): void {
    this.drawerMode = isMobile(window.innerWidth) ? 'over' : 'side';
  }
  readonly speciesFilterState = signal({
    species: speciesArray.map((item) => ({ name: item, selected: false })),
  });
  update(selected: boolean, index: number) {
    this.speciesFilterState.update((task) => ({
      ...task,
      species: task.species.map((item, i) => {
        if (i === index) {
          selected = true;
        } else {
          selected = false;
        }
        return item;
      }),
    }));
  }
}
