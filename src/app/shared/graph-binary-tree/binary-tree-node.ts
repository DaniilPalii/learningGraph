export class BinaryTreeNode {
  public value: number;
  public parent: BinaryTreeNode;
  public leftChild: BinaryTreeNode;
  public rightChild: BinaryTreeNode;
  public level: number;

  constructor(
    value: number,
    parent: BinaryTreeNode,
    leftChild: BinaryTreeNode,
    rightChild: BinaryTreeNode
  ) {
    this.value = value;
    this.parent = parent;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
    this.level = !!this.parent ? this.parent.level + 1 : 0;
  }

  public isRoot(): boolean {
    return !!this.parent;
  }

  public isLeaf(): boolean {
    return !!this.leftChild && !!this.rightChild;
  }

  public isInner(): boolean {
    return !this.isRoot() && !this.isLeaf();
  }
}
