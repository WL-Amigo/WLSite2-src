import { defineCollection, z } from "astro:content";
import { defineWorkDataSchema } from "../models/Work";

const workCollection = defineCollection({
  type: "data",
  schema: defineWorkDataSchema,
});

export const collections = {
  works: workCollection,
};
