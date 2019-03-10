import {Component, DoCheck, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { BinaryTreeNode } from '../binary-tree-node';
import * as SvgJs from 'svg.js';

@Component({
  selector: 'app-binary-tree',
  templateUrl: './binary-tree.component.html',
  styleUrls: ['./binary-tree.component.css']
})
export class BinaryTreeComponent implements OnInit, DoCheck {
  @Input('data') public binaryTree: BinaryTreeNode;
  @ViewChild('binaryTreeSvg') binaryTreeSvgElement: ElementRef;
  public svgDoc: SvgJs.Doc;

  private svgDocWidth: number;
  private svgDocHeight: number;
  private svgDocCX: number;

  private readonly nodesSize = 50;
  private readonly nodesYInterval = 65;
  private readonly nodesColor = '#f06';

  public ngOnInit(): void {
    this.svgDoc = SvgJs('binaryTreeSvg');
  }

  public ngDoCheck(): void {
    this.svgDocWidth = parseFloat(
      window.getComputedStyle(this.binaryTreeSvgElement.nativeElement, null)
        .getPropertyValue('width')
    );

    this.svgDoc.clear();

    const rootNodeCircle = this.makeCircle(this.svgDocWidth / 2, this.nodesSize / 2);
    this.drawChildrenFor(this.binaryTree, rootNodeCircle);
  }

  private drawChildrenFor(node: BinaryTreeNode, nodeCircle: SvgJs.Circle): void {
    if (node.leftChild) {
      const leftChildNodeCircle = this.makeCircle(nodeCircle.cx() * 2 / 3, nodeCircle.cy() + this.nodesYInterval);
      this.drawChildrenFor(node.leftChild, leftChildNodeCircle);
    }
    if (node.rightChild) {
      const rightChildNodeCircle = this.makeCircle(nodeCircle.cx() * 2 / 3 * 2, nodeCircle.cy() + this.nodesYInterval);
      this.drawChildrenFor(node.rightChild, rightChildNodeCircle);
    }
  }

  private makeCircle(cx: number, cy: number): SvgJs.Circle {
    return this.svgDoc.circle(this.nodesSize)
      .fill(this.nodesColor)
      .center(cx, cy);
  }
}
