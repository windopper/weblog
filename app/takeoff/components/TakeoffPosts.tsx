'use client';

import { motion } from "motion/react";
import { getMarkdownFiles } from "@/app/action/markdown";
import PostsList from "@/app/components/posts/PostsList";
import { useEffect, useState } from "react";
import { MarkdownFile } from "@/app/types/weblog";

export default function TakeoffPosts() {
  const [posts, setPosts] = useState<MarkdownFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPosts = await getMarkdownFiles();
        const filteredPosts = allPosts.filter((post) => !post.isPrivate && post.tags.includes("takeoff"));
        const sortedPosts = filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setPosts(sortedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center p-8"
      >
        <div className="text-zinc-400">게시글을 불러오는 중...</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <PostsList markdownFiles={posts} type="small" />
    </motion.div>
  );
}