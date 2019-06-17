import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatRipple } from '@angular/material';
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
  @ViewChildren(MatRipple) checkElementsRipples: QueryList<MatRipple>;

  shownGoals: Array<Goal>;
  isCompleted: boolean;

  readonly tree =
    new Node(null, 83,
      new Node(null, 44,
        new Node(null, 1, new Node(null, 13), new Node(null, 45))),
      new Node(null, 2, new Node(null, 3)));

  private clickedNode: Node;

  private readonly goals: Array<Goal> = [
    new Goal('Proszę zaznaczyć korzeń', () => this.clickedNode.isRoot()),
    new Goal('Proszę zaznaczyć liść', () => this.clickedNode.isLeaf())
  ];

  constructor() {
    this.shownGoals = new Array<Goal>(this.goals[0]);
  }

  checkExercise(): void {
    const currentGoal = this.shownGoals[this.shownGoals.length - 1];

    if (!currentGoal.isAchieved) {
      currentGoal.check();

      if (currentGoal.isAchieved) {
        this.checkElementsRipples.last.launch({ radius: 15, centered: true });
        this.showNextGoalOrComplete();
      }
    }
  }

  handleNodeClick(node: Node): void {
    this.clickedNode = node;
    setTimeout(() => this.checkExercise(), 300);
    setTimeout(() => this.treeComponent.unselectNode(node.id), 600);
  }

  private showNextGoalOrComplete(): void {
    const nextGoal = this.goals.find(g => !g.isAchieved);

    if (nextGoal)
      this.shownGoals.push(nextGoal);
    else
      this.isCompleted = true;
  }
}
