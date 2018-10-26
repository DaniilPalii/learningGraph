import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  public navigationItems = new Array<string>('test', 'test 1', 'test 2');

  public constructor() { }

  public ngOnInit() { }
}
