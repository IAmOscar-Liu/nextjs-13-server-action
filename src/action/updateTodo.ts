"use server";

import { Todo } from "@/types/Todo";
import { revalidateTag } from "next/cache";

export default async function updateTodo({
  id,
  ...data
}: Omit<Todo, "id"> & { id: number }) {
  console.log("update data: ", { id, ...data });
  await fetch(`http://localhost:5000/todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });

  revalidateTag("todos");
  // redirect("/");
}
