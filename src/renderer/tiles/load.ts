import { ipcRenderer } from 'electron';
import { data } from './data';
import { globals } from 'utils/globals';

export async function load(): Promise<void> {
  let tileData: any;

  for (const idx in data) {
    delete data[idx];
  }

  try {
    tileData = await ipcRenderer.invoke('tiles.data');
  } catch (e) {
    console.error(e);
  }

  for (const idx in tileData) {
    data[idx] = tileData[idx];
  }

  delete data[0];

  globals.loaded.tiles = true;

  globals.tiles = data;
  globals.tileData = tileData;
}
