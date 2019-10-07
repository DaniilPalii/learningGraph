export class BinaryTreeNode {
  public id: number;
  public value: number | string = null;
  public parent: BinaryTreeNode = null;
  public children = new Array<BinaryTreeNode>();
  public leftChild: BinaryTreeNode = null;
  public rightChild: BinaryTreeNode = null;
  public level: number = 1;
  public height: number = 0;
  public isSelected: boolean;
  public isBranchSelected: boolean;
  public tooltip: string;

  constructor(
    id?: number,
    value?: number | string,
    leftChild?: BinaryTreeNode,
    rightChild?: BinaryTreeNode,
    isSelected?: boolean,
    isBranchSelected?: boolean,
    tooltip?: string
  ) {
    this.id = id != null ? id : BinaryTreeNode.createRandomId();
    if (value !== undefined) this.value = value;
    if (leftChild) this.appendLeftChild(leftChild);
    if (rightChild) this.appendRightChild(rightChild);
    this.isSelected = isSelected;
    this.isBranchSelected = isBranchSelected;
    this.tooltip = tooltip;
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

  public getChildrenRecursively(): Array<BinaryTreeNode> {
    let children = this.children;
    this.children.forEach(child =>
      children = children.concat(child.getChildrenRecursively()));

    return children;
  }

  public toArray(): Array<BinaryTreeNode> {
    return [ this as BinaryTreeNode ].concat(this.getChildrenRecursively());
  }

  public getNodeByIdRecursively(id: number): BinaryTreeNode {
    if (this.id === id)
      return this;

    for (const child of this.children) {
      const foundNode = child.getNodeByIdRecursively(id);
      if (foundNode !== null)
        return foundNode;
    }

    return null;
  }

  public getRootRecursively(): BinaryTreeNode {
    if (this.isRoot())
      return this;

    return this.parent.getRootRecursively();
  }

  public getNeighbours(): Array<BinaryTreeNode> {
    let neighbours = this.children;

    if (!this.isRoot())
      neighbours = neighbours.concat(this.parent);

    return neighbours;
  }

  public unselectAllRecursively(): void {
    this.toArray().forEach(node => {
      node.isSelected = false;
      node.isBranchSelected = false;
    });
  }

  public forEachPreOrder(action: (node: BinaryTreeNode) => void): void {
    action(this);
    this.children.forEach(n => n.forEachPreOrder(action));
  }

  public forEachInOrder(action: (node: BinaryTreeNode) => void): void {
    if (this.leftChild) this.leftChild.forEachInOrder(action);
    action(this);
    if (this.rightChild) this.rightChild.forEachInOrder(action);
  }

  public forEachPostOrder(action: (node: BinaryTreeNode) => void): void {
    this.children.forEach(n => n.forEachPostOrder(action));
    action(this);
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
    this.updateThisAndParentHeightRecursively();
  }

  private refreshChildrenList(): void {
    const children = new Array<BinaryTreeNode>();
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
    this.height = Math.max(...childLevels) - this.level;

    if (!this.isRoot())
      this.parent.updateThisAndParentHeightRecursively();
  }

  private static createRandomId(): number {
    return Math.floor(Math.random() * 100000000);
  }
}
