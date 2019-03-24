export class BinaryTreeNode {
  public value: number = null;
  public parent: BinaryTreeNode = null;
  public children = new Array<BinaryTreeNode>();
  public leftChild: BinaryTreeNode = null;
  public rightChild: BinaryTreeNode = null;
  public level: number = 1;

  constructor(
    value?: number,
    leftChild?: BinaryTreeNode,
    rightChild?: BinaryTreeNode
  ) {
    if (value !== undefined) this.value = value;
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

  private appendLeftChild(child: BinaryTreeNode): void {
    this.leftChild = child;
    this.afterAppendingChild(child);
  }

  private appendRightChild(child: BinaryTreeNode): void {
    this.rightChild = child;
    this.afterAppendingChild(child);
  }

  private afterAppendingChild(child: BinaryTreeNode): void {
    child.parent = this;
    this.refreshChildrenList();
    this.updateChildrenLevelRecursively();
  }

  private updateChildrenLevelRecursively(): void {
    const childrenLevel = this.level + 1;

    this.children.forEach(child => {
      child.level = childrenLevel;
      child.updateChildrenLevelRecursively();
    });
  }

  private refreshChildrenList(): void {
    const children = new Array<BinaryTreeNode>();
    if (this.leftChild) children.push(this.leftChild);
    if (this.rightChild) children.push(this.rightChild);

    this.children = children;
  }
}
