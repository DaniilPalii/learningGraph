import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, ViewChild } from '@angular/core';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
import * as SvgJs from 'svg.js';
import { generateRandomId } from '../../../../functions/generate-random.id';
import { ifHasValue } from '../../../../functions/if-has-value';
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
  @Input() data: BinaryTreeNode;
  @Input() height: number;
  @Input() interactivityMode = InteractivityMode.none;

  @Output() nodeClicked = new EventEmitter<BinaryTreeNode>();
  @Output() selectionChanged = new EventEmitter<NodeSelectionChangeEvent>();

  readonly svgId: string = generateRandomId();

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

      this.svgDoc.clear();

      const rootNodeG = this.drawNodeG(this.svgDocWidth / 2, Sizes.nodeClicked / 2, this.data);
      this.drawChildrenRecursively(this.data, rootNodeG, 1);
    },
    250);
  }

  selectNode(nodeId: number): void {
    const node = this.data.getNodeByIdRecursively(nodeId);
    const nodeDrawnElements = this.nodesDrawnElements[nodeId];
    BinaryTreeComponent.markAndColorNodeAsSelected(node, nodeDrawnElements.circle, nodeDrawnElements.value);
    this.selectBranchesToSelectedNeighbours(node);
    this.animateCircleClick(nodeDrawnElements.circle);
  }

  unselectNode(nodeId: number): void {
    const node = this.data.getNodeByIdRecursively(nodeId);
    const nodeDrawnElements = this.nodesDrawnElements[nodeId];
    BinaryTreeComponent.markAndColorNodeAsUnselected(node, nodeDrawnElements.circle, nodeDrawnElements.value);
    this.unselectBranchesToSelectedNeighbours(node);
  }

  selectNodes(nodes: Array<BinaryTreeNode>): void {
    const node = nodes[0];
    const nodeDrawnElements = this.nodesDrawnElements[node.id];
    this.animateCircleClick(nodeDrawnElements.circle)
      .during(() => BinaryTreeComponent.markAndColorNodeAsSelected(node, nodeDrawnElements.circle, nodeDrawnElements.value))
      .during(() => this.selectBranchesToSelectedNeighbours(node))
      .delay(300)
      .after(() => this.selectNodes(nodes.slice(1)));
  }

  selectNodeBranch(nodeId: number): void {
    this.data.getNodeByIdRecursively(nodeId).isBranchSelected = true;
    this.nodesDrawnElements[nodeId].branch.stroke({ color: Colors.branchSelected });
    this.animateBranchClick(nodeId);
  }

  unselectNodeBranch(nodeId: number): void {
    this.data.getNodeByIdRecursively(nodeId).isBranchSelected = false;
    this.nodesDrawnElements[nodeId].branch.stroke(Colors.branch);
  }

  unselectAllNodesAndBranches(): void {
    this.data.unselectAllNodesAndBranches();
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
  animateBranchClick(nodeId: number): void {
    this.animateLineClick(this.nodesDrawnElements[nodeId].branch);
  }

  private createSvg(): void {
    const svgHeight = this.height
      ? this.height - 4
      : (this.data.height + 1) * Sizes.node
        + (this.data.height) * Sizes.nodesYInterval
        + Sizes.nodeClickDelta;

    this.svgDoc = SvgJs(this.svgId).height(svgHeight);
  }

  private enableRedrawingOnResize(): void {
    // tslint:disable-next-line:no-unused-expression
    new ResizeSensor(this.binaryTreeSvgElement.nativeElement, () => this.redraw());
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
    this.nodesDrawnElements[node.id] = <DrawnElementsData>{}; // TODO: initialize with values
    const circle = this.drawCircle(cx, cy, node);
    nodeGroup.add(circle);
    const nodeValue = this.drawNodeValue(cx, cy, node);
    nodeGroup.add(nodeValue);

    switch (this.interactivityMode) {
      case InteractivityMode.selectable:
        this.attachSelectionEvent(node, nodeGroup, circle, nodeValue);
      // tslint:disable-next-line:no-switch-case-fall-through
      case InteractivityMode.clickable:
        this.attachClickEvent(node, nodeGroup, circle);
        nodeGroup.attr('cursor', 'pointer');
        break;
      case InteractivityMode.none:
        nodeGroup.attr('cursor', 'default');
    }

    return nodeGroup;
  }

  private drawCircle(cx: number, cy: number, node: BinaryTreeNode): SvgJs.Circle {
    const circle = this.svgDoc.circle(Sizes.node)
      .fill(node.isSelected ? Colors.nodeSelected : Colors.node)
      .center(cx, cy);
    this.nodesDrawnElements[node.id].circle = circle;
    ifHasValue(this.nodesTooltips[node.id], t => t.calculatePosition());

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
    ifHasValue(this.nodesTooltips[node.id], t => t.calculatePosition());

    return branch;
  }

  private attachSelectionEvent(node: BinaryTreeNode, nodeGroup: SvgJs.G, circle: SvgJs.Circle, nodeValue: SvgJs.Text): void {
    nodeGroup.on('click', () => {
      if (!node.isSelected) {
        BinaryTreeComponent.markAndColorNodeAsSelected(node, circle, nodeValue);
        this.selectBranchesToSelectedNeighbours(node);
      } else {
        BinaryTreeComponent.markAndColorNodeAsUnselected(node, circle, nodeValue);
        this.unselectBranchesToSelectedNeighbours(node);
      }
    });
  }

  private attachClickEvent(node: BinaryTreeNode, nodeGroup: SvgJs.G, circle: SvgJs.Circle): void {
    nodeGroup.on('click', () => {
      this.nodeClicked.emit(node);
      this.animateCircleClick(circle);
    });
  }

  private fetchComputedSvgElementWidth(): void {
    const computedSvgElementWidthStyle = window.getComputedStyle(this.binaryTreeSvgElement.nativeElement)
      .getPropertyValue('width');

    this.svgDocWidth = parseFloat(computedSvgElementWidthStyle);
  }

  private animateCircleClick(circle: SvgJs.Circle): SvgJs.Animation {
    return circle.animate(this.animationDuration)
      .size(Sizes.node, Sizes.nodeClicked)
      .after(() => circle.animate(this.animationDuration)
        .size(Sizes.nodeClicked, Sizes.node));
  }

  private animateLineClick(line: SvgJs.Line): SvgJs.Animation {
    return line.animate(this.animationDuration)
      .attr('stroke-width', Sizes.branchClicked)
      .after(() => line.animate(this.animationDuration)
        .attr('stroke-width', Sizes.branch));
  }

  private selectBranchesToSelectedNeighbours(node: BinaryTreeNode): void {
    if (node.parent != null && node.parent.isSelected) {
      this.selectNodeBranch(node.id);
    }
    node.children.filter(c => c.isSelected)
      .forEach(c => this.selectNodeBranch(c.id));
  }

  private unselectBranchesToSelectedNeighbours(node: BinaryTreeNode): void {
    if (node.parent != null && node.parent.isSelected && node.isBranchSelected) {
      this.unselectNodeBranch(node.id);
    }
    node.children.filter(c => c.isSelected && c.isBranchSelected)
      .forEach(c => this.unselectNodeBranch(c.id));
  }

  private static markAndColorNodeAsSelected(
    node: BinaryTreeNode,
    circle: SvgJs.Circle,
    value: SvgJs.Text
  ): void {
    node.isSelected = true;
    circle.fill(Colors.nodeSelected);
    value.fill(Colors.nodeValueSelected);
  }

  private static markAndColorNodeAsUnselected(
    node: BinaryTreeNode,
    circle: SvgJs.Circle,
    value: SvgJs.Text
  ): void {
    node.isSelected = false;
    circle.fill(Colors.node);
    value.fill(Colors.nodeValue);
  }
}

export enum InteractivityMode {
  none,
  clickable,
  selectable
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
