import { Component } from '@angular/core';
import { TextService } from '../../services/text.service';
import { LessonBaseComponent } from '../lesson.base.component';

@Component({
  selector: 'lgr-when-to-use-binary-tree-lesson',
  templateUrl: './when-to-use-binary-tree-lesson.component.html',
  styleUrls: ['./when-to-use-binary-tree-lesson.component.css', './../lessons.css']
})
export class WhenToUseBinaryTreeLessonComponent extends LessonBaseComponent {
  constructor(textService: TextService) {
    super(textService.whenToUseBinaryTree, textService);
  }
}
