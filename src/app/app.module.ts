import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LessonComponent } from './lesson/lesson.component';
import { ExerciseComponent } from './lesson/exercise/exercise.component';
import { GraphBinaryTreeComponent } from './shared/graph-binary-tree/graph-binary-tree.component';
import { BinaryTreeComponent } from './shared/graph-binary-tree/binary-tree/binary-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LessonComponent,
    ExerciseComponent,
    GraphBinaryTreeComponent,
    BinaryTreeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
