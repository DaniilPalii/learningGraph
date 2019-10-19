import { Component, ViewChild } from '@angular/core';
import { TextService } from '../../services/text.service';
import { BinaryTreeNode as Node } from '../../shared/components/graph/binary-tree/binary-tree-node';
import { LessonBaseComponent } from '../lesson.base.component';
import { TreeAnimationRunnerComponent } from './tree-animation-runner/tree-animation-runner/tree-animation-runner.component';

@Component({
  selector: 'lgr-lesson-tree-traversal',
  templateUrl: './lesson-tree-traversal.component.html',
  styleUrls: ['./lesson-tree-traversal.component.css', './../lessons.css']
})
export class LessonTreeTraversalComponent extends LessonBaseComponent {
  orderTree = LessonTreeTraversalComponent.createTree();

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
    this.orderTree = LessonTreeTraversalComponent.createTree();
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

  private static createTree(): Node {
    return new Node(null, 100,
      new Node(null, 1,
        new Node(null, 11,
          new Node(null, 111)
        ),
        new Node(null, 12,
          new Node(null, 121,
            null,
            new Node(null, 1212)
          ),
          new Node(null, 122))),
      new Node(null, 2,
        new Node(null, 21,
          new Node(null, 211,
            new Node(null, 2111),
            new Node(null, 2112)
          ),
          new Node(null, 212,
            new Node(null, 2121),
            new Node(null, 2122))),
        new Node(null, 22,
          new Node(null, 221),
          new Node(null, 222))));
  }
}
