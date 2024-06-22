"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from "../../../store";
import { MutatingDots } from "react-loader-spinner";
import { fetchPosts } from "../../../store/slice/blogSlice";
import { loadPostsFromLocalStorage } from "../../../store/slice/createSlice";

const BlogPost = ({ params }: { params: { id: string } }) => {
  
  const dispatch = useDispatch<AppDispatch>();
  const blogPosts = useSelector((state: RootState) => state.blog.posts);
  const localPosts = useSelector((state: RootState) => state.localPosts.posts);
  const status = useSelector((state: RootState) => state.blog.status);
  const error = useSelector((state: RootState) => state.blog.error);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(loadPostsFromLocalStorage()); 
  }, [dispatch]);

  const allPosts = [...localPosts, ...blogPosts];
  const post = allPosts.find((post) => post.id === params.id);

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
          <p>
            {post.body}
          </p>
        </div>
      </div>
  );
};

export default BlogPost;