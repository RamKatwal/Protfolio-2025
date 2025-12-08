import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export interface PostFrontmatter {
  title: string;
  date: string;
  views: string;
  image?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.mdx$/, '');
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(postsDirectory);
  const posts = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith('.mdx'))
      .map(async (filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          slug: getSlugFromFilename(filename),
          frontmatter: data as PostFrontmatter,
          content,
        };
      })
  );

  // Sort posts by date (newest first)
  // Handle date strings that might not be in ISO format
  return posts.sort((a, b) => {
    try {
      const dateA = new Date(a.frontmatter.date).getTime();
      const dateB = new Date(b.frontmatter.date).getTime();
      return dateB - dateA;
    } catch {
      // If date parsing fails, maintain original order
      return 0;
    }
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
  };
}

export async function renderMDX(content: string) {
  const { default: MDXContent } = await evaluate(content, {
    ...runtime,
    development: process.env.NODE_ENV === 'development',
  });

  return MDXContent;
}

