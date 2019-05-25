import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BinaryTreeNode as Node } from '../../shared/graph/binary-tree/binary-tree-node';
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

  public readonly elementsDemonstrationTree =
    new Node(2, 4,
      new Node(21, 3,
        new Node(211, 21),
        new Node(212, 0, new Node(2121, 11), new Node(2122, 31))),
      new Node(22, 8, new Node(221, 2), new Node(222, 10)));
  public readonly elementsDemonstratorStates: Array<State> = [
    new State(
      () => {
        this.elementsDemonstrationTreeElement.selectNode(2);
        this.elementsDemonstrationTreeElement.showTooltipForNode(2, 'Korzeń');
      },
      () => {
        this.elementsDemonstrationTreeElement.unselectNode(2);
        this.elementsDemonstrationTreeElement.hideTooltipForNode(2);
      },
    ),
    new State(
      () => {
        this.elementsDemonstrationTreeElement.selectNode(21);
        this.elementsDemonstrationTreeElement.showTooltipForNode(21, 'Wewnętrzny liść');
      },
      () => {
        this.elementsDemonstrationTreeElement.unselectNode(21);
        this.elementsDemonstrationTreeElement.hideTooltipForNode(21);
      }
    ),
    new State(
      () => {
        this.elementsDemonstrationTreeElement.selectNodeBranch(21);
        this.elementsDemonstrationTreeElement.showTooltipForNodeBranch(21, 'Gałąź');
      },
      () => {
        this.elementsDemonstrationTreeElement.unselectNodeBranch(21);
        this.elementsDemonstrationTreeElement.hideTooltipForNodeBranch(21);
      }
    ),
  ];
  public elementsDemonstrationStateOrder = 0;
  public readonly elementsDemonstratorLastStateNumber = this.elementsDemonstratorStates.length - 1;

  public readonly binaryTreeData =
    new Node(null, 0,
      new Node(null, 1,
        new Node(null, 11, null, null, true)),
      new Node(null, 2));

  public ngAfterContentInit(): void {
    setTimeout(
      () => this.elementsDemonstratorStates[this.elementsDemonstrationStateOrder].setUp(),
      300);
  }

  public demonstratePreviousElement(): void {
    setTimeout(() => {
        this.elementsDemonstratorStates[this.elementsDemonstrationStateOrder].tearDown();
        this.elementsDemonstratorStates[--this.elementsDemonstrationStateOrder].setUp();
      },
      300);
  }

  public demonstrateNextElement(): void {
    setTimeout(() => {
        this.elementsDemonstratorStates[this.elementsDemonstrationStateOrder].tearDown();
        this.elementsDemonstratorStates[++this.elementsDemonstrationStateOrder].setUp();
      },
      300);
  }
}

class State {
  constructor(
    public setUp: () => void,
    public tearDown: () => void
  ) { }
}


