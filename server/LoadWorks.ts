import {
  AfterBuildFunction,
  ConfigureServerFunction,
  GridsomeDataStoreAPI,
  GridsomePlugin,
} from './gridsome.types';
import { safeLoad } from 'js-yaml';
import { readFile, readdir, stat, pathExists, copy, mkdirp } from 'fs-extra';
import { join as pathJoin, resolve as pathResolve } from 'path';
import { static as expressStatic } from 'express';

const WorksRootDir = './contents/works/';
const SharedAssetsDir = './contents/shared-assets/';
const ServedSharedAssetsPath = '/shared-assets/';
const MaxCountScreenshots = 10;

// TODO: 作品データ型定義共通化
type Work = {
  highlightAssets?: {
    title: string;
    path: string;
  }[];
};
type HighlightAssetsExtended = {
  title: string;
  path: string;
  imagePath: string;
};

async function loadWorks(actions: GridsomeDataStoreAPI): Promise<void> {
  const workDirs = await readdir(WorksRootDir);
  const workCollection = actions.addCollection('Work');

  for (const workDir of workDirs) {
    if (!(await stat(pathJoin(WorksRootDir, workDir))).isDirectory()) {
      continue;
    }

    const workDataRaw = safeLoad(
      await readFile(pathJoin(WorksRootDir, workDir, 'data.yaml'), 'utf8')
    );
    if (typeof workDataRaw !== 'object') {
      throw new Error(
        `次の制作物データの読み込みが失敗しました: ${pathJoin(
          WorksRootDir,
          workDir,
          'data.yaml'
        )}`
      );
    }
    const workData = workDataRaw as Work;
    const bannerPath = pathResolve(
      pathJoin(WorksRootDir, workDir, 'banner.jpg')
    );
    const screenshotPaths: string[] = [];
    const originalScreenshotPaths: string[] = [];
    const ssFileNames = Array.from(
      { length: MaxCountScreenshots },
      (_, i) => `ss${i + 1}.jpg`
    );
    for (const fn of ssFileNames) {
      const ssPath = pathJoin(WorksRootDir, workDir, fn);
      if (!(await pathExists(ssPath))) {
        break;
      }
      screenshotPaths.push(pathResolve(ssPath));
      originalScreenshotPaths.push(pathJoin('/assets/works', workDir, fn));
    }

    const highlightAssets: HighlightAssetsExtended[] = [];
    if (workData.highlightAssets !== undefined) {
      highlightAssets.push(
        ...workData.highlightAssets.map((a) => {
          const localImagePath = pathJoin(SharedAssetsDir, a.path);
          const servedImagePath = pathJoin(ServedSharedAssetsPath, a.path);
          return {
            title: a.title,
            path: servedImagePath,
            imagePath: pathResolve(localImagePath),
          };
        })
      );
    }

    workCollection.addNode({
      ...workData,
      banner: bannerPath,
      screenshots: screenshotPaths,
      originalScreenshots: originalScreenshotPaths,
      highlightAssets: highlightAssets,
    });
  }
}

const mountRawScreenShotsOnDevServer: ConfigureServerFunction = (app) => {
  app.use('/assets/works', expressStatic('./contents/works'));
};

const copyRawScreenShots: AfterBuildFunction = async () => {
  const workDirs = await readdir(WorksRootDir);
  for (const workDir of workDirs) {
    if (!(await stat(pathJoin(WorksRootDir, workDir))).isDirectory()) {
      continue;
    }

    const destDistributionDir = pathJoin('./dist/assets/works', workDir);
    await mkdirp(destDistributionDir);

    const ssFileNames = Array.from(
      { length: MaxCountScreenshots },
      (_, i) => `ss${i + 1}.jpg`
    );
    for (const fn of ssFileNames) {
      const ssPath = pathJoin(WorksRootDir, workDir, fn);
      if (!(await pathExists(ssPath))) {
        break;
      }

      await copy(pathResolve(ssPath), pathJoin(destDistributionDir, fn));
    }
  }
};

export const LoadWorksPlugin: GridsomePlugin = {
  loadSource: loadWorks,
  configureServer: mountRawScreenShotsOnDevServer,
  afterBuild: copyRawScreenShots,
};
