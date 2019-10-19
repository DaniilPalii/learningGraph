import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { BinaryTreeNode } from '../../../../shared/components/graph/binary-tree/binary-tree-node';
import { BinaryTreeComponent } from '../../../../shared/components/graph/binary-tree/component/binary-tree.component';

@Component({
  selector: 'lgr-tree-animation-runner',
  templateUrl: './tree-animation-runner.component.html',
  styleUrls: ['./tree-animation-runner.component.scss']
})
export class TreeAnimationRunnerComponent {
  @Input() data: BinaryTreeNode;
  @Output() started = new EventEmitter<void>();
  @ViewChild('tree') treeComponent: BinaryTreeComponent;

  public emitStart(): void {
    this.started.emit();
  }
}
