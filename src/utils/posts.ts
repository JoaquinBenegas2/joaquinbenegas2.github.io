import { getCollection, type CollectionEntry } from "astro:content";

const DEFAULT_LOCALE = "en-US";

const SHORT_DATE_FORMAT = {
  year: "numeric",
  month: "short",
  day: "numeric",
} satisfies Intl.DateTimeFormatOptions;

const LONG_DATE_FORMAT = {
  year: "numeric",
  month: "long",
  day: "numeric",
} satisfies Intl.DateTimeFormatOptions;

export type PostCollection = "articles" | "blog";
export type SitePost = CollectionEntry<PostCollection>;
export type PostStaticPath = { params: { slug: string }; props: { post: SitePost } };

export function formatDate(date: Date): string {
  return date.toLocaleDateString(DEFAULT_LOCALE, SHORT_DATE_FORMAT);
}

export function formatLongDate(date: Date): string {
  return date.toLocaleDateString(DEFAULT_LOCALE, LONG_DATE_FORMAT);
}

export function formatSectionName(section: string): string {
  return section
    .split("-")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function groupBySections<T extends { id: string }>(posts: T[]): Record<string, T[]> {
  const sections: Record<string, T[]> = {};

  for (const post of posts) {
    const section = getSectionKey(post.id);
    const sectionPosts = sections[section];

    if (sectionPosts) {
      sectionPosts.push(post);
      continue;
    }

    sections[section] = [post];
  }

  return sections;
}

export async function getPublishedPosts(collection: PostCollection): Promise<SitePost[]> {
  const posts = await getCollection(collection, isPublishedPost);

  posts.sort(comparePostsByDateDesc);

  return posts;
}

export async function getPostStaticPaths(collection: PostCollection): Promise<PostStaticPath[]> {
  const posts = await getPublishedPosts(collection);

  return posts.map(createPostStaticPath);
}

function getSectionKey(postId: string): string {
  return postId.split("/")[0] ?? postId;
}

function isPublishedPost({ data }: SitePost): boolean {
  return !data.draft;
}

function comparePostsByDateDesc(left: SitePost, right: SitePost): number {
  return right.data.date.valueOf() - left.data.date.valueOf();
}

function createPostStaticPath(post: SitePost): PostStaticPath {
  return {
    params: { slug: post.id },
    props: { post },
  };
}
