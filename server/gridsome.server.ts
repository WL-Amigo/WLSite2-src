import { GridsomeAPI } from './gridsome.types';
import { LoadLicensesPlugin } from './LoadLicenses';
import { LoadWorksPlugin } from './LoadWorks';
import { MountSharedAssetPlugin } from './MountSharedAssets';

export function gridsomeSetup(api: GridsomeAPI): void {
  const plugins = [LoadWorksPlugin, MountSharedAssetPlugin, LoadLicensesPlugin];

  for (const plugin of plugins) {
    if (plugin.loadSource !== undefined) {
      api.loadSource(plugin.loadSource);
    }
    if (plugin.configureServer !== undefined) {
      api.configureServer(plugin.configureServer);
    }
    if (plugin.afterBuild !== undefined) {
      api.afterBuild(plugin.afterBuild);
    }
  }
}
