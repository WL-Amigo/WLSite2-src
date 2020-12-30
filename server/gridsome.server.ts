import { GridsomeAPI } from './gridsome.types';
import { loadWorks } from './LoadWorks';
import {
  copySharedAssetsToDist,
  mountSharedAssetsOnDevServer,
} from './MountSharedAssets';

export function gridsomeSetup(api: GridsomeAPI): void {
  api.loadSource(loadWorks);

  api.configureServer(mountSharedAssetsOnDevServer);
  api.afterBuild(copySharedAssetsToDist);
}
