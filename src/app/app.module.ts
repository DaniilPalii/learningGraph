import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { ActionPanelComponent } from './main-panel/action-panel/action-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationPanelComponent,
    MainPanelComponent,
    ActionPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
