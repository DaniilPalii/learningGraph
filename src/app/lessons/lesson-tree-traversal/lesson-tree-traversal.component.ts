import { Component, ViewChild } from '@angular/core';
import { TextService } from '../../services/text.service';
import { BinaryTreeCreator } from '../../shared/components/graph/binary-tree/binary-tree-creator';
import { BinaryTreeNode as Node } from '../../shared/components/graph/binary-tree/binary-tree-node';
import { LessonBaseComponent } from '../lesson.base.component';
import { TreeAnimationRunnerComponent } from './tree-animation-runner/tree-animation-runner/tree-animation-runner.component';

@Component({
  selector: 'lgr-lesson-tree-traversal',
  templateUrl: './lesson-tree-traversal.component.html',
  styleUrls: ['./lesson-tree-traversal.component.css', './../lessons.css']
})
export class LessonTreeTraversalComponent extends LessonBaseComponent {
  orderTree = BinaryTreeCreator.CreateTree1();

  @ViewChild('animationRunner')
  animationRunner: TreeAnimationRunnerComponent;

  private selectedTabI = 0;
  private orderedNodes: Array<Node>;

  constructor(textService: TextService) {
    super(textService.treeTraversal, textService);
    this.prepareTreeForTab(this.selectedTabI);
  }

  public prepareTreeForTab(tabI: number): void {
    this.selectedTabI = tabI;
    this.orderTree = BinaryTreeCreator.CreateTree1();
    let nodeValue = 1;
    this.orderedNodes = [];
    this.forEachTreeNode(n => {
      n.value = nodeValue++;
      this.orderedNodes.push(n);
    });
  }

  public runTreeOrderAnimation(): void {
    this.animationRunner.treeComponent.selectNodes(this.orderedNodes);
  }

  private forEachTreeNode(action: (node: Node) => void): void {
    switch (this.selectedTabI) {
      case 0: this.orderTree.forEachPreOrder(n => action(n)); break;
      case 1: this.orderTree.forEachInOrder(n => action(n)); break;
      case 2: this.orderTree.forEachPostOrder(n => action(n)); break;
      default: throw Error(`Unexpected tab index - ${this.selectedTabI}`);
    }
  }
}
