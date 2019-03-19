export class BinaryTreeNode {
  public value: number = null;
  public parent: BinaryTreeNode = null;
  public leftChild: BinaryTreeNode = null;
  public rightChild: BinaryTreeNode = null;
  public level: number = 1;

  constructor(
    value?: number,
    leftChild?: BinaryTreeNode,
    rightChild?: BinaryTreeNode
  ) {
    if (value) this.value = value;
    if (leftChild) this.appendLeftChild(leftChild);
    if (rightChild) this.appendRightChild(rightChild);
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

  private appendLeftChild(node: BinaryTreeNode) {
    this.getNodeReadyToAppendingAsChild(node);
    this.leftChild = node;
  }

  private appendRightChild(node: BinaryTreeNode) {
    this.getNodeReadyToAppendingAsChild(node);
    this.rightChild = node;
  }

  private getNodeReadyToAppendingAsChild(node: BinaryTreeNode) {
    node.parent = this;
    node.level = this.level + 1;
  }
}
