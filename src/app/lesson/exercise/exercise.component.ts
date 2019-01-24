import { Component, ElementRef, ViewChild } from '@angular/core';
import { TreeNode } from 'src/app/shared/graph-binary-tree/tree-node';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {
  public graphBinaryTreeData: TreeNode;
  @ViewChild('drawingPanel') drawingPanel: ElementRef;
  public circleColor: string = 'yellow';

  public constructor() {
    this.graphBinaryTreeData 
      = new TreeNode(1,
          new TreeNode(2,
            new TreeNode(3),
            new TreeNode(4),
          ),
          new TreeNode(5)
      )
  }

  public setCircleColor(color: string): void {
    this.circleColor = color;
  }

  public createCircle(x: number, y: number): void {
    this.drawingPanel.nativeElement.innerHTML += 
  }
}
