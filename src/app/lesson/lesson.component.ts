import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  @Input() currentLesson: string;

  public constructor() { }

  public ngOnInit() { }
}
