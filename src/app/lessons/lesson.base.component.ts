import { Input } from '@angular/core';
import { TextService } from '../services/text.service';

export abstract class LessonBaseComponent {
  @Input()
  set lessonNumber(value: number) {
    this._lessonNumber = value;
    this.lessonTitleWithNumber = this.textService.getLessonTitleWithNumber(this.lessonNumber, this.lessonTitle);
  }
  get lessonNumber(): number {
    return this._lessonNumber;
  }

  lessonTitleWithNumber: string;

  private _lessonNumber: number;

  protected constructor(
    public readonly lessonTitle: string,
    public readonly textService: TextService
  ) {
    this.lessonTitleWithNumber = lessonTitle;
  }
}
