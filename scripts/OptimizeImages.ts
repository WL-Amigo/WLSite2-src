// コンテンツ画像を q=85 で mozjpeg を利用して圧縮します
// png のみが対象です
import Klaw from 'klaw';
import { dirname, basename, join as pathJoin, extname } from 'path';
import { execFile } from 'child_process';
import { unlink } from 'fs-extra';

const TargetDirs = ['./contents/works/'];
const QualityValue = 85;

async function optimizeImage(filepath: string): Promise<void> {
  await new Promise((res, rej) => {
    const filenameWithoutExtension = pathJoin(
      dirname(filepath),
      basename(filepath, extname(filepath))
    );
    execFile(
      'cjpeg',
      [
        '-quality',
        QualityValue.toFixed(0),
        '-outfile',
        `${filenameWithoutExtension}.jpg`,
        filepath,
      ],
      (err) => {
        err != null ? rej(err) : res();
      }
    );
  });

  await unlink(filepath);
}

(async () => {
  for (const targetDir of TargetDirs) {
    for await (const file of Klaw(targetDir)) {
      const filepath: string = file.path;
      if (!filepath.endsWith('.png')) {
        continue;
      }

      await optimizeImage(filepath);
    }
  }
})();
