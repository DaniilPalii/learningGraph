import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

import { TextService } from './services/text.service';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LessonBinaryTreeComponent } from './lessons/lesson-binary-tree/lesson-binary-tree.component';
import { LessonTreeTraversalComponent } from './lessons/lesson-tree-traversal/lesson-tree-traversal.component';
import { Lesson2Component } from './lessons/lesson-2/lesson-2.component';
import { BinaryTreeComponent } from './shared/graph/binary-tree/component/binary-tree.component';
import { TooltipComponent } from './shared/graph/binary-tree/component/tooltip/tooltip.component';
import { LessonsSourcesComponent } from './lessons/lessons-sources/lessons-sources.component';
import { Exercise1Component } from './lessons/exercises/exercise-1/exercise-1.component';
import { CheckComponent } from './shared/check/check.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LessonBinaryTreeComponent,
    LessonTreeTraversalComponent,
    Lesson2Component,
    BinaryTreeComponent,
    TooltipComponent,
    LessonsSourcesComponent,
    Exercise1Component,
    CheckComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [TextService],
  bootstrap: [AppComponent]
})
export class AppModule { }
