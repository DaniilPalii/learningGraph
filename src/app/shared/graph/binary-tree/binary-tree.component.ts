import {
  AfterViewInit,
  Component,
  ElementRef,
  Input, OnChanges,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { BinaryTreeNodeModel } from './binary-tree-node.model';
import * as SvgJs from 'svg.js';

@Component({
  selector: 'app-binary-tree',
  templateUrl: './binary-tree.component.html',
  styleUrls: ['./binary-tree.component.css']
})
export class BinaryTreeComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input('data') public binaryTree: BinaryTreeNodeModel;
  @Input('height') public height: number;
  @Input('isSelectionEnabled') public isSelectionEnabled: boolean;

  @ViewChild('binaryTreeSvg') binaryTreeSvgElement: ElementRef;

  public svgDoc: SvgJs.Doc;

  public readonly svgId: string = Math.random().toString(36).substr(2, 9);

  private svgDocWidth: number;

  private readonly nodeSize: number = 50;
  private readonly nodeBorderWidth: number = 2;
  private readonly lineWidth: number = this.nodeBorderWidth;
  private readonly nodesYInterval: number = 70;

  public ngAfterViewInit(): void {
    this.svgDoc = SvgJs(this.svgId)
      .height(this.calculateSvgHeight());
  }

  public ngOnChanges(): void {
    setTimeout(() => {
      this.fetchComputedSvgElementWidth();
      this.redrawTree();
    }, 300);
  }

  public ngOnDestroy(): void {
    this.svgDoc.clear();
  }

  private redrawTree(): void {
    this.svgDoc.clear();

    const rootNodeG = this.drawNodeG(this.svgDocWidth / 2, this.nodeSize / 2, this.binaryTree);
    this.drawChildrenRecursively(this.binaryTree, rootNodeG, 1);
  }

  private drawChildrenRecursively(node: BinaryTreeNodeModel, nodeG: SvgJs.G, xIndex: number): void {
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

  private drawNodeG(cx: number, cy: number, node: BinaryTreeNodeModel): SvgJs.G {
    const nodeGroup = this.svgDoc.group();
    const circle = this.drawCircle(cx, cy, node);
    nodeGroup.add(circle);
    const nodeValue = this.drawNodeValue(cx, cy, node);
    nodeGroup.add(nodeValue);

    if (this.isSelectionEnabled) this.attachSelectionEvent(node, nodeGroup, circle, nodeValue);

    return nodeGroup;
  }

  private attachSelectionEvent(node: BinaryTreeNodeModel, nodeGroup: SvgJs.G, circle, nodeValue): void {
    nodeGroup.on('click', () => {
      node.isSelected = !node.isSelected;

      circle.fill(node.isSelected ? Colors.accentBackground : Colors.primaryBackground);
      nodeValue.fill(node.isSelected ? Colors.accentForeground : Colors.primaryForeground);
    });
  }

  private drawCircle(cx: number, cy: number, node: BinaryTreeNodeModel): SvgJs.Circle {
    return this.svgDoc.circle(this.nodeSize)
      .fill(node.isSelected ? Colors.accentBackground : Colors.primaryBackground)
      .center(cx, cy);
  }

  private drawNodeValue(cx: number, cy: number, node: BinaryTreeNodeModel): SvgJs.Element {
    return this.svgDoc.text(node.value.toString())
      .fill(node.isSelected ? Colors.accentForeground : Colors.primaryForeground)
      .center(cx, cy);
  }

  private drawLineBetween(startElement: SvgJs.Element, endElement: SvgJs.Element): SvgJs.Line {
    return this.svgDoc.line(startElement.cx(), startElement.cy(), endElement.cx(), endElement.cy())
      .stroke({ width: this.lineWidth, color: Colors.accentForeground })
      .back();
  }

  private fetchComputedSvgElementWidth(): void {
    const computedSvgElementWidthStyle = window
      .getComputedStyle(this.binaryTreeSvgElement.nativeElement)
      .getPropertyValue('width');

    this.svgDocWidth = parseFloat(computedSvgElementWidthStyle);
  }

  private calculateSvgHeight(): number {
    return this.height
      ? this.height - 4
      : 500; //todo calculate basing on max nodes level
  }
}

class Colors {
  public static readonly accentBackground: string = '#f06';
  public static readonly accentForeground: string = '#fff';
  public static readonly primaryBackground: string = '#b0bec5';
  public static readonly primaryForeground: string = '#000';
}
