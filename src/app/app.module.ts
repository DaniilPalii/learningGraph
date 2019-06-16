import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { Lesson1Component } from './lessons/lesson-1/lesson-1.component';
import { Lesson2Component } from './lessons/lesson-2/lesson-2.component';
import { BinaryTreeComponent } from './shared/graph/binary-tree/component/binary-tree.component';
import { TooltipComponent } from './shared/graph/binary-tree/component/tooltip/tooltip.component';
import { LessonsSourcesComponent } from './lessons/lessons-sources/lessons-sources.component';
import { Exercise1Component } from './lessons/exercises/exercise-1/exercise-1.component';
import { CheckComponent } from './shared/check/check.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    Lesson1Component,
    Lesson2Component,
    BinaryTreeComponent,
    TooltipComponent,
    LessonsSourcesComponent,
    Exercise1Component,
    CheckComponent,
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
