const fs = require('fs');
const f_angular = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';

fs.readFile(f_angular, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  let result = data.replace(/target: "electron-renderer",/g, '');
  result = result.replace(/return {/g, 'return {target: "electron-renderer",');

  fs.writeFile(f_angular, result, 'utf8', err => {
    if (err) {
      return console.log(err);
    }
  });
});
