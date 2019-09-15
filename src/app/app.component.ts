import { Component } from '@angular/core';
import { NavigationItem } from './navigation/navigation.component';
import { TextService } from './services/text.service';

@Component({
  selector: 'lgr-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navigationItems = new Array<NavigationItem>();
  selectedNavigationItem: NavigationItem;
  toolbarTitle: string;

  readonly lessonTitles = [
    this.textService.binaryTree,
    this.textService.treeTraversal,
    'Long name',
    'Longer name. Some tooltipText and more tooltipText',
    ''
  ];

  constructor(private readonly textService: TextService) {
    this.toolbarTitle = textService.appTitleLong;
    this.setLessonsNavigationItems();
    this.selectedNavigationItem = this.navigationItems[0];
  }

  handleNavigatorSelectionChange(item: NavigationItem): void {
    this.selectedNavigationItem = item;
    this.toolbarTitle = `${this.textService.appTitle} - ${item.title}`;
  }

  private setLessonsNavigationItems(): void {
    this.navigationItems = this.lessonTitles.map((t, i) => {
      const lessonI = i + 1;
      const lessonTitle = this.textService.getLessonTitleWithNumber(lessonI, t);

      return new NavigationItem(lessonI, lessonTitle);
    });
  }

  private static getNavigationItems(itemTitles: Array<string>): Array<NavigationItem> {
    return itemTitles.map((t, i) =>
      new NavigationItem(i, t));
  }
}
