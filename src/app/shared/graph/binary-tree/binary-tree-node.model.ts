export class BinaryTreeNodeModel {
  public value: number = null;
  public parent: BinaryTreeNodeModel = null;
  public children = new Array<BinaryTreeNodeModel>();
  public leftChild: BinaryTreeNodeModel = null;
  public rightChild: BinaryTreeNodeModel = null;
  public level: number = 1;
  public height: number = 1;
  public isSelected: boolean;
  public isBranchSelected: boolean;

  constructor(
    value?: number,
    leftChild?: BinaryTreeNodeModel,
    rightChild?: BinaryTreeNodeModel,
    isSelected?: boolean,
    isBranchSelected?: boolean
  ) {
    if (value !== undefined) this.value = value;
    if (leftChild) this.appendLeftChild(leftChild);
    if (rightChild) this.appendRightChild(rightChild);
    this.isSelected = isSelected;
    this.isBranchSelected = isBranchSelected;
  }

  public isRoot(): boolean {
    return !this.parent;
  }

  public isLeaf(): boolean {
    return !this.leftChild && !this.rightChild;
  }

  public isInner(): boolean {
    return !this.isRoot() && !this.isLeaf();
  }

  public getChildrenRecursively(): Array<BinaryTreeNodeModel> {
    let children = this.children;
    this.children.forEach(child =>
      children = children.concat(child.getChildrenRecursively()));

    return children;
  }

  private appendLeftChild(child: BinaryTreeNodeModel): void {
    this.leftChild = child;
    this.afterAppendingChild(child);
  }

  private appendRightChild(child: BinaryTreeNodeModel): void {
    this.rightChild = child;
    this.afterAppendingChild(child);
  }

  private afterAppendingChild(child: BinaryTreeNodeModel): void {
    child.parent = this;
    this.refreshChildrenList();
    this.updateChildrenLevelRecursively();
    this.updateThisAndParentHeightRecursively();
  }

  private refreshChildrenList(): void {
    const children = new Array<BinaryTreeNodeModel>();
    if (this.leftChild) children.push(this.leftChild);
    if (this.rightChild) children.push(this.rightChild);

    this.children = children;
  }

  private updateChildrenLevelRecursively(): void {
    const childrenLevel = this.level + 1;

    this.children.forEach(child => {
      child.level = childrenLevel;
      child.updateChildrenLevelRecursively();
    });
  }

  private updateThisAndParentHeightRecursively(): void {
    const childLevels = this.getChildrenRecursively().map(c => c.level);
    this.height = Math.max(...childLevels) - this.level + 1;

    if (!this.isRoot())
      this.parent.updateThisAndParentHeightRecursively();
  }
}
