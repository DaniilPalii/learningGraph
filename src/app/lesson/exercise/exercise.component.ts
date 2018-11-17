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
      = new TreeNode(10, [
          new TreeNode(5, [
            new TreeNode(3),    
            new TreeNode(8),    
          ]),
          new TreeNode(11),
      ])
  }
}
