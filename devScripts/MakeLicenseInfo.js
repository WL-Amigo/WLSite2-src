// プロジェクトルートで実行すること
const FS = require('fs');
const ChildProcess = require('child_process');

const Packages = JSON.parse(FS.readFileSync('./package.json', { encoding: 'utf8' }));
const LicensesRaw = ChildProcess.execSync('yarn licenses list --json --no-progress --ignore-platform', { encoding: 'utf8' });
const Licenses = JSON.parse(LicensesRaw);
const LicensesDirect = [];

// オブジェクトに変換する
for (let dep of Object.keys(Packages.dependencies).concat(Object.keys(Packages.devDependencies))) {
  let row = Licenses.data.body.find(r => r[0] === dep);
  if (!row) {
    console.error(`${dep} に該当するライセンスが見つかりません`);
    process.exit(1);
  }

  LicensesDirect.push({ package: dep, license: row[2], url: row[3] });
}

// 抽出用正規表現
const extractionUrlRegexes = [
  // git形式URLを通常のURLにバラす
  /^git\+(.+)\.git$/,
];
const extractionLicenseRegexes = [
  // カッコくくりになっているライセンスのカッコを解除
  /\((.+)\)/,
]
function applyRegexAndExtractFirstGroup(target, regex) {
  let result = regex.exec(target);
  if (result) {
    return result[1];
  }
  return target;
}

// 抽出用正規表現を全て適用し、URLとライセンス名の整形を行う
for (let license of LicensesDirect) {
  for (let regex of extractionUrlRegexes) {
    license.url = applyRegexAndExtractFirstGroup(license.url, regex);
  }
  for (let regex of extractionLicenseRegexes) {
    license.license = applyRegexAndExtractFirstGroup(license.license, regex);
  }
}

// ./data/licenses.auto.json に書き出し
FS.writeFileSync('./data/licenses.auto.json', JSON.stringify(LicensesDirect));