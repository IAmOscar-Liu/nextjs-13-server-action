import Todolist from "@/component/Todolist";

export default async function Home() {
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <Todolist />
    </div>
  );
}
