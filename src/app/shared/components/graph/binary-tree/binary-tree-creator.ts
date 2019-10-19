import { BinaryTreeNode as Node } from './binary-tree-node';

export class BinaryTreeCreator {
  static CreateTree1(): Node {
    return new Node(null, 100,
      new Node(null, 1,
        new Node(null, 11,
          new Node(null, 111)
        ),
        new Node(null, 12,
          new Node(null, 121,
            null,
            new Node(null, 1212)
          ),
          new Node(null, 122))),
      new Node(null, 2,
        new Node(null, 21,
          new Node(null, 211,
            new Node(null, 2111),
            new Node(null, 2112)
          ),
          new Node(null, 212,
            new Node(null, 2121),
            new Node(null, 2122))),
        new Node(null, 22,
          new Node(null, 221),
          new Node(null, 222))));
  }
}
