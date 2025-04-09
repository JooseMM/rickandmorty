import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Character, CharacterStatus } from '../../models';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [NgClass, MatDialogClose, MatCardModule, MatIcon, MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Character) {}

  setIconByStatus(status: CharacterStatus): string {
    switch (status) {
      case CharacterStatus.Alive:
        return 'monitor_heart';
      case CharacterStatus.Dead:
        return 'skull';
      case CharacterStatus.Unknown:
        return 'help';
    }
  }
  setIconColor(status: CharacterStatus) {
    switch (status) {
      case CharacterStatus.Alive:
        return 'status--alive';
      case CharacterStatus.Dead:
        return 'status--dead';
      case CharacterStatus.Unknown:
        return 'status--unknow';
    }
  }
}
