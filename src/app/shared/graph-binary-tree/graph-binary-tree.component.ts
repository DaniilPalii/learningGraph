import { Component, Input } from '@angular/core';
import { TreeNode } from './tree-node';

@Component({
  selector: 'app-graph-binary-tree',
  templateUrl: './graph-binary-tree.component.html',
  styleUrls: ['./graph-binary-tree.component.css']
})
export class GraphBinaryTreeComponent {
  @Input() data: TreeNode;
}
