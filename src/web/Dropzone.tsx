import { memo, useContext, useCallback, useEffect } from 'react';
import { AppContext } from './lib/AppContext';

import { Switch } from './Switch';
import { Elephant } from './Elephant';

enum ImageType {
  ICO = 'ico',
  ICNS = 'icns',
  PNG = 'png',
}
const { myAPI } = window;

let list = [
  {
    type: ImageType.ICO,
    fileName: 'logo',
  },
  {
    type: ImageType.ICO,
    fileName: 'logo-256',
  },
  {
    type: ImageType.ICNS,
    fileName: 'logo',
  },
  {
    type: ImageType.ICNS,
    fileName: 'logo-256',
  },
  {
    type: ImageType.PNG,
    fileName: 'logo',
  },
  {
    type: ImageType.PNG,
    fileName: 'logo-256',
  },
  {
    type: ImageType.PNG,
    fileName: 'tray',
  },
  {
    type: ImageType.PNG,
    fileName: 'tray-badge',
  },
];
export const Dropzone = memo(() => {
  const { state, dispatch } = useContext(AppContext);

  const preventDefault = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const afterConvert = useCallback(
    (result: Result) => {
      dispatch({
        type: 'afterConvert',
        message: true,
        loading: false,
        log: result.log,
        desktop: result.desktop,
        success: result.type === 'failed' ? false : true,
      });
    },
    [dispatch]
  );

  const convert = useCallback(
    async (filepath: string) => {
      const mime = await myAPI.mimecheck(filepath);

      if (!mime || !mime.match(/png/)) {
        const format = mime ? mime : 'Unknown';

        dispatch({
          type: 'convert',
          log: `Unsupported format: ${format}`,
          message: true,
          success: false,
          loading: false,
        });

        return;
      }
      list.map((item) => {
        switch (item.type) {
          case ImageType.ICO:
            myAPI
              .mkIco(filepath, item.fileName)
              .then((result) => afterConvert(result));
            break;
          case ImageType.ICNS:
            myAPI
              .mkIcns(filepath, item.fileName)
              .then((result) => afterConvert(result));
            break;
          case ImageType.PNG:
            getBase64(filepath, item.fileName).then((base64: any) => {
              myAPI
                .mkPng(base64, item.fileName)
                .then((result) => afterConvert(result));
            });

            break;
        }
      });
    },
    [afterConvert, dispatch, state.ico]
  );

  const getBase64 = (filepath: string, fileName: string) => {
    let wantedWidth = 1024;
    let wantedHeight = 1024;
    if (fileName === 'logo-256') {
      wantedWidth = 256;
      wantedHeight = 256;
    }
    return new Promise(async function (resolve, reject) {
      var img = document.createElement('img');
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = wantedWidth;
        canvas.height = wantedHeight;
        // @ts-ignore
        ctx.drawImage(this, 0, 0, wantedWidth, wantedHeight);
        var dataURI = canvas.toDataURL('image/png');
        console.log('dataUri', dataURI);
        resolve(dataURI);
      };
      img.src = filepath;
    });
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (state.loading) return;

    preventDefault(e);
    dispatch({ type: 'drag', drag: true });
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefault(e);
    dispatch({ type: 'drag', drag: false });
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (state.loading) return;

    preventDefault(e);
    dispatch({ type: 'drag', drag: false });

    if (e.dataTransfer) {
      dispatch({ type: 'loading', loading: true });
      const file = e.dataTransfer.files[0];

      convert(file.path);
    }
  };

  const onClickOpen = async () => {
    if (state.loading) return;

    const filepath = await myAPI.openDialog();
    if (!filepath) return;

    dispatch({ type: 'loading', loading: true });
    convert(filepath);
  };

  useEffect(() => {
    myAPI.menuOpen((_e, filepath) => {
      if (!filepath) return;

      dispatch({ type: 'loading', loading: true });
      convert(filepath);
    });

    return () => {
      myAPI.removeMenuOpen();
    };
  }, [convert, dispatch]);

  return (
    <div
      className="drop-message-zone"
      onDrop={onDrop}
      onDragEnter={onDragOver}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <div
        onClick={onClickOpen}
        className={
          state.drag
            ? 'elephant ondrag'
            : state.loading
            ? 'elephant loading'
            : 'elephant'
        }
      >
        <Elephant />
      </div>
      <div className={state.drag || state.loading ? 'text loading' : 'text'}>
        Drop your PNGs here...
      </div>
      <Switch />
    </div>
  );
});

Dropzone.displayName = 'Dropzone';
