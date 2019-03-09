import { Component, OnInit } from '@angular/core';
import { BinaryTreeNode } from '../binary-tree-node';

@Component({
  selector: 'app-binary-tree',
  templateUrl: './binary-tree.component.html',
  styleUrls: ['./binary-tree.component.css']
})
export class BinaryTreeComponent implements OnInit {
  public binaryTree: BinaryTreeNode;

  constructor() { }

  ngOnInit() { }

}
