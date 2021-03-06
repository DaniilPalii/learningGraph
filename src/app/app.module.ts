import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

import { TextService } from './services/text.service';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LessonBinaryTreeComponent } from './lessons/lesson-binary-tree/lesson-binary-tree.component';
import { LessonTreeTraversalComponent } from './lessons/lesson-tree-traversal/lesson-tree-traversal.component';
import { WhenToUseBinaryTreeLessonComponent } from './lessons/when-to-use-binary-tree-lesson/when-to-use-binary-tree-lesson.component';
import { BinaryTreeComponent } from './shared/components/graph/binary-tree/component/binary-tree.component';
import { TooltipComponent } from './shared/components/graph/binary-tree/component/tooltip/tooltip.component';
import { LessonsSourcesComponent } from './lessons/lessons-sources/lessons-sources.component';
import { Exercise1Component } from './lessons/lesson-binary-tree/exercise-1/exercise-1.component';
import { CheckComponent } from './shared/components/check/check.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TreeAnimationRunnerComponent } from './lessons/lesson-tree-traversal/tree-animation-runner/tree-animation-runner/tree-animation-runner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LessonBinaryTreeComponent,
    LessonTreeTraversalComponent,
    WhenToUseBinaryTreeLessonComponent,
    BinaryTreeComponent,
    TooltipComponent,
    LessonsSourcesComponent,
    Exercise1Component,
    CheckComponent,
    ToolbarComponent,
    TreeAnimationRunnerComponent,
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
