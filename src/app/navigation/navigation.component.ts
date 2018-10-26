import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public navigationItems = new Array<string>('Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4');

  public constructor() { }

  public ngOnInit() { }
}
