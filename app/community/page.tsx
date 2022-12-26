import Link from "next/link";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Posts } from "./Posts";

export default function Page() {
  return (
    <div className="p-4">
      <h2>Posts here</h2>
      <Posts />
      <Link href="/community/createpost">Create a new post</Link>
    </div>
  );
}
