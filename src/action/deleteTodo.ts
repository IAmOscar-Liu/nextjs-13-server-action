"use server";

import { revalidateTag } from "next/cache";

export default async function deleteTodo({ id }: { id: number }) {
  await fetch(`http://localhost:5000/todo/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  revalidateTag("todos");
  // redirect("/");
}
