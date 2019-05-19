import { Component } from '@angular/core';
import { BinaryTreeNodeModel } from '../../shared/graph/binary-tree/binary-tree-node.model';

@Component({
  selector: 'app-lesson-2',
  templateUrl: './lesson-2.component.html',
  styleUrls: ['./lesson-2.component.css']
})
export class Lesson2Component {
  public binaryTreeData =
    new BinaryTreeNodeModel(null, 100,
      new BinaryTreeNodeModel(null, 1,
        new BinaryTreeNodeModel(null, 11,
          new BinaryTreeNodeModel(null, 111)
        ),
        new BinaryTreeNodeModel(null, 12,
          new BinaryTreeNodeModel(null, 121,
            null,
            new BinaryTreeNodeModel(null, 1212)
          ),
          new BinaryTreeNodeModel(null, 122))),
      new BinaryTreeNodeModel(null, 2,
        new BinaryTreeNodeModel(null, 21,
          new BinaryTreeNodeModel(null, 211,
            new BinaryTreeNodeModel(null, 2111),
            new BinaryTreeNodeModel(null, 2112)
          ),
          new BinaryTreeNodeModel(null, 212,
            new BinaryTreeNodeModel(null, 2121),
            new BinaryTreeNodeModel(null, 2122))),
        new BinaryTreeNodeModel(null, 22,
          new BinaryTreeNodeModel(null, 221),
          new BinaryTreeNodeModel(null, 222))));
}
