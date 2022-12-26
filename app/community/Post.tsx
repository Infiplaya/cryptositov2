"use client";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { IPost } from "./Posts";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

interface Props {
  post: IPost;
}

interface Like {
    userId: string;
}

export const Post = (props: Props) => {
  const [likes, setLikes] = useState<Like[] | null>(null);
  const { post } = props;
  const { user } = UserAuth();

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikesAmount(data.docs.length);
  };

  async function addLike() {
    await addDoc(likesRef, {
      userId: user.uid,
      postId: post.id,
    });
  }
  return (
    <div className="dark:bg-gray-700 bg-gray-50 shadow-md p-10 mb-3 mt-3 lg:w-1/3 rounded-lg">
      <div>
        <p>{post.description}</p>
      </div>
      <div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          @{post.email}
        </p>
        <button onClick={addLike} className="mt-3 bg-blue-500 p-1 rounded-lg">
          👍
        </button>
        {likesAmount && <p> Likes: {likesAmount} </p>}
      </div>
    </div>
  );
};
