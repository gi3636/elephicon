import { Result } from '../result';

declare global {
  interface Window {
    myAPI: Sandbox;
  }
}

export interface Sandbox {
  mimecheck: (filepath: string) => Promise<string | false>;

  mkIcns: (filepath: string) => Promise<Result>;

  mkIco: (filepath: string) => Promise<Result>;

  openDialog: () => Promise<string | void>;

  onDrop: (
    listener: (_e: Event, filepath: string) => Promise<void>
  ) => Electron.IpcRenderer;
  removeOnDrop: () => Electron.IpcRenderer;

  menuOpen: (
    listener: (_e: Electron.IpcRendererEvent, filepath: string) => Promise<void>
  ) => Electron.IpcRenderer;
  removeMenuOpen: () => Electron.IpcRenderer;

  changeICO: (arg: boolean) => void;

  setICO: (
    listener: (_e: Electron.IpcRendererEvent, arg: boolean) => void
  ) => Electron.IpcRenderer;
  removeSetICO: () => Electron.IpcRenderer;

  setDesktop: (
    listener: (_e: Electron.IpcRendererEvent, arg: boolean) => void
  ) => Electron.IpcRenderer;
  removeDesktop: () => Electron.IpcRenderer;
}
