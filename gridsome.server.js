// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const FS = require('fs').promises;
const YAML = require('js-yaml');

module.exports = function (api) {
  api.loadSource(async ({ addCollection, addMetadata }) => {
    const Metadata = YAML.safeLoad(await FS.readFile('./data/metadata.yaml', 'utf-8'));
    for(let key of Object.keys(Metadata)){
      addMetadata(key, Metadata[key]);
    }

    // ビルド時の年をメタデータに挿入
    const BuildDate = new Date(Date.now());
    addMetadata('buildYear', BuildDate.getFullYear());

    // ライセンス情報のコレクションを作成
    const LicenseInfoCollection = addCollection('LicenseInfo');
    const LicenseDataAuto = JSON.parse(await FS.readFile('./data/licenses.auto.json', 'utf-8'));
    for(let license of LicenseDataAuto) {
      LicenseInfoCollection.addNode({
        package: license.package,
        license: license.license,
        url: license.url,
      });
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api
  })
}
