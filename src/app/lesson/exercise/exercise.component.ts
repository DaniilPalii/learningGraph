import { Component } from '@angular/core';
import { TreeNode } from 'src/app/shared/graph-binary-tree/tree-node';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  public graphBinaryTreeData: TreeNode;

  public constructor() {
    this.graphBinaryTreeData 
      = new TreeNode(1,
          new TreeNode(2,
            new TreeNode(3),
            new TreeNode(4),
          ),
          new TreeNode(5)
      )
  }
}
