import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatRipple } from '@angular/material';
import { BinaryTreeNode as Node } from '../../../shared/components/graph/binary-tree/binary-tree-node';
import { BinaryTreeComponent, InteractivityMode } from '../../../shared/components/graph/binary-tree/component/binary-tree.component';
import { ExerciseGoal } from '../../exercise-goal';

@Component({
  selector: 'lgr-exercise-1',
  templateUrl: './exercise-1.component.html',
  styleUrls: ['./exercise-1.component.scss', '../../lessons.css']
})
export class Exercise1Component {
  @ViewChild('treeComponent') treeComponent: BinaryTreeComponent;
  @ViewChildren(MatRipple) checkElementsRipples: QueryList<MatRipple>;

  shownGoals: Array<ExerciseGoal>;
  isCompleted: boolean;

  readonly BinaryTreeComponentMode = InteractivityMode;

  readonly tree =
    new Node(null, 83,
      new Node(null, 44,
        new Node(null, 1, new Node(null, 13), new Node(null, 45))),
      new Node(null, 2, new Node(null, 3)));

  private clickedNode: Node;
  private isMultiselectionEnabled: boolean;

  private readonly goals: Array<ExerciseGoal> = [
    new ExerciseGoal('Proszę zaznaczyć korzeń', () => this.clickedNode.isRoot()),
    new ExerciseGoal('Proszę zaznaczyć liść', () => this.clickedNode.isLeaf()),
    new ExerciseGoal('Proszę zaznaczyć węzeł wewnętrzny', () => this.clickedNode.isInner()),
    new ExerciseGoal(
      'Proszę zaznaczyć ścieżkę',
      () => this.checkIsRoadClicked(),
      () => this.isMultiselectionEnabled = true,
      () => {
        this.isMultiselectionEnabled = false;
        this.treeComponent.unselectAllNodesAndBranches();
      }),
  ];

  constructor() {
    this.shownGoals = new Array<ExerciseGoal>(this.goals[0]);
  }

  checkExercise(): void {
    const currentGoal = this.shownGoals[this.shownGoals.length - 1];

    if (!currentGoal.isAchieved) {
      currentGoal.check();

      if (currentGoal.isAchieved) {
        currentGoal.tearDown();
        this.checkElementsRipples.last.launch({ radius: 15, centered: true });
        this.showNextGoalOrComplete();
      }
    }
  }

  handleNodeClick(node: Node): void {
    this.clickedNode = node;
    setTimeout(() => this.checkExercise(), 300);

    if (!this.isMultiselectionEnabled) {
      setTimeout(() => this.treeComponent.unselectNode(node.id), 600);
    }
  }

  private showNextGoalOrComplete(): void {
    const nextGoal = this.goals.find(g => !g.isAchieved);

    if (nextGoal) {
      this.shownGoals.push(nextGoal);
      nextGoal.setUp();
    } else {
      this.isCompleted = true;
    }
  }

  private checkIsRoadClicked(): boolean {
    const nodes = this.tree.toArray();
    const selectedNodes = nodes.filter(n => n.isSelected);

    if (selectedNodes.length < 2) {
      return false;
    }

    const selectedBranches = nodes.filter(n => n.isBranchSelected);

    if (selectedNodes.length !== selectedBranches.length + 1) {
      return false;
    }

    const nodesWithTwoSelectedChildren = selectedNodes.filter(
      node => node.children.length === 2
        && node.children.every(c => c.isSelected));

    return nodesWithTwoSelectedChildren.length <= 1;
  }
}
