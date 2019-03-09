import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  public navigationItems = new Array<string>('Lesson 1', 'Lesson 2 with long name', 'Lesson 3 with longer name. Some text and more text', 'Lesson 4');
  public selectedItem: string = this.navigationItems[0]; // todo remove default value

  public switchSelection(item: string) {
    this.selectedItem = item;
  }
}
