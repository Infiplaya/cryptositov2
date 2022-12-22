import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h2>Posts here</h2>
      <Link href="/community/createpost">Create a new post</Link>
    </div>
  );
}
