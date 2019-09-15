import { Injectable } from '@angular/core';

@Injectable()
export class TextService {
  readonly lesson = 'Lekcja';
  readonly binaryTree = 'Drzewo binarne';
  readonly treeTraversal = 'Przechodzenie po drzewie';
  readonly selectLesson = 'Proszę wybrać lekcję';
  readonly appTitle = 'Le Graph';
  readonly appTitleLong = 'Le Graph - Learn graph quick end easy!';

  getLessonTitleWithNumber(
    lessonNumber: number,
    lessonTitle: string
  ): string {
    return `${this.lesson} ${lessonNumber}: ${lessonTitle}`;
  }
}
