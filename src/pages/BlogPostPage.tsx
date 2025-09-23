import React from "react";
import { useParams } from "react-router-dom";

const BlogPostPage = () => {
  const { id } = useParams();

  return (
    <main className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">
          Blog Post {id}
        </h1>
        <p className="text-lg text-gray-700">
          This is the detailed content for blog post <strong>{id}</strong>.  
          Later, you can fetch the actual blog content from an API or CMS.
        </p>
      </div>
    </main>
  );
};

export default BlogPostPage;
