import { Component } from '@angular/core';
import { TextService } from '../../services/text.service';
import { BinaryTreeCreator } from '../../shared/components/graph/binary-tree/binary-tree-creator';
import { LessonBaseComponent } from '../lesson.base.component';

@Component({
  selector: 'lgr-lesson-2',
  templateUrl: './lesson-2.component.html',
  styleUrls: ['./lesson-2.component.css', './../lessons.css']
})
export class Lesson2Component extends LessonBaseComponent {
  binaryTreeData = BinaryTreeCreator.CreateTree1();

  constructor(textService: TextService) {
    super('Long name', textService);
  }
}
