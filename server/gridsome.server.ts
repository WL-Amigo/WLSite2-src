import { GridsomeAPI } from './gridsome.types';
import { loadWorks } from './LoadWorks';

export function gridsomeSetup(api: GridsomeAPI) {
  api.loadSource(loadWorks);
}
