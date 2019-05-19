import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BinaryTreeNodeModel as Node } from '../../shared/graph/binary-tree/binary-tree-node.model';
import { BinaryTreeComponent } from '../../shared/graph/binary-tree/component/binary-tree.component';
import { Texts } from '../../texts.data';

@Component({
  selector: 'app-lesson-1',
  templateUrl: './lesson-1.component.html',
  styleUrls: ['./lesson-1.component.css']
})
export class Lesson1Component implements AfterContentInit {
  @ViewChild('elementsDemonstrationTreeElement')
  public elementsDemonstrationTreeElement: BinaryTreeComponent;

  public readonly texts = Texts;
  public readonly log = console.log;

  public readonly firstDemonstrationTree =
    new Node(1, 4,
      new Node(11, 3,
        new Node(111, 21),
        new Node(112, 0, new Node(1121, 11), new Node(1122, 31))),
      new Node(12, 8, new Node(121, 2), new Node(122, 10)));

  private readonly elementsDemonstrationTree =
    new Node(2, 4,
      new Node(21, 3,
        new Node(211, 21),
        new Node(212, 0, new Node(2121, 11), new Node(2122, 31))),
      new Node(22, 8, new Node(221, 2), new Node(222, 10)));
  public elementsDemonstrationTreeOrder = 1;
  public readonly elementsDemonstrationTreeLastOrder = 7;

  public readonly binaryTreeData =
    new Node(null, 0,
      new Node(null, 1,
        new Node(null, 11, null, null, true)),
      new Node(null, 2));

  public ngAfterContentInit(): void {
    this.demonstrateElement();
  }

  public demonstratePreviousElement(): void {
    this.elementsDemonstrationTreeOrder--;
    this.demonstrateElement();
  }

  public demonstrateNextElement(): void {
    this.elementsDemonstrationTreeOrder++;
    this.demonstrateElement();
  }

  private demonstrateElement(): void {
    setTimeout(() => {
      switch (this.elementsDemonstrationTreeOrder) {
        case 1:
          this.elementsDemonstrationTreeElement.selectNode(2);
          break;
        case 2:
          this.elementsDemonstrationTreeElement.unselectNode(2);
          this.elementsDemonstrationTreeElement.selectNodeBranch(2);
          break;
        case 3:
          this.elementsDemonstrationTreeElement.unselectNodeBranch(2);
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          break;
        default:
          throw new Error(`elementsDemonstrationTreeOrder unexpected value: ${this.elementsDemonstrationTreeOrder}`);
        }

      },
    300);
  }
}
