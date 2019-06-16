import { Component, ViewChild } from '@angular/core';
import { BinaryTreeNode as Node } from '../../../shared/graph/binary-tree/binary-tree-node';
import { BinaryTreeComponent } from '../../../shared/graph/binary-tree/component/binary-tree.component';
import { Goal } from '../goal';

@Component({
  selector: 'app-exercise-1',
  templateUrl: './exercise-1.component.html',
  styleUrls: ['./exercise-1.component.scss', './../../lessons.css']
})
export class Exercise1Component {
  @ViewChild('treeComponent') treeComponent: BinaryTreeComponent;

  shownGoals: Array<Goal>;

  readonly tree =
    new Node(null, 83,
      new Node(null, 44,
        new Node(null, 1, new Node(3, 13), new Node(23, 45))),
      new Node(null, 2, new Node(10, 3)));

  private clickedNode: Node;

  private readonly goals: Array<Goal> = [
    new Goal(
      'Proszę zaznaczyć korzeń',
      () => this.clickedNode.isRoot()),
    new Goal(
      'Proszę zaznaczyć liść',
      () => this.clickedNode.isLeaf())
  ];

  constructor() {
    this.shownGoals = new Array<Goal>(this.goals[0]);
  }

  checkExercise(): void {
    const currentGoal = this.shownGoals[this.shownGoals.length - 1];

    if (!currentGoal.isAchieved) {
      currentGoal.check();

      if (currentGoal.isAchieved) this.showNextGoal();
    }
  }

  handleNodeClick(node: Node): void {
    this.clickedNode = node;

    setTimeout(() => this.checkExercise(), 200);
    setTimeout(() => this.treeComponent.unselectNode(node.id), 400);
  }

  private showNextGoal(): void {
    const nextGoal = this.goals.find(g => !g.isAchieved);

    if (nextGoal) this.shownGoals.push(nextGoal);
  }
}
