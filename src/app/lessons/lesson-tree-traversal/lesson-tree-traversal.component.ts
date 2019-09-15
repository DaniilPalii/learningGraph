import { Component } from '@angular/core';
import { TextService } from '../../services/text.service';
import { BaseLesson } from '../baseLesson';

@Component({
  selector: 'lgr-lesson-tree-traversal',
  templateUrl: './lesson-tree-traversal.component.html',
  styleUrls: ['./lesson-tree-traversal.component.css', './../lessons.css']
})
export class LessonTreeTraversalComponent extends BaseLesson {
  constructor(textService: TextService) {
    super(textService.treeTraversal, textService);
  }
}
