import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input, OnChanges,
  OnDestroy, Output,
  ViewChild
} from '@angular/core';
import { BinaryTreeNodeModel } from './binary-tree-node.model';
import * as SvgJs from 'svg.js';

export interface NodeSelectionChangeEvent {
  node: BinaryTreeNodeModel;
  isSelected: boolean;
}

@Component({
  selector: 'app-binary-tree',
  templateUrl: './binary-tree.component.html',
  styleUrls: ['./binary-tree.component.css']
})
export class BinaryTreeComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input('data')
  public binaryTree: BinaryTreeNodeModel;

  @Input('height')
  public height: number;

  @Input('isSelectionEnabled')
  public isSelectionEnabled: boolean;

  @Output('nodeClicked')
  public nodeClickedEvent = new EventEmitter<BinaryTreeNodeModel>();

  @Output('selectionChange')
  public selectionChangeEvent = new EventEmitter<NodeSelectionChangeEvent>();

  public readonly svgId: string = BinaryTreeComponent.getRandomId();

  @ViewChild('binaryTreeSvg')
  private binaryTreeSvgElement: ElementRef;

  private svgDoc: SvgJs.Doc;
  private svgDocWidth: number;

  private readonly animationDuration: number = 150;

  private static getRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

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

    const rootNodeG = this.drawNodeG(this.svgDocWidth / 2, Sizes.nodeClicked / 2, this.binaryTree);
    this.drawChildrenRecursively(this.binaryTree, rootNodeG, 1);
  }

  private drawChildrenRecursively(node: BinaryTreeNodeModel, nodeG: SvgJs.G, xIndex: number): void {
    const childrenCY = nodeG.cy() + Sizes.nodesYInterval;
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
    this.attachClickEvent(node, nodeGroup, circle);

    return nodeGroup;
  }

  private drawCircle(cx: number, cy: number, node: BinaryTreeNodeModel): SvgJs.Circle {
    return this.svgDoc.circle(Sizes.node)
      .fill(node.isSelected ? Colors.accentBackground : Colors.primaryBackground)
      .center(cx, cy);
  }

  private drawNodeValue(cx: number, cy: number, node: BinaryTreeNodeModel): SvgJs.Text {
    return this.svgDoc.text(node.value.toString())
      .fill(node.isSelected ? Colors.accentForeground : Colors.primaryForeground)
      .center(cx, cy);
  }

  private attachSelectionEvent(node: BinaryTreeNodeModel, nodeGroup: SvgJs.G, circle: SvgJs.Circle, nodeValue: SvgJs.Text): void {
    nodeGroup.on('click', () => {
      node.isSelected = !node.isSelected;

      circle.fill(node.isSelected ? Colors.accentBackground : Colors.primaryBackground);
      nodeValue.fill(node.isSelected ? Colors.accentForeground : Colors.primaryForeground);
    });
  }

  private attachClickEvent(node: BinaryTreeNodeModel, nodeGroup: SvgJs.G, circle: SvgJs.Circle): void {
    nodeGroup.on('click', () => {
      this.nodeClickedEvent.emit(node);
      circle.animate(this.animationDuration).size(Sizes.node, Sizes.nodeClicked)
        .after(() => circle.animate(this.animationDuration).size(Sizes.nodeClicked, Sizes.node));
    });
  }

  private drawLineBetween(startElement: SvgJs.Element, endElement: SvgJs.Element): SvgJs.Line {
    return this.svgDoc.line(startElement.cx(), startElement.cy(), endElement.cx(), endElement.cy())
      .stroke({ width: Sizes.lineWidth, color: Colors.accentForeground })
      .back();
  }

  private fetchComputedSvgElementWidth(): void {
    const computedSvgElementWidthStyle = window.getComputedStyle(this.binaryTreeSvgElement.nativeElement)
      .getPropertyValue('width');

    this.svgDocWidth = parseFloat(computedSvgElementWidthStyle);
  }

  private calculateSvgHeight(): number {
    let svgHeight = this.height
      ? this.height
      : this.binaryTree.level * Sizes.node
        + (this.binaryTree.level - 1) * Sizes.nodesYInterval;
    svgHeight -= 4;

    return svgHeight;
  }
}

class Colors {
  public static readonly accentBackground: string = '#f06';
  public static readonly accentForeground: string = '#fff';
  public static readonly primaryBackground: string = '#b0bec5';
  public static readonly primaryForeground: string = '#000';
}

class Sizes {
  public static readonly node: number = 50;
  public static readonly nodeClicked: number = Sizes.node + 7;
  public static readonly nodeBorderWidth: number = 2;
  public static readonly lineWidth: number = Sizes.nodeBorderWidth;
  public static readonly nodesYInterval: number = 70;
}
