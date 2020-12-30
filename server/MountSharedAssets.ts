import { Application, static as expressStatic } from 'express';
import { copy } from 'fs-extra';

export function mountSharedAssetsOnDevServer(app: Application): void {
  app.use('/shared-assets', expressStatic('./contents/shared-assets'));
}

export async function copySharedAssetsToDist(): Promise<void> {
  await copy('./contents/shared-assets', './dist/shared-assets');
}
