import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { isMobile } from '../../utils/isMobile';
import { CharacterService } from '../../services/character.service';
import { CharacterStatus, PaginatorInfo } from '../../models';
import { MatToolbar } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { FilterOptions } from '../../models/filterState';
import { speciesArray } from '../../utils/characterSpeciesBank';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-character-list',
  imports: [
    MatPaginatorModule,
    MatGridListModule,
    MatToolbar,
    MatInputModule,
    MatFormFieldModule,
    MatIcon,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    MatChipsModule,
    MatCardModule,
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent implements OnInit {
  protected readonly filterOptions = FilterOptions;
  protected readonly stateOptions = CharacterStatus;
  private CharacterService = inject(CharacterService);
  protected cols: number = 2;
  protected characterBank = computed(() =>
    this.CharacterService.getCharacter(),
  );
  protected paginatorInfo: Signal<PaginatorInfo> = computed(() =>
    this.CharacterService.getPaginatorInfo(),
  );
  protected filterBy: FilterOptions | null = null;
  protected searchByName = '';

  changePageByOne(operator: number) {
    // TODO:
  }
  ngOnInit(): void {
    this.setCols();
  }
  setCols(): void {
    this.cols = isMobile(window.innerWidth) ? 1 : 2;
  }
  setFilterBy(option: FilterOptions) {
    this.filterBy = option;
  }
}
