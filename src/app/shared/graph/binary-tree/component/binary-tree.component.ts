import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild } from '@angular/core';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import { BinaryTreeNode } from '../binary-tree-node';
import * as SvgJs from 'svg.js';

export interface NodeSelectionChangeEvent {
  node: BinaryTreeNode;
  isSelected: boolean;
}

@Component({
  selector: 'app-binary-tree',
  templateUrl: './binary-tree.component.html',
  styleUrls: ['./binary-tree.component.css']
})
export class BinaryTreeComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input('data')
  public binaryTreeData: BinaryTreeNode;

  @Input('height')
  public height: number;

  @Input('isSelectionEnabled')
  public isSelectionEnabled: boolean;

  @Input('isClickEnabled')
  public isClickEnabled: boolean;

  @Output('nodeClicked')
  public nodeClickedEvent = new EventEmitter<BinaryTreeNode>();

  @Output('selectionChange')
  public selectionChangeEvent = new EventEmitter<NodeSelectionChangeEvent>();

  public readonly svgId: string = BinaryTreeComponent.getRandomId();

  @ViewChild('binaryTreeSvg')
  private binaryTreeSvgElement: ElementRef;

  private svgDoc: SvgJs.Doc;
  private svgDocWidth: number;
  private redrawingTimer: NodeJS.Timer;
  private nodesDrawnElements: { [nodeId: number]: { circle: SvgJs.Circle, value: SvgJs.Text, branch: SvgJs.Line } } = { };

  private readonly animationDuration: number = 150;

  private static getRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  public ngAfterViewInit(): void {
    this.createSvg();
    this.enableRedrawingOnResize();
  }

  public ngOnChanges(): void {
    this.redraw();
  }

  public ngOnDestroy(): void {
    this.svgDoc.clear();
  }

  public redraw(): void {
    clearTimeout(this.redrawingTimer);

    this.redrawingTimer = setTimeout(() => {
      this.fetchComputedSvgElementWidth();
      this.redrawTree();
    }, 250);
  }

  public animateNodeClick(nodeId: number): void {
    this.animateCircleClick(this.nodesDrawnElements[nodeId].circle);
  }

  public selectNode(nodeId: number): void {
    this.binaryTreeData.getNodeByIdRecursively(nodeId).isSelected = true;

    const nodeDrawnElements = this.nodesDrawnElements[nodeId];
    nodeDrawnElements.circle.fill(Colors.nodeSelected);
    nodeDrawnElements.value.fill(Colors.nodeValueSelected);

    this.animateNodeClick(nodeId);
  }

  public unselectNode(nodeId: number): void {
    this.binaryTreeData.getNodeByIdRecursively(nodeId).isSelected = false;

    const nodeDrawnElements = this.nodesDrawnElements[nodeId];
    nodeDrawnElements.circle.fill(Colors.node);
    nodeDrawnElements.value.fill(Colors.nodeValue);
  }

  public selectNodeBranch(nodeId: number): void {
    this.binaryTreeData.getNodeByIdRecursively(nodeId).isBranchSelected = true;
    this.nodesDrawnElements[nodeId].branch.stroke({ color: Colors.branchSelected });
  }

  public unselectNodeBranch(nodeId: number): void {
    this.binaryTreeData.getNodeByIdRecursively(nodeId).isBranchSelected = false;
    this.nodesDrawnElements[nodeId].branch.stroke(Colors.branch);
  }

  private createSvg(): void {
    this.svgDoc = SvgJs(this.svgId)
      .height(this.calculateSvgHeight());
  }

  private enableRedrawingOnResize(): void {
    // tslint:disable-next-line:no-unused-expression
    new ResizeSensor(this.binaryTreeSvgElement.nativeElement, () => this.redraw());
  }

  private redrawTree(): void {
    this.svgDoc.clear();

    const rootNodeG = this.drawNodeG(this.svgDocWidth / 2, Sizes.nodeClicked / 2, this.binaryTreeData);
    this.drawChildrenRecursively(this.binaryTreeData, rootNodeG, 1);
  }

  private drawChildrenRecursively(node: BinaryTreeNode, nodeG: SvgJs.G, xIndex: number): void {
    const childrenCY = nodeG.cy() + Sizes.nodesCYInterval;
    const possiblePointsOnLevelCount = Math.pow(2, (node.level + 1));
    const widthBetweenPossiblePointsOnLevel = this.svgDocWidth / possiblePointsOnLevelCount;
    const doubleXIndex = xIndex * 2;

    if (node.leftChild) {
      const leftChildXIndex = doubleXIndex - 1;
      this.drawChildAndHisChildrenRecursively(leftChildXIndex, widthBetweenPossiblePointsOnLevel, childrenCY, node.leftChild, nodeG);
    }

    if (node.rightChild) {
      const rightChildXIndex = doubleXIndex + 1;
      this.drawChildAndHisChildrenRecursively(rightChildXIndex, widthBetweenPossiblePointsOnLevel, childrenCY, node.rightChild, nodeG);
    }
  }

  private drawChildAndHisChildrenRecursively(childXIndex: number, widthBetweenPossiblePointsOnLevel: number, childrenCY: number,
                                             child: BinaryTreeNode, parentNodeG: SvgJs.G): void {
    const leftChildCX = childXIndex * widthBetweenPossiblePointsOnLevel;
    const childNodeG = this.drawNodeG(leftChildCX, childrenCY, child);
    this.drawChildrenRecursively(child, childNodeG, childXIndex);
    this.drawBranchBetween(parentNodeG, childNodeG, child);
  }

  private drawNodeG(cx: number, cy: number, node: BinaryTreeNode): SvgJs.G {
    const nodeGroup = this.svgDoc.group();
    this.nodesDrawnElements[node.id] = <any>{};
    const circle = this.drawCircle(cx, cy, node);
    nodeGroup.add(circle);
    const nodeValue = this.drawNodeValue(cx, cy, node);
    nodeGroup.add(nodeValue);

    if (this.isSelectionEnabled)
      this.attachSelectionEvent(node, nodeGroup, circle, nodeValue);

    if (this.isSelectionEnabled || this.isClickEnabled) {
      this.attachClickEvent(node, nodeGroup, circle);
      nodeGroup.attr('cursor', 'pointer');
    } else
      nodeGroup.attr('cursor', 'default');

    return nodeGroup;
  }

  private drawCircle(cx: number, cy: number, node: BinaryTreeNode): SvgJs.Circle {
    const circle = this.svgDoc.circle(Sizes.node)
      .fill(node.isSelected ? Colors.nodeSelected : Colors.node)
      .center(cx, cy);
    this.nodesDrawnElements[node.id].circle = circle;

    return circle;
  }

  private drawNodeValue(cx: number, cy: number, node: BinaryTreeNode): SvgJs.Text {
    const value = this.svgDoc.text(node.value.toString())
      .fill(node.isSelected ? Colors.nodeValueSelected : Colors.nodeValue)
      .center(cx, cy);
    this.nodesDrawnElements[node.id].value = value;

    return value;
  }

  private attachSelectionEvent(node: BinaryTreeNode, nodeGroup: SvgJs.G, circle: SvgJs.Circle, nodeValue: SvgJs.Text): void {
    nodeGroup.on('click', () => {
      node.isSelected = !node.isSelected;

      circle.fill(node.isSelected ? Colors.nodeSelected : Colors.node);
      nodeValue.fill(node.isSelected ? Colors.nodeValueSelected : Colors.nodeValue);
    });
  }

  private attachClickEvent(node: BinaryTreeNode, nodeGroup: SvgJs.G, circle: SvgJs.Circle): void {
    nodeGroup.on('click', () => {
      this.nodeClickedEvent.emit(node);
      this.animateCircleClick(circle);
    });
  }

  private drawBranchBetween(startElement: SvgJs.Element, endElement: SvgJs.Element, node: BinaryTreeNode): SvgJs.Line {
    const branch = this.svgDoc.line(startElement.cx(), startElement.cy(), endElement.cx(), endElement.cy())
      .stroke({
        width: Sizes.lineWidth,
        color: (node.isSelected ? Colors.branchSelected : Colors.branch)
      })
      .back(); // 'back' decrease z-index
    this.nodesDrawnElements[node.id].branch = branch;

    return branch;
  }

  private fetchComputedSvgElementWidth(): void {
    const computedSvgElementWidthStyle = window.getComputedStyle(this.binaryTreeSvgElement.nativeElement)
      .getPropertyValue('width');

    this.svgDocWidth = parseFloat(computedSvgElementWidthStyle);
  }

  private calculateSvgHeight(): number {
    return this.height
      ? this.height - 4
      : this.binaryTreeData.height * Sizes.node
        + (this.binaryTreeData.height - 1) * Sizes.nodesYInterval
        + Sizes.nodeClickDelta;
  }

  private animateCircleClick(circle: SvgJs.Circle): void {
    circle.animate(this.animationDuration).size(Sizes.node, Sizes.nodeClicked)
      .after(() => circle.animate(this.animationDuration).size(Sizes.nodeClicked, Sizes.node));
  }
}

class Colors {
  private static readonly accentBackground: string =        '#f06';
  private static readonly accentBackgroundDarker: string =  '#dc0057';
  private static readonly accentForeground: string =        '#fff';
  private static readonly primaryBackground: string =       '#b0bec5';
  private static readonly primaryForeground: string =       '#000';

  public static readonly node =               Colors.primaryBackground;
  public static readonly nodeSelected =       Colors.accentBackground;
  public static readonly nodeValue =          Colors.primaryForeground;
  public static readonly nodeValueSelected =  Colors.accentForeground;
  public static readonly branch =             Colors.accentForeground;
  public static readonly branchSelected =     Colors.accentBackgroundDarker;
}

class Sizes {
  public static readonly node: number = 50;
  public static readonly nodeClickDelta: number = 7;
  public static readonly nodeClicked: number = Sizes.node + Sizes.nodeClickDelta;
  public static readonly nodeBorderWidth: number = 2;
  public static readonly lineWidth: number = Sizes.nodeBorderWidth;
  public static readonly nodesYInterval: number = 20;
  public static readonly nodesCYInterval: number = Sizes.nodesYInterval + Sizes.node;
}
