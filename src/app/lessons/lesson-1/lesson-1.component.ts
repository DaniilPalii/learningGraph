import { Component } from '@angular/core';
import { BinaryTreeNodeModel } from '../../shared/graph/binary-tree/binary-tree-node.model';

@Component({
  selector: 'app-lesson-1',
  templateUrl: './lesson-1.component.html',
  styleUrls: ['./lesson-1.component.css']
})
export class Lesson1Component {
  public binaryTreeData =
    new BinaryTreeNodeModel(0,
      new BinaryTreeNodeModel(1,
        new BinaryTreeNodeModel(11,
          new BinaryTreeNodeModel(111),
          new BinaryTreeNodeModel(112)
        ),
        new BinaryTreeNodeModel(12,
          new BinaryTreeNodeModel(121,
            new BinaryTreeNodeModel(1211),
            new BinaryTreeNodeModel(1212)
          ),
          new BinaryTreeNodeModel(122))),
      new BinaryTreeNodeModel(2,
        new BinaryTreeNodeModel(21,
          new BinaryTreeNodeModel(211,
            new BinaryTreeNodeModel(2111),
            new BinaryTreeNodeModel(2112)
          ),
          new BinaryTreeNodeModel(212,
            new BinaryTreeNodeModel(2121),
            new BinaryTreeNodeModel(2122))),
        new BinaryTreeNodeModel(22)));
}
