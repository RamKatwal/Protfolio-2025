import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug, getAllPosts, renderMDX } from '@/lib/mdx';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.frontmatter.title,
    description: `Read ${post.frontmatter.title} by Ram Katwal`,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const MDXContent = await renderMDX(post.content);

  return (
    <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto">
      <article className="prose prose-lg max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.frontmatter.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <time>{post.frontmatter.date}</time>
            <span>•</span>
            <span>{post.frontmatter.views}</span>
          </div>
          {post.frontmatter.image && (
            <Image
              src={post.frontmatter.image}
              alt={post.frontmatter.title}
              width={800}
              height={400}
              className="mt-6 rounded-lg w-full"
            />
          )}
        </header>
        <div className="prose-headings:font-bold prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900">
          <MDXContent />
        </div>
      </article>
    </div>
  );
}



