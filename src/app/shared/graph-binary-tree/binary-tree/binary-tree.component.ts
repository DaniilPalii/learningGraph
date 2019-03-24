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

  private readonly nodeSize: number = 50;
  private readonly nodeBorderWidth: number = 2;
  private readonly nodeFillingSize: number = this.nodeSize - this.nodeBorderWidth * 2;
  private readonly lineWidth: number = this.nodeBorderWidth;
  private readonly nodesYInterval: number = 70;

  private readonly nodeColor: string = '#f06';
  private readonly nodeBorderColor: string = '#fff';
  private readonly nodeTextColor: string = this.nodeBorderColor;
  private readonly lineColor: string = this.nodeBorderColor;

  public ngOnInit(): void {
    this.svgDoc = SvgJs('binaryTreeSvg');
  }

  public ngDoCheck(): void {
    this.svgDocWidth = this.getComputedSvgElementWidth();

    this.svgDoc.clear();

    const rootNodeG = this.drawNodeG(this.svgDocWidth / 2, this.nodeSize / 2, this.binaryTree);
    this.drawChildrenRecursively(this.binaryTree, rootNodeG, 1);
  }

  private drawChildrenRecursively(node: BinaryTreeNode, nodeG: SvgJs.G, xIndex: number): void {
    const childrenCY = nodeG.cy() + this.nodesYInterval;
    const possiblePointsOnLevelCount = Math.pow(2, (node.level + 1));
    const widthBetweenPossiblePointsOnLevel = this.svgDocWidth / possiblePointsOnLevelCount;
    const doubleXIndex = xIndex * 2;

    if (node.leftChild) {
      const leftChildXIndex = doubleXIndex - 1;
      const leftChildCX = leftChildXIndex * widthBetweenPossiblePointsOnLevel;
      const leftChildNodeG = this.drawNodeG(leftChildCX, childrenCY, node.leftChild);
      this.drawChildrenRecursively(node.leftChild, leftChildNodeG, leftChildXIndex);
      this.drawLineBetween(nodeG, leftChildNodeG);
    }

    if (node.rightChild) {
      const rightChildXIndex = doubleXIndex + 1;
      const rightChildCX = rightChildXIndex * widthBetweenPossiblePointsOnLevel;
      const rightChildNodeG = this.drawNodeG(rightChildCX, childrenCY, node.rightChild);
      this.drawChildrenRecursively(node.rightChild, rightChildNodeG, rightChildXIndex);
      this.drawLineBetween(nodeG, rightChildNodeG);
    }
  }

  private drawNodeG(cx: number, cy: number, node: BinaryTreeNode): SvgJs.G {
    const nodeGroup = this.svgDoc.group();
    nodeGroup.add(this.drawBorderCircle(cx, cy));
    nodeGroup.add(this.drawFillerCircle(cx, cy));
    nodeGroup.add(this.drawNodeValue(cx, cy, node.value));
    nodeGroup.on('click', () => console.log(node));

    return nodeGroup;
  }

  private drawNodeValue(cx: number, cy: number, value: number): SvgJs.Element {
    return this.svgDoc.text(value.toString())
      .fill(this.nodeTextColor)
      .center(cx, cy);
  }

  private drawBorderCircle(cx: number, cy: number): SvgJs.Circle {
    return this.svgDoc.circle(this.nodeSize)
      .fill(this.nodeBorderColor)
      .center(cx, cy);
  }

  private drawFillerCircle(cx: number, cy: number): SvgJs.Circle {
    return this.svgDoc.circle(this.nodeFillingSize)
      .fill(this.nodeColor)
      .center(cx, cy);
  }

  private drawLineBetween(startElement: SvgJs.Element, endElement: SvgJs.Element): SvgJs.Line {
    return this.svgDoc.line(startElement.cx(), startElement.cy(), endElement.cx(), endElement.cy())
      .stroke({ width: this.lineWidth, color: this.lineColor }).back();
  }

  private getComputedSvgElementWidth(): number {
    const computedSvgElementWidthStyle = window
      .getComputedStyle(this.binaryTreeSvgElement.nativeElement, null)
      .getPropertyValue('width');

    return parseFloat(computedSvgElementWidthStyle);
  }
}
