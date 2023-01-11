import { app } from 'electron';

import fs from 'node:fs';
import path from 'node:path';
import Store from 'electron-store';
import {
  setLogger,
  createICO,
  createICNS,
  clearCache,
  NEAREST_NEIGHBOR,
  BICUBIC,
  BEZIER,
} from 'png2icons';

const qualities = [NEAREST_NEIGHBOR, BICUBIC, BEZIER];

const errorMessage = (err: string, desktop: boolean): Result => {
  console.log(`Something went wrong: ${err}`);

  return { type: 'failed', log: err, desktop };
};

export const mkico = async (
  filepath: string,
  store: Store<StoreType>,
  fileName?: string
): Promise<Result> => {
  const isDesktop = store.get('desktop', true);
  const dirname = app.getPath('desktop') + '/icon/';
  const basename = fileName || path.basename(filepath, path.extname(filepath));

  const num = store.get('quality', 2);
  const bmp = store.get('bmp', true);
  if (!fs.existsSync(`${dirname}`)) {
    fs.mkdirSync(`${dirname}`);
  }
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
  return fs.promises
    .readFile(filepath)
    .then(async (buffer) => {
      setLogger(console.log);
      console.log(`Quality: ${num}`);
      console.log(`BMP: ${bmp}`);

      const ico = createICO(buffer, qualities[num], 0, !bmp, bmp);
      if (!ico) throw new Error();

      await fs.promises
        .writeFile(path.join(dirname, `${basename}.ico`), ico)
        .then(() => {
          console.log(`created: ${dirname}${path.sep}${basename}.ico`);
        });
    })
    .then(() => {
      clearCache();
      console.log('Successfully Completed!');

      return { type: 'success', log: `${basename}.ico`, desktop: isDesktop };
    })
    .catch((err) => errorMessage(err, isDesktop));
};

export const mkpng = async (
  base64: string,
  store: Store<StoreType>,
  fileName?: string
): Promise<Result> => {
  const isDesktop = store.get('desktop', true);
  const dirname = app.getPath('desktop') + '/icon';
  const basename = fileName;
  //Find extension of file
  const ext = base64.substring(
    base64.indexOf('/') + 1,
    base64.indexOf(';base64')
  );
  const fileType = base64.substring('data:'.length, base64.indexOf('/'));
  //Forming regex to extract base64 data of file.
  const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, 'gi');
  //Extract base64 data.
  const base64Data = base64.replace(regex, '');
  const filename = `${fileName}.${ext}`;

  //Check that if directory is present or not.
  if (!fs.existsSync(`${dirname}`)) {
    fs.mkdirSync(`${dirname}`);
  }
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
  fs.writeFileSync(dirname + filename, base64Data, 'base64');
  clearCache();

  return { type: 'success', log: `${basename}.png`, desktop: isDesktop };
};

export const mkicns = async (
  filepath: string,
  store: Store<StoreType>,
  fileName?: string
): Promise<Result> => {
  const isDesktop = store.get('desktop', true);
  const dirname = app.getPath('desktop') + '/icon';
  const basename = fileName || path.basename(filepath, path.extname(filepath));
  if (!fs.existsSync(`${dirname}`)) {
    fs.mkdirSync(`${dirname}`);
  }
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
  const num = store.get('quality', 2);

  return fs.promises
    .readFile(filepath)
    .then(async (buffer) => {
      setLogger(console.log);
      console.log(`Quality: ${num}`);

      const icns = createICNS(buffer, qualities[num], 0);
      if (!icns) throw new Error();

      await fs.promises
        .writeFile(path.join(dirname, `${basename}.icns`), icns)
        .then(() => {
          console.log(`created: ${dirname}${path.sep}${basename}.icns`);
        });
    })
    .then(() => {
      clearCache();
      console.log('Successfully Completed!');

      return { type: 'success', log: `${basename}.icns`, desktop: isDesktop };
    })
    .catch((err) => errorMessage(err, isDesktop));
};
