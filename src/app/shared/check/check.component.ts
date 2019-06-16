import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent {
  @Input() checked: boolean;

  toggle(shouldCheck?: boolean): boolean {
    return this.checked =
      shouldCheck != null ? shouldCheck : !this.checked;
  }
}
