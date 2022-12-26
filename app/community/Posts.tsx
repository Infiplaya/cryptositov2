"use client";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Post } from "./Post";

export interface IPost {
  id: string;
  description: string;
  userId: string;
  email: string;
}

export const Posts = () => {
  const [postsList, setPostsList] = useState<IPost[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]
    );
  };

  useEffect(() => {
    getPosts();
  });

  return (
    <div className="lg:flex flex-col items-center justify-center">
      {postsList?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
