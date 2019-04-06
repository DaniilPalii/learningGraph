import { Component } from '@angular/core';
import { BinaryTreeNodeModel } from '../../shared/graph/binary-tree/binary-tree-node.model';

@Component({
  selector: 'app-lesson-2',
  templateUrl: './lesson-2.component.html',
  styleUrls: ['./lesson-2.component.css']
})
export class Lesson2Component {
  public binaryTreeData =
    new BinaryTreeNodeModel(100,
      new BinaryTreeNodeModel(1,
        new BinaryTreeNodeModel(11,
          new BinaryTreeNodeModel(111)
        ),
        new BinaryTreeNodeModel(12,
          new BinaryTreeNodeModel(121,
            null,
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
        new BinaryTreeNodeModel(22,
          new BinaryTreeNodeModel(221),
          new BinaryTreeNodeModel(222))));
}
