import { Application, static as expressStatic } from 'express';
import { copy } from 'fs-extra';
import { GridsomePlugin } from './gridsome.types';

function mountSharedAssetsOnDevServer(app: Application): void {
  app.use('/shared-assets', expressStatic('./contents/shared-assets'));
}

async function copySharedAssetsToDist(): Promise<void> {
  await copy('./contents/shared-assets', './dist/shared-assets');
}

export const MountSharedAssetPlugin: GridsomePlugin = {
  configureServer: mountSharedAssetsOnDevServer,
  afterBuild: copySharedAssetsToDist,
};
