import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: '{{ tooltipText }}',
  styles: [':host { background: red; color: azure; position: absolute; }']
})
export class TooltipComponent {
  @Input('tooltipText')
  public tooltipText: string = 'default tooltipText';

  @HostBinding('style.left.px')
  @Input()
  startX: number = 0;

  @HostBinding('style.top.px')
  @Input()
  startY: number = 0;
}
