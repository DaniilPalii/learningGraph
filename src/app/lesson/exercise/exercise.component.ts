import { Component } from '@angular/core';
import { BinaryTreeNode } from '../../shared/graph-binary-tree/binary-tree-node';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  public binaryTreeData = new BinaryTreeNode(
    15,
    new BinaryTreeNode(
      32,
      new BinaryTreeNode(
        8,
        new BinaryTreeNode(10),
        new BinaryTreeNode(11)
      ),
      new BinaryTreeNode(
        9,
        new BinaryTreeNode(8,
          new BinaryTreeNode(837),
          new BinaryTreeNode(3737)
        ),
        new BinaryTreeNode(77))),
    new BinaryTreeNode(
      99,
      new BinaryTreeNode(
        76,
        new BinaryTreeNode(
          11,
          new BinaryTreeNode(14)
        )),
      new BinaryTreeNode(13)));

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
}
