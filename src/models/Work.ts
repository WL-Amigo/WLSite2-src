import { z, type SchemaContext } from "astro:content";
import { parse } from "date-fns";

export const defineWorkDataSchema = ({ image }: SchemaContext) =>
  z.object({
    id: z.string(),
    title: z.string(),
    publishDate: z.string().transform((r) => parse(r, "yyyy-mm", new Date())),
    state: z.enum(["ongoing"]).optional(),
    url: z.string().url().optional(),
    githubUrl: z.string().url().optional(),
    category: z.enum(["website", "webapp", "desktopapp"]),
    banner: image(),
    screenshots: z.array(image()),
    highlightAssets: z
      .object({
        title: z.string(),
        path: image(),
      })
      .array()
      .optional(),
    technologies: z.string().array(),
    description: z.string(),
    functionalities: z.string().array(),
    improvements: z.string().array(),
    impact: z.string().array(),
    earnedExperiences: z.string().array(),
    links: z
      .object({
        label: z.string(),
        url: z.string(),
      })
      .array(),
  });
export type WorkData = z.infer<ReturnType<typeof defineWorkDataSchema>>;
