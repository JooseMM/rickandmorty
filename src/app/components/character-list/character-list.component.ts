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
import {
  MatChipSelectionChange,
  MatChipsModule,
} from '@angular/material/chips';
import { FilterOptions } from '../../models/filterState';
import { MatCardModule } from '@angular/material/card';
import { debounceTime, Subject } from 'rxjs';

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
    FormsModule,
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent implements OnInit {
  protected readonly filterOptions = FilterOptions;
  protected readonly stateOptions = CharacterStatus;
  private characterService = inject(CharacterService);
  protected cols: number = 2;
  protected characterBank = computed(() =>
    this.characterService.getCharacter(),
  );
  protected paginatorInfo: Signal<PaginatorInfo> = computed(() =>
    this.characterService.getPaginatorInfo(),
  );
  protected filterBy: FilterOptions | null = null;
  protected searchByName = '';
  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.setCols();
    this.searchSubject.pipe(debounceTime(700)).subscribe((value) => {
      this.characterService.setFilterState(this.filterOptions.ByName, value);
    });
  }
  handleSelectionChange(selected: MatChipSelectionChange) {
    const newState = selected.selected ? selected.source.value : null;
    this.characterService.setFilterState(FilterOptions.ByStatus, newState);
  }
  setCols(): void {
    this.cols = isMobile(window.innerWidth) ? 1 : 2;
  }
  onSearch(value: string) {
    this.searchSubject.next(value);
  }
}
