import { Component } from '@angular/core';
import { BinaryTreeNode } from '../../shared/graph-binary-tree/binary-tree-node';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  public binaryTreeData =
    new BinaryTreeNode(0,
      new BinaryTreeNode(1,
        new BinaryTreeNode(11,
          new BinaryTreeNode(111),
          new BinaryTreeNode(112)
        ),
        new BinaryTreeNode(12,
          new BinaryTreeNode(121,
            new BinaryTreeNode(1211),
            new BinaryTreeNode(1212)
          ),
          new BinaryTreeNode(122))),
      new BinaryTreeNode(2,
        new BinaryTreeNode(21,
          new BinaryTreeNode(211,
            new BinaryTreeNode(2111),
            new BinaryTreeNode(2112)
          ),
          new BinaryTreeNode(212,
            new BinaryTreeNode(2121),
            new BinaryTreeNode(2122))),
        new BinaryTreeNode(22)));
}
