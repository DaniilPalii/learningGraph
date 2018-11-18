export class TreeNode {
  public id: number;
  public value: number;
  public children: Array<TreeNode>;

  public constructor(value: number, leftChild?: TreeNode, rightNode?: TreeNode) {
    this.value = value;
    this.children = new Array<TreeNode>(leftChild, rightNode);
  }
}
