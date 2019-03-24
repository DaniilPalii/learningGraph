export class BinaryTreeNode {
  public value: number = null;
  public parent: BinaryTreeNode = null;
  public children = new Array<BinaryTreeNode>();
  public childCount: number = 0;
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

  public getTextInfo(): string {
    return `BinaryTreeNode:
    value: ${this.value},
    parent is ${this.parent ? 'present' : 'empty'},
    leftChild is ${this.leftChild ? 'present' : 'empty'},
    rightChild is ${this.rightChild ? 'present' : 'empty'},
    level: ${this.level},
    childCount: ${this.childCount}`;
  }

  private appendLeftChild(futureChild: BinaryTreeNode): void {
    this.leftChild = futureChild;
    this.afterAppendingChild(futureChild);
  }

  private appendRightChild(futureChild: BinaryTreeNode): void {
    this.rightChild = futureChild;
    this.afterAppendingChild(futureChild);
  }

  private afterAppendingChild(futureChild: BinaryTreeNode): void {
    futureChild.parent = this;
    this.childCount = futureChild.childCount + 1;
    this.refreshChildrenList();
    this.updateChildrenLevelRecursively();
  }

  private updateChildrenLevelRecursively(): void {
    this.children.forEach(child => {
      child.level = this.level + 1;
      child.updateChildrenLevelRecursively();
    });
  }

  private refreshChildrenList(): void {
    const children = new Array<BinaryTreeNode>();

    if (this.leftChild) this.children.push(this.leftChild);
    if (this.rightChild) this.children.push(this.rightChild);

    this.children = children;
  }
}
