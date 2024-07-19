import { z } from "astro/zod";
import { execa } from "execa";

const GitHubGitRepositoryLinkRegExp =
  /^git(\+https)?:\/\/(\w+@)?github\.com\/(.+)\.git/;

const LicenseSchema = z.object({
  name: z.string(),
  licenseType: z.string(),
  link: z.string(),
  installedVersion: z.string(),
});
const LicensesSchema = LicenseSchema.array();
type LicenseType = z.infer<typeof LicenseSchema>;

export const loadLicenses = async (): Promise<readonly LicenseType[]> => {
  const result = await execa("pnpm", ["run", "--silent", "gen:licenses"]);
  // NOTE: 実際の実行結果は string だが undefined として推論されてしまっている？ (9.3.0)
  const licensesRaw = result.stdout as unknown as string;

  const licenses = LicensesSchema.parse(JSON.parse(licensesRaw));

  // link をブラウザで閲覧可能な URL に補正
  const fixedLicenses: LicenseType[] = [];
  for (const l of licenses) {
    const fixedLicense = { ...l };

    const gitHubGitRepositoryLinkMatch = l.link.match(
      GitHubGitRepositoryLinkRegExp
    );
    if (gitHubGitRepositoryLinkMatch !== null) {
      fixedLicense.link = `https://github.com/${gitHubGitRepositoryLinkMatch[3]}`;
    }

    fixedLicenses.push(fixedLicense);
  }

  return fixedLicenses;
};
