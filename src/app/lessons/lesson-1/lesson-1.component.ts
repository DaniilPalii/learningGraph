import { Component } from '@angular/core';
import { BinaryTreeNodeModel } from '../../shared/graph/binary-tree/binary-tree-node.model';

@Component({
  selector: 'app-lesson-1',
  templateUrl: './lesson-1.component.html',
  styleUrls: ['./lesson-1.component.css']
})
export class Lesson1Component {
  public binaryTreeData =
    // new BinaryTreeNodeModel(19991);
    new BinaryTreeNodeModel(0,
      new BinaryTreeNodeModel(1,
        new BinaryTreeNodeModel(11, null, null, true)),
      new BinaryTreeNodeModel(2));
}
