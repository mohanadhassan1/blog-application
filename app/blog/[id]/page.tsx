"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from "../../../store";
import { Card, CardContent } from "@/components/ui/card";
import { MutatingDots } from "react-loader-spinner";
import { PortableText } from "@portabletext/react";
import { fetchPosts } from "../../../store/slice/blogSlice";

const BlogPost = ({ params }: { params: { id: string } }) => {
  
  const dispatch = useDispatch<AppDispatch>();
  const blogPosts = useSelector((state: RootState) => state.blog.posts);
  const status = useSelector((state: RootState) => state.blog.status);
  const error = useSelector((state: RootState) => state.blog.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  const post = blogPosts.find((post) => post.id === params.id);

  if (status === "loading") {
    return (
      <div className="fixed inset-0 flex justify-center items-center w-full h-full">
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="blue"
          secondaryColor="cyan"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
      <div className="mt-8">
        <h1>
          <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
            Mohanad Hassan - Blog
          </span>
          <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
            {post.title}
          </span>
        </h1>

        <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
          {/* <PortableText  /> */}
          <p>
            {post.body}
          </p>
        </div>
      </div>
  );
};

export default BlogPost;