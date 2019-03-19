import { Component, DoCheck, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

  private readonly nodesSize = 50;
  private readonly nodesYInterval = 70;
  private readonly nodesColor = '#f06';

  public ngOnInit(): void {
    this.svgDoc = SvgJs('binaryTreeSvg');
  }

  public ngDoCheck(): void {
    this.svgDocWidth = this.getComputedSvgElementWidth();

    this.svgDoc.clear();

    const rootNodeG = this.drawNodeG(this.svgDocWidth / 2, this.nodesSize / 2, this.binaryTree.value);
    this.drawChildrenFor(this.binaryTree, rootNodeG, 1);
  }

  private drawChildrenFor(node: BinaryTreeNode, nodeG: SvgJs.G, xIndex: number): void {
    const childrenCY = nodeG.cy() + this.nodesYInterval;
    const possiblePointsOnLevelCount = Math.pow(2, (node.level + 1));
    const widthBetweenPossiblePointsOnLevel = this.svgDocWidth / possiblePointsOnLevelCount;
    const doubleXIndex = xIndex * 2;

    if (node.leftChild) {
      const leftChildXIndex = doubleXIndex - 1;
      const leftChildCX = leftChildXIndex * widthBetweenPossiblePointsOnLevel;
      const leftChildNodeG = this.drawNodeG(leftChildCX, childrenCY, node.leftChild.value);
      this.drawChildrenFor(node.leftChild, leftChildNodeG, leftChildXIndex);
    }

    if (node.rightChild) {
      const rightChildXIndex = doubleXIndex + 1;
      const rightChildCX = rightChildXIndex * widthBetweenPossiblePointsOnLevel;
      const rightChildNodeG = this.drawNodeG(rightChildCX, childrenCY, node.rightChild.value);
      this.drawChildrenFor(node.rightChild, rightChildNodeG, rightChildXIndex);
    }
  }

  private drawNodeG(cx: number, cy: number, value: number): SvgJs.G {
    const nodeGroup = this.svgDoc.group();
    nodeGroup.add(this.drawCircle(cx, cy));
    nodeGroup.add(this.drawNodeValue(cx, cy, value));

    return nodeGroup;
  }

  private drawNodeValue(cx: number, cy: number, value: number): SvgJs.Element {
    return this.svgDoc.text(value.toString())
      .center(cx, cy);
  }

  private drawCircle(cx: number, cy: number): SvgJs.Circle {
    return this.svgDoc.circle(this.nodesSize)
      .fill(this.nodesColor)
      .center(cx, cy);
  }

  private getComputedSvgElementWidth(): number {
    const computedSvgElementWidthStyle = window
      .getComputedStyle(this.binaryTreeSvgElement.nativeElement, null)
      .getPropertyValue('width');

    return parseFloat(computedSvgElementWidthStyle);
  }
}
