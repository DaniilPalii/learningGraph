import { Component } from '@angular/core';
import { TextService } from '../../services/text.service';
import { BinaryTreeNode as Node } from '../../shared/components/graph/binary-tree/binary-tree-node';
import { BaseLesson } from '../baseLesson';

@Component({
  selector: 'lgr-lesson-tree-traversal',
  templateUrl: './lesson-tree-traversal.component.html',
  styleUrls: ['./lesson-tree-traversal.component.css', './../lessons.css']
})
export class LessonTreeTraversalComponent extends BaseLesson {
  preOrderTree = LessonTreeTraversalComponent.createTree();
  inOrderTree = LessonTreeTraversalComponent.createTree();
  postOrderTree = LessonTreeTraversalComponent.createTree();

  private selectedTabI = 0;
  private selectionNodeQueue: Node[] = [];

  constructor(textService: TextService) {
    super(textService.treeTraversal, textService);

    let counter = 1;
    this.preOrderTree.forEachPreOrder(n => n.value = counter++);
    counter = 1;
    this.inOrderTree.forEachInOrder(n => n.value = counter++);
    counter = 1;
    this.postOrderTree.forEachPostOrder(n => n.value = counter++);
  }

  public handleSelectedTabChange(tabI: number): void {
    if (tabI === this.selectedTabI) return;

    this.selectedTabI = tabI;
    this.selectionNodeQueue = [];
    this.clearSelection();

    switch (tabI) {
      case 0:
        this.preOrderTree.forEachPreOrder(n => this.selectionNodeQueue.push(n));
        break;
      case 1:
        this.inOrderTree.forEachInOrder(n => this.selectionNodeQueue.push(n));
        break;
      case 2:
        this.postOrderTree.forEachPostOrder(n => this.selectionNodeQueue.push(n));
        break;
      default:
        throw Error(`Unexpected tab index - ${tabI}`);

      this.startSelection();
    }
  }

  private startSelection(): void {
    // for (let i = 0; i < this.selectionNodeQueue.length; i++) {
    //   let closureI = i;
    //   setTimeout(() => {
    //     this.selectionNodeQueue[closureI].
    //   }, 3000 * (closureI + 1));
    // }
  }

  private clearSelection(): void {
    this.preOrderTree.forEachPreOrder(n => n.isSelected = false);
    this.inOrderTree.forEachInOrder(n => n.isSelected = false);
    this.postOrderTree.forEachPostOrder(n => n.isSelected = false);
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
