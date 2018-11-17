import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LessonComponent } from './lesson/lesson.component';
import { ExerciseComponent } from './lesson/exercise/exercise.component';
import { GraphBinaryTreeComponent } from './shared/graph-binary-tree/graph-binary-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LessonComponent,
    ExerciseComponent,
    GraphBinaryTreeComponent,
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
