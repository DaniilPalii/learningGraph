import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { TreeNode } from 'src/app/shared/graph-binary-tree/tree-node';

import {BinaryTreeNode} from '../../shared/graph-binary-tree/binary-tree-node';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  public binaryTreeData = new BinaryTreeNode(
    15,
    new BinaryTreeNode(32, new BinaryTreeNode(8), new BinaryTreeNode(9)),
    new BinaryTreeNode(99, new BinaryTreeNode(76)));

  // public graphBinaryTreeData: TreeNode;
  // public circleColor: string = 'yellow';
  //
  // private temp: any;
  //
  // @ViewChild('drawingPanel') drawingPanel: ElementRef;
  //
  // public ngOnInit(): void {
  //   const svgDoc = SvgJs('svgjstest');
  //   const circle = svgDoc.circle(100).fill('#f06');
  //   circle.on('click', () => console.log(circle.position()));
  //   this.temp = circle;
  // }
  //
  // test() {
  //   this.temp.animate(200).move(100, 50);
  // }
  //
  // test1() {
  //   this.temp.animate(200).move(50, 100);
  // }
  //
  // public constructor() {
  //   this.graphBinaryTreeData
  //     = new TreeNode(1,
  //         new TreeNode(2,
  //           new TreeNode(3),
  //           new TreeNode(4),
  //         ),
  //         new TreeNode(5)
  //     );
  // }
  //
  // public setCircleColor(color: string): void {
  //   this.circleColor = color;
  // }
  //
  // public createCircle(x: number, y: number): void {
  //   // this.drawingPanel.nativeElement.innerHTML +=
  // }
}
