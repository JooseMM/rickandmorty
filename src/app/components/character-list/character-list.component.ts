import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { isMobile } from '../../utils/isMobile';
import { CharacterService } from '../../services/character.service';
import { Character, CharacterStatus, PaginatorInfo } from '../../models';
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
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { LoadingContentService } from '../../services/loading-content.service';

@Component({
  selector: 'app-character-list',
  imports: [
    MatProgressSpinnerModule,
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
  private characterService = inject(CharacterService);
  protected loadingService = inject(LoadingContentService);
  protected cols: number = 2;
  protected characterBank = computed(() =>
    this.characterService.getCharacter(),
  );
  protected paginatorInfo: Signal<PaginatorInfo> = computed(() =>
    this.characterService.getPaginatorInfo(),
  );
  protected searchByName = '';
  private searchSubject = new Subject<string>();
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.setCols();
    this.searchSubject.pipe(debounceTime(700)).subscribe((value) => {
      this.characterService.setFilterState(this.filterOptions.ByName, value);
    });
  }
  handleSelectionChange(selected: MatChipSelectionChange): void {
    const newState = selected.selected ? selected.source.value : null;
    this.characterService.setFilterState(FilterOptions.ByStatus, newState);
  }
  setCols(): void {
    const currentWidth = window.innerWidth;
    this.cols = currentWidth > 700 ? 2 : 1;
  }
  onSearch(value: string): void {
    this.searchSubject.next(value);
  }
  onOpenDialog(character: Character) {
    this.dialog.open(ModalComponent, {
      data: character,
    });
  }
  onPageChange(pageInfo: PageEvent) {
    const isNextPage = pageInfo.pageIndex > this.paginatorInfo().pageIndex;
    this.characterService.changePageIndex(isNextPage);
  }
}
