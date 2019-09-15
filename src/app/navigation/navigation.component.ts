import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextService } from '../services/text.service';

export class NavigationItem {
  constructor (
    public id: number,
    public title: string
  ) {}
}

@Component({
  selector: 'lgr-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() navigationItems: Array<NavigationItem> = [];
  @Output('selectionChange') selectionChangeEventEmitter = new EventEmitter<NavigationItem>();

  constructor(public readonly textService: TextService) { }

  switchSelection(item: NavigationItem): void {
    this.selectionChangeEventEmitter.emit(item);
  }
}
