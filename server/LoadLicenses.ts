import { execFile } from 'child_process';
import { readJson } from 'fs-extra';
import { GridsomePlugin, LoadSourceFunction } from './gridsome.types';

type Package = {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

type License = {
  licenses: string;
  repository?: string;
  url?: string;
};

type LicenseCollectionItem = {
  name: string;
  license: string;
  url: string;
  category: 'dependency' | 'asset';
};

const AssetLicenses: LicenseCollectionItem[] = [
  {
    name: 'heroicons',
    license: 'MIT',
    url: 'https://heroicons.com/',
    category: 'asset',
  },
  {
    name: 'Simple Icons',
    license: 'CC0',
    url: 'https://simpleicons.org/',
    category: 'asset',
  },
];

const loadLicenses: LoadSourceFunction = async (actions) => {
  const allLicensesRaw = await new Promise<string>((res, rej) => {
    execFile('pnpm', ['get:licenses', '--silent'], (err, stdout) => {
      if (err !== null) {
        rej(err);
        return;
      }

      res(stdout);
    });
  });
  const allLicensesObj: Record<string, License> = JSON.parse(allLicensesRaw);
  const allLicenses = new Map<string, License>(
    Object.entries(allLicensesObj).map((kvp) => [
      kvp[0].slice(0, kvp[0].lastIndexOf('@')),
      kvp[1],
    ])
  );

  const packageObj: Package = await readJson('./package.json');
  const licenseCollection = actions.addCollection('Licenses');

  const deps = Object.entries(packageObj.dependencies).concat(
    Object.entries(packageObj.devDependencies)
  );
  for (const [d, v] of deps) {
    let depKey = d;
    if (v.startsWith('npm:')) {
      depKey = v.slice(0, v.lastIndexOf('@')).replace('npm:', '');
    }
    const license = allLicenses.get(depKey);
    if (license === undefined) {
      throw `次のパッケージのライセンス情報を発見できませんでした: ${d}(${depKey})`;
    }
    const item: LicenseCollectionItem = {
      name: d,
      license: license.licenses,
      url: license.repository ?? license.url ?? '',
      category: 'dependency',
    };
    licenseCollection.addNode(item);
  }

  AssetLicenses.forEach((al) => licenseCollection.addNode(al));
};

export const LoadLicensesPlugin: GridsomePlugin = {
  loadSource: loadLicenses,
};
