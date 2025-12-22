// import WritingFeed from "@/app/components/Reusable/writingfeed";
// import { getAllPosts } from "@/lib/mdx";
// import { BlogPost } from "@/types";

export default async function WritingPage() {
  // const mdxPosts = await getAllPosts();
  
  // // Convert MDX posts to BlogPost format for compatibility
  // const posts: BlogPost[] = mdxPosts.map((post) => ({
  //   id: post.slug,
  //   title: post.frontmatter.title,
  //   date: post.frontmatter.date,
  //   views: post.frontmatter.views,
  //   image: post.frontmatter.image,
  //   slug: post.slug,
  // }));

  return (
    <div className="max-w-[35vw] h-full bg-white flex flex-col items-center justify-center border-r border-gray-200">
      <p className="text-xs text-gray-500">Soon</p>
    </div>
  );
}
