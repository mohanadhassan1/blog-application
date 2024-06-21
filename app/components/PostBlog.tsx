"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from "../../store";

import { fetchPosts } from "../../store/slice/blogSlice";
// import { BlogPost } from "../../store/slice/blogSlice";
import { loadPostsFromLocalStorage } from "../../store/slice/createSlice";

import { MutatingDots } from "react-loader-spinner";

import { BlogCard } from "../lib/interfaces";



export function PostBlog() {

  const dispatch = useDispatch<AppDispatch>();
  const blogPosts = useSelector((state: RootState) => state.blog.posts);
  const localPosts = useSelector((state: RootState) => state.localPosts.posts);
  const status = useSelector((state: RootState) => state.blog.status);
  const error = useSelector((state: RootState) => state.blog.error);

  // useEffect(() => {
  //   dispatch(fetchPosts());
  // }, [dispatch]);

  // const localPosts: BlogCard[] = JSON.parse(localStorage.getItem('posts') || '[]');
  // const localPosts: BlogPost[] = JSON.parse(localStorage.getItem('posts') || '[]'); 
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    dispatch(loadPostsFromLocalStorage());
  }, [dispatch]);


  return (
    <>
      {status === "loading" && (
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
      )}

      <div className="grid grid-cols-1  md:grid-cols-2 mt-5 gap-5">
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" &&
          // blogPosts.map((post: any) => (
          // [...blogPosts, ...localPosts].map((post: BlogCard) => (
          // [...blogPosts].map((post: BlogCard) => (
            localPosts.map((post: any) => (
            <Card key={post.id}>
              <CardContent className="mt-5">
                <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
                <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                  {post.body}
                </p>
                <Button asChild className="w-full mt-7">
                  <Link href={`/blog/${post.id}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
};
