"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface FormData {
  description: string;
}

export const FormPost = () => {
  const { user } = UserAuth();

  const router = useRouter();

  useEffect(() => {
    // checks if the user is authenticated
    user ? router.push("/community") : router.push("/signup");
  }, [user, router]);
  

  const schema = yup.object().shape({
    description: yup.string().required("Post can't be empty.").min(10).max(400),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  async function onCreatePost(data: FormData) {
    await addDoc(postsRef, {
      description: data.description,
      email: user.email,
      id: user.uid,
    });
    router.push("/community");
  }

  return (
    <form
      onSubmit={handleSubmit(onCreatePost)}
      className="flex flex-col items-center justify-center"
    >
      <textarea
        placeholder="What you have in mind..."
        {...register("description")}
        className="w-80 p-3 resize-none h-1/3 rounded-lg"
      />
      <p className="text-red-500">{errors.description?.message}</p>
      <button
        type="submit"
        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-gray-50 rounded-lg mt-5 self-end"
      >
        Submit
      </button>
    </form>
  );
};
