"use client";
import {
  addDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { IPost } from "./Posts";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

interface Props {
  post: IPost;
}

interface Like {
  userId: string;
  likeId: string
}

export const Post = (props: Props) => {
  const [likes, setLikes] = useState<Like[] | null>(null);
  const { post } = props;
  const { user } = UserAuth();

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
  };

  const hasUserLiked = likes?.find((like) => like.userId === user.uid);

  async function addLike() {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function removeLike() {
    try {
      const likeDelete = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user.uid)
      );

      const likeData = await getDocs(likeDelete);
      const likeId = likeData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev && prev.filter((like) => like.likeId != likeId));
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="dark:bg-gray-900 bg-gray-50 shadow-md p-10 mb-3 mt-3 lg:w-1/3 rounded-lg">
      <div>
        <p>{post.description}</p>
      </div>
      <div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          @{post.email}
        </p>
        <button
          onClick={hasUserLiked ? removeLike : addLike}
          className="mt-3 p-1 rounded-lg"
        >
          <FontAwesomeIcon icon={hasUserLiked ? faThumbsDown : faThumbsUp} size="xl" />
        </button>
        {likes && hasUserLiked && <p> Likes: {likes?.length} </p>}
      </div>
    </div>
  );
};
