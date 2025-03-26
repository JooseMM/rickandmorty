import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-character-list',
  imports: [],
  templateUrl: './character-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterListComponent {

}
