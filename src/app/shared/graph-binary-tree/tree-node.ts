export class TreeNode {
  public id: number;
  public value: number;
  public children: Array<TreeNode>;

  public constructor(value: number, children?: Array<TreeNode>) {
    this.value = value;
    this.children = children;
  }
}
