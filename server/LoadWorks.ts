import { GridsomeDataStoreAPI } from './gridsome.types';
import { safeLoad } from 'js-yaml';
import { readFile, readdir, stat, pathExists } from 'fs-extra';
import { join as pathJoin, resolve as pathResolve } from 'path';

const WorksRootDir = './contents/works/';
const MaxCountScreenshots = 10;

export async function loadWorks(actions: GridsomeDataStoreAPI) {
  const workDirs = await readdir(WorksRootDir);
  const workCollection = actions.addCollection('Work');

  for (const workDir of workDirs) {
    if (!(await stat(pathJoin(WorksRootDir, workDir))).isDirectory()) {
      continue;
    }

    const workData = safeLoad(
      await readFile(pathJoin(WorksRootDir, workDir, 'data.yaml'), 'utf8')
    );
    if (typeof workData !== 'object') {
      throw new Error(
        `次の制作物データの読み込みが失敗しました: ${pathJoin(
          WorksRootDir,
          workDir,
          'data.yaml'
        )}`
      );
    }
    const bannerPath = pathResolve(
      pathJoin(WorksRootDir, workDir, 'banner.png')
    );
    const screenshotPaths: string[] = [];
    const ssFileNames = Array.from(
      { length: MaxCountScreenshots },
      (_, i) => i + 1
    ).map((v) => `ss${v}.png`);
    for (const fn of ssFileNames) {
      const ssPath = pathJoin(WorksRootDir, workDir, fn);
      if (!(await pathExists(ssPath))) {
        break;
      }
      screenshotPaths.push(pathResolve(ssPath));
    }

    workCollection.addNode({
      ...workData,
      banner: bannerPath,
      screenshots: screenshotPaths,
    });
  }
}
