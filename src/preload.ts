import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('myAPI', {
  mimecheck: async (filepath: string): Promise<string | false> =>
    ipcRenderer.invoke('mime-check', filepath),

  mkIco: async (filepath: string, fileName?: string): Promise<Result> =>
    ipcRenderer.invoke('make-ico', filepath, fileName),

  mkIcns: async (filepath: string, fileName?: string): Promise<Result> =>
    ipcRenderer.invoke('make-icns', filepath, fileName),

  mkPng: async (filepath: string, fileName?: string): Promise<Result> =>
    ipcRenderer.invoke('make-png', filepath, fileName),

  contextMenu: () => ipcRenderer.send('show-context-menu'),

  openDialog: async (): Promise<string | void> =>
    ipcRenderer.invoke('open-file-dialog'),

  menuOpen: (
    listener: (_e: Electron.IpcRendererEvent, filepath: string) => void
  ) => ipcRenderer.on('menu-open', listener),
  removeMenuOpen: () => ipcRenderer.removeAllListeners('menu-open'),

  setDesktop: (
    listener: (_e: Electron.IpcRendererEvent, arg: boolean) => void
  ) => ipcRenderer.on('set-desktop', listener),
  removeSetDesktop: () => ipcRenderer.removeAllListeners('set-desktop'),
});
