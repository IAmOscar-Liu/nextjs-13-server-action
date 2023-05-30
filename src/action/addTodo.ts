"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function addTodo(formData: FormData) {
  await fetch("http://localhost:5000/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: formData.get("title"),
      completed: formData.get("completed") === "on",
    }),
    cache: "no-store",
  });

  revalidateTag("todos");
  redirect("/");
}
