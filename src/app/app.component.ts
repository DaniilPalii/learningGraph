import { Component } from '@angular/core';
import * as electron from 'electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  public minimizeWindow() {
    this.getElectronWindow().minimize();
  }

  public toggleMaximizationWindow() {
    const window = this.getElectronWindow();
    if (!window.isMaximized()) 
      window.maximize();
    else 
      window.unmaximize();
  }

  public closeWindow() {
    this.getElectronWindow().close();
  }

  private getElectronWindow(): Electron.BrowserWindow {
    return electron.remote.BrowserWindow.getFocusedWindow();
  }
}
