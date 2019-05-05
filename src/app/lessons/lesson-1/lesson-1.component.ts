import { Component } from '@angular/core';
import { BinaryTreeNodeModel as Node } from '../../shared/graph/binary-tree/binary-tree-node.model';
import { Texts } from '../../texts.data';

@Component({
  selector: 'app-lesson-1',
  templateUrl: './lesson-1.component.html',
  styleUrls: ['./lesson-1.component.css']
})
export class Lesson1Component {
  public texts = Texts;
  public log = console.log;

  public demonstrationTree =
    new Node(4,
      new Node(3,
        new Node(21),
        new Node(0, new Node(11), new Node(31))),
      new Node(8, new Node(2), new Node(10)));

  public binaryTreeData =
    new Node(0,
      new Node(1,
        new Node(11, null, null, true)),
      new Node(2));
}
