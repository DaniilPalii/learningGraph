import { Component, Input } from '@angular/core';

@Component({
  selector: 'lgr-check',
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
