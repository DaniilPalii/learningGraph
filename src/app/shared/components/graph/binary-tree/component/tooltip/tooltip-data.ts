import * as SvgJs from 'svg.js';
import { BinaryTreeComponent } from '../binary-tree.component';
import { Sizes } from '../sizes';

export class TooltipData {
  public tooltipText: string;
  public targetNodeId: number;
  public targetType: TooltipTargetType;
  public container: BinaryTreeComponent;
  public startX: number;
  public startY: number;

  constructor(
    tooltipText: string,
    targetNodeId: number,
    targetType: TooltipTargetType,
    container: BinaryTreeComponent
  ) {
    this.tooltipText = tooltipText;
    this.targetNodeId = targetNodeId;
    this.targetType = targetType;
    this.container = container;

    this.calculatePosition();
  }

  public calculatePosition(): void {
    const nodeDrawnElements = this.container.nodesDrawnElements[this.targetNodeId];
    let target: SvgJs.Circle | SvgJs.Line;

    switch (this.targetType) {
      case TooltipTargetType.node:
        target = nodeDrawnElements.circle;
        this.startX = (target.x() + Sizes.node) + 15;
        this.startY = target.y() + 2.5;
        break;
      case TooltipTargetType.branch:
        target = nodeDrawnElements.branch;
        this.startX = target.cx() + 17;
        this.startY = target.cy() - 22;
        break;
    }
  }
}

export enum TooltipTargetType {
  node,
  branch
}
