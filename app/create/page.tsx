"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import { RootState, AppDispatch } from "../../store";

import { createPost } from "../../store/slice/blogSlice";

import { MutatingDots } from "react-loader-spinner";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { BlogCard } from "../lib/interfaces";

import { addPost } from '../../store/slice/createSlice';

const FormSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  body: z.string().min(5, {
    message: "Body must be at least 5 characters.",
  }),
});

export default function CreateForm() {
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    dispatch(addPost({ title: data.title, body: data.body }));
    toast({
      title: 'Post added successfully',
      description: `Title: ${data.title}\nBody: ${data.body}`,
    });
    form.reset();
  };
  
  if (status === "loading") {
    return <div className="fixed inset-0 flex justify-center items-center w-full h-full">
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
  </div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-3/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="This is your blog title." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Body</FormLabel>
                <FormControl>
                  <Textarea placeholder="This is your blog body." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}