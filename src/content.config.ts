import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const commonSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
});

function createMarkdownCollection(base: string) {
  return defineCollection({
    loader: glob({
      base,
      pattern: "**/*.md",
    }),
    schema: commonSchema,
  });
}

const articles = createMarkdownCollection("./src/content/articles");
const blog = createMarkdownCollection("./src/content/blog");

export const collections = {
  articles,
  blog,
};