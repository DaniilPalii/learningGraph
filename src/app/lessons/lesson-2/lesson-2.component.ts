import { Component } from '@angular/core';
import { TextService } from '../../services/text.service';
import { BinaryTreeNode } from '../../shared/graph/binary-tree/binary-tree-node';
import { BaseLesson } from '../baseLesson';

@Component({
  selector: 'lgr-lesson-2',
  templateUrl: './lesson-2.component.html',
  styleUrls: ['./lesson-2.component.css', './../lessons.css']
})
export class Lesson2Component extends BaseLesson {
  binaryTreeData =
    new BinaryTreeNode(null, 100,
      new BinaryTreeNode(null, 1,
        new BinaryTreeNode(null, 11,
          new BinaryTreeNode(null, 111)
        ),
        new BinaryTreeNode(null, 12,
          new BinaryTreeNode(null, 121,
            null,
            new BinaryTreeNode(null, 1212)
          ),
          new BinaryTreeNode(null, 122))),
      new BinaryTreeNode(null, 2,
        new BinaryTreeNode(null, 21,
          new BinaryTreeNode(null, 211,
            new BinaryTreeNode(null, 2111),
            new BinaryTreeNode(null, 2112)
          ),
          new BinaryTreeNode(null, 212,
            new BinaryTreeNode(null, 2121),
            new BinaryTreeNode(null, 2122))),
        new BinaryTreeNode(null, 22,
          new BinaryTreeNode(null, 221),
          new BinaryTreeNode(null, 222))));

  constructor(textService: TextService) {
    super('Long name', textService);
  }
}
