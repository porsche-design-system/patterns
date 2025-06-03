import * as fs from 'node:fs';

const walk = (dir, done): void => {
  fs.readdir(dir, (error, list) => {
    if (error) {
      return done(error);
    }

    let i = 0;

    (function next() {
      let file = list[i++];

      if (!file) {
        return done(null);
      }

      file = `${dir}/${file}`;

      fs.stat(file, (_error, stat) => {
        if (stat?.isDirectory()) {
          walk(file, () => {
            next();
          });
        } else {
          if (file.endsWith('actual.png')) {
            // Chrome
            if (/chrome(-retry\d)?$/.test(file.split('/').slice(-2, -1)[0])) {
              fs.renameSync(file, file.replace(/actual.png$/, 'chrome.png'));
            }
            // Safari
            if (/safari(-retry\d)?$/.test(file.split('/').slice(-2, -1)[0])) {
              fs.renameSync(file, file.replace(/actual.png$/, 'safari.png'));
            }
            // Firefox
            if (/firefox(-retry\d)?$/.test(file.split('/').slice(-2, -1)[0])) {
              fs.renameSync(file, file.replace(/actual.png$/, 'firefox.png'));
            }
            // iPad Pro 11
            if (/ipad-pro-11(-retry\d)?$/.test(file.split('/').slice(-2, -1)[0])) {
              fs.renameSync(file, file.replace(/actual.png$/, 'ipad-pro-11.png'));
            }
            // iPad Pro 11 Landscape
            if (/ipad-pro-11-landscape(-retry\d)?$/.test(file.split('/').slice(-2, -1)[0])) {
              fs.renameSync(file, file.replace(/actual.png$/, 'ipad-pro-11-landscape.png'));
            }
            // iPhone 15
            if (/iphone-15(-retry\d)?$/.test(file.split('/').slice(-2, -1)[0])) {
              fs.renameSync(file, file.replace(/actual.png$/, 'iphone-15.png'));
            }
            // iPhone 15 Landscape
            if (/iphone-15-landscape(-retry\d)?$/.test(file.split('/').slice(-2, -1)[0])) {
              fs.renameSync(file, file.replace(/actual.png$/, 'iphone-15-landscape.png'));
            }
            // Pixel 7
            if (/pixel-7(-retry\d)?$/.test(file.split('/').slice(-2, -1)[0])) {
              fs.renameSync(file, file.replace(/actual.png$/, 'pixel-7.png'));
            }
            // Pixel 7 Landscape
            if (/pixel-7-landscape(-retry\d)?$/.test(file.split('/').slice(-2, -1)[0])) {
              fs.renameSync(file, file.replace(/actual.png$/, 'pixel-7-landscape.png'));
            }
          }

          next();
        }
      });
    })();
  });
};

const deleteRetryDirectories = (source: string): void => {
  fs.readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      if (/retry\d+$/.test(dirent.name)) {
        fs.rmSync(`./${dirent.path}/${dirent.name}`, { recursive: true, force: true });
      }
    });
};

const dir = 'tests/vrt/test-results';
if (fs.existsSync(dir)) {
  deleteRetryDirectories(dir);
  walk(dir, (error: Error): void => {
    if (error) {
      throw error;
    }
  });
}
