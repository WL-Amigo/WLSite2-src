import { z } from "astro/zod";
import TechnologyDictRaw from "../dict/technologies.yaml";

const TechnologyDictSchema = z.record(
  z.object({
    type: z.enum([
      "web-frontend",
      "language",
      "cloud-service",
      "backend",
      "general",
      "desktop",
      "mobile",
    ]),
    url: z.string().url(),
  })
);
const TechnologyDict = TechnologyDictSchema.parse(TechnologyDictRaw);
export type TechnologyDefinition = z.infer<typeof TechnologyDictSchema>[string];
export type TechnologyDefinitionWithName = TechnologyDefinition & {
  name: string;
};

export type TechnologyCategoryType = TechnologyDefinition["type"];

export const AllTechnologies: readonly TechnologyDefinitionWithName[] =
  Object.entries(TechnologyDict).map((e) => ({
    name: e[0],
    type: e[1].type,
    url: e[1].url,
  }));

export const getTechnologyDefinition = (
  name: string
): TechnologyDefinition | undefined => TechnologyDict[name];
