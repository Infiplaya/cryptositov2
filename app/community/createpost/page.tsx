import { FormPost } from "./FormPost";

export default function Page() {
  return (
    <div className="flex items-center justify-center">
      <div className="p-5 w-1/4 mt-10 h-96 rounded-lg flex justify-center">
        <FormPost />
      </div>
    </div>
  );
}
