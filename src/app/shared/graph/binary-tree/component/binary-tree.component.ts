import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild } from '@angular/core';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import * as SvgJs from 'svg.js';
import { BinaryTreeNode } from '../binary-tree-node';
import { Colors } from './colors';
import { Sizes } from './sizes';
import { TooltipData, TooltipTargetType } from './tooltip/tooltip-data';

@Component({
  selector: 'lgr-binary-tree',
  templateUrl: './binary-tree.component.html',
  styleUrls: ['./binary-tree.component.css']
})
export class BinaryTreeComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input('data') binaryTreeData: BinaryTreeNode;
  @Input() height: number;
  @Input() isSelectionEnabled: boolean;
  @Input() isClickEnabled: boolean;

  @Output('nodeClicked') nodeClickedEvent = new EventEmitter<BinaryTreeNode>();
  @Output('selectionChange') selectionChangeEvent = new EventEmitter<NodeSelectionChangeEvent>();

  readonly svgId: string = BinaryTreeComponent.getRandomId();

  nodesDrawnElements: { [nodeId: number]: DrawnElementsData } = {};
  nodesTooltips: { [nodeId: number]: TooltipData } = {};
  branchesTooltips: { [branchNodeId: number]: TooltipData } = {};

  @ViewChild('binaryTreeSvg') private binaryTreeSvgElement: ElementRef;

  private svgDoc: SvgJs.Doc;
  private svgDocWidth: number;
  private redrawingTimer: NodeJS.Timer;

  private readonly animationDuration: number = 150;

  ngAfterViewInit(): void {
    this.createSvg();
    this.enableRedrawingOnResize();
  }

  ngOnChanges(): void {
    this.redraw();
  }

  ngOnDestroy(): void {
    this.svgDoc.clear();
  }

  redraw(): void {
    clearTimeout(this.redrawingTimer);

    this.redrawingTimer = setTimeout(() => {
      this.fetchComputedSvgElementWidth();
      this.redrawTree();
    }, 250);
  }

  animateNodeClick(nodeId: number): void {
    this.animateCircleClick(this.nodesDrawnElements[nodeId].circle);
  }

  animateBranchClick(nodeId: number): void {
    this.animateLineClick(this.nodesDrawnElements[nodeId].branch);
  }

  selectNode(nodeId: number): void {
    const node = this.binaryTreeData.getNodeByIdRecursively(nodeId);
    const nodeDrawnElements = this.nodesDrawnElements[nodeId];
    BinaryTreeComponent.selectNodeAndColor(node, nodeDrawnElements.circle, nodeDrawnElements.value);
    this.selectBranchesToNeighboursIfTheyAreSelected(node);
    this.animateNodeClick(nodeId);
  }

  unselectNode(nodeId: number): void {
    const node = this.binaryTreeData.getNodeByIdRecursively(nodeId);
    const nodeDrawnElements = this.nodesDrawnElements[nodeId];
    BinaryTreeComponent.unselectNodeAndColor(node, nodeDrawnElements.circle, nodeDrawnElements.value);
    this.unselectBranchesToNeighboursIfTheyAreSelected(node);
  }

  selectNodeBranch(nodeId: number): void {
    this.binaryTreeData.getNodeByIdRecursively(nodeId).isBranchSelected = true;
    this.nodesDrawnElements[nodeId].branch.stroke({ color: Colors.branchSelected });
    this.animateBranchClick(nodeId);
  }

  unselectNodeBranch(nodeId: number): void {
    this.binaryTreeData.getNodeByIdRecursively(nodeId).isBranchSelected = false;
    this.nodesDrawnElements[nodeId].branch.stroke(Colors.branch);
  }

  unselectAll(): void {
    this.binaryTreeData.unselectAllRecursively();
    this.redraw();
  }

  showTooltipForNode(nodeId: number, tooltipText: string): void {
    this.nodesTooltips[nodeId] = new TooltipData(tooltipText, nodeId, TooltipTargetType.node, this);
  }

  showTooltipForNodeBranch(branchNodeId: number, tooltipText: string): void {
    this.branchesTooltips[branchNodeId] = new TooltipData(tooltipText, branchNodeId, TooltipTargetType.branch, this);
  }

  hideTooltipForNode(nodeId: number): void {
    delete this.nodesTooltips[nodeId];
  }

  hideTooltipForNodeBranch(nodeId: number): void {
    delete this.branchesTooltips[nodeId];
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

    if (this.isSelectionEnabled) {
      this.attachSelectionEvent(node, nodeGroup, circle, nodeValue);
    }

    if (this.isSelectionEnabled || this.isClickEnabled) {
      this.attachClickEvent(node, nodeGroup, circle);
      nodeGroup.attr('cursor', 'pointer');
    } else {
      nodeGroup.attr('cursor', 'default');
    }

    return nodeGroup;
  }

  private drawCircle(cx: number, cy: number, node: BinaryTreeNode): SvgJs.Circle {
    const circle = this.svgDoc.circle(Sizes.node)
      .fill(node.isSelected ? Colors.nodeSelected : Colors.node)
      .center(cx, cy);
    this.nodesDrawnElements[node.id].circle = circle;
    BinaryTreeComponent.calculateTooltipPositionIfExist(this.nodesTooltips[node.id]);

    return circle;
  }

  private drawNodeValue(cx: number, cy: number, node: BinaryTreeNode): SvgJs.Text {
    const valueText = node.value != null ? node.value.toString() : '';
    const value = this.svgDoc.text(valueText)
      .fill(node.isSelected ? Colors.nodeValueSelected : Colors.nodeValue)
      .center(cx, cy);
    this.nodesDrawnElements[node.id].value = value;

    return value;
  }

  private drawBranchBetween(startElement: SvgJs.Element, endElement: SvgJs.Element, node: BinaryTreeNode): SvgJs.Line {
    const branch = this.svgDoc.line(startElement.cx(), startElement.cy(), endElement.cx(), endElement.cy())
      .stroke({
        width: Sizes.branch,
        color: (node.isBranchSelected ? Colors.branchSelected : Colors.branch)
      })
      .back(); // decreasing z-index
    this.nodesDrawnElements[node.id].branch = branch;
    BinaryTreeComponent.calculateTooltipPositionIfExist(this.branchesTooltips[node.id]);

    return branch;
  }

  private attachSelectionEvent(node: BinaryTreeNode, nodeGroup: SvgJs.G, circle: SvgJs.Circle, nodeValue: SvgJs.Text): void {
    nodeGroup.on('click', () => {
      if (node.isSelected) {
        BinaryTreeComponent.unselectNodeAndColor(node, circle, nodeValue);
        this.unselectBranchesToNeighboursIfTheyAreSelected(node);
      } else {
        BinaryTreeComponent.selectNodeAndColor(node, circle, nodeValue);
        this.selectBranchesToNeighboursIfTheyAreSelected(node);
      }
    });
  }

  private attachClickEvent(node: BinaryTreeNode, nodeGroup: SvgJs.G, circle: SvgJs.Circle): void {
    nodeGroup.on('click', () => {
      this.nodeClickedEvent.emit(node);
      this.animateCircleClick(circle);
    });
  }

  private fetchComputedSvgElementWidth(): void {
    const computedSvgElementWidthStyle = window.getComputedStyle(this.binaryTreeSvgElement.nativeElement)
      .getPropertyValue('width');

    this.svgDocWidth = parseFloat(computedSvgElementWidthStyle);
  }

  private calculateSvgHeight(): number {
    return this.height
      ? this.height - 4
      : (this.binaryTreeData.height + 1) * Sizes.node
        + (this.binaryTreeData.height) * Sizes.nodesYInterval
        + Sizes.nodeClickDelta;
  }

  private animateCircleClick(circle: SvgJs.Circle): void {
    circle.animate(this.animationDuration)
      .size(Sizes.node, Sizes.nodeClicked)
      .after(() => circle.animate(this.animationDuration)
        .size(Sizes.nodeClicked, Sizes.node));
  }

  private animateLineClick(line: SvgJs.Line): void {
    line.animate(this.animationDuration)
      .attr('stroke-width', Sizes.branchClicked)
      .after(() => line.animate(this.animationDuration)
        .attr('stroke-width', Sizes.branch));
  }

  private selectBranchesToNeighboursIfTheyAreSelected(node: BinaryTreeNode): void {
    if (node.parent != null && node.parent.isSelected) {
      this.selectNodeBranch(node.id);
    }
    node.children.filter(c => c.isSelected)
      .forEach(c => this.selectNodeBranch(c.id));
  }

  private unselectBranchesToNeighboursIfTheyAreSelected(node: BinaryTreeNode): void {
    if (node.parent != null && node.parent.isSelected && node.isBranchSelected) {
      this.unselectNodeBranch(node.id);
    }
    node.children.filter(c => c.isSelected && c.isBranchSelected)
      .forEach(c => this.unselectNodeBranch(c.id));
  }

  private static getRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private static calculateTooltipPositionIfExist(tooltip: TooltipData): void {
    if (tooltip) tooltip.calculatePosition();
  }

  private static selectNodeAndColor(node: BinaryTreeNode, circle: SvgJs.Circle, value: SvgJs.Text): void {
    node.isSelected = true;
    circle.fill(Colors.nodeSelected);
    value.fill(Colors.nodeValueSelected);
  }

  private static unselectNodeAndColor(node: BinaryTreeNode, circle: SvgJs.Circle, value: SvgJs.Text): void {
    node.isSelected = false;
    circle.fill(Colors.node);
    value.fill(Colors.nodeValue);
  }
}

export interface NodeSelectionChangeEvent {
  node: BinaryTreeNode;
  isSelected: boolean;
}

interface DrawnElementsData {
  circle: SvgJs.Circle;
  value: SvgJs.Text;
  branch: SvgJs.Line;
}
