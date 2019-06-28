import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as electron from 'electron';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Input() title: string;
  @Output() menuButtonClick = new EventEmitter();

  minimizeWindow(): void {
    ToolbarComponent.getElectronWindow().minimize();
  }

  toggleWindowMaximization(): void {
    const window = ToolbarComponent.getElectronWindow();
    if (!window.isMaximized())
      window.maximize();
    else
      window.unmaximize();
  }

  closeWindow(): void {
    ToolbarComponent.getElectronWindow().close();
  }

  private static getElectronWindow(): Electron.BrowserWindow {
    return electron.remote.BrowserWindow.getFocusedWindow();
  }
}
