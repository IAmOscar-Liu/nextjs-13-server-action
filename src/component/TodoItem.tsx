"use client";

import deleteTodo from "@/action/deleteTodo";
import updateTodo from "@/action/updateTodo";
import { Todo } from "@/types/Todo";
import { setRefreshRoute } from "@/utils/routeStore";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";

export default function TodoItem({ todo }: { todo: Todo }) {
  const [editedTodo, setEditedTodo] = useState<Omit<Todo, "id">>({
    title: todo.title,
    completed: todo.completed,
  });
  let [isPending, startTransition] = useTransition();

  useEffect(() => {
    setEditedTodo({ title: todo.title, completed: todo.completed });
  }, [todo]);

  const hasChanged =
    todo.title !== editedTodo.title || todo.completed !== editedTodo.completed;

  const handleUpdate = () => {
    if (!hasChanged) return;
    startTransition(async() => {
      await updateTodo({ id: todo.id, ...editedTodo });
      setRefreshRoute(prev => [...prev, `/todo/${todo.id}`])
    });
  };

  const handleDelete = () => {
    if (!window.confirm("Are you sure?")) return;
    startTransition(() => deleteTodo({ id: todo.id }));
  };

  return (
    <li>
      <article style={{ width: "90%", marginInline: "auto" }}>
        <h2 style={{ display: "flex" }}>
          <span style={{ marginRight: "auto" }}>
            <Link href={`/todo/${todo.id}`}>Title: {todo.title}</Link>
          </span>
          {!isPending && hasChanged && (
            <button onClick={handleUpdate}>Update</button>
          )}
          {!isPending && <button onClick={handleDelete}>Delete</button>}
          {isPending && <span>Processing...</span>}
        </h2>
        <label>
          Completed:{" "}
          <input
            type="checkbox"
            checked={editedTodo.completed}
            onChange={(e) =>
              setEditedTodo({ ...editedTodo, completed: e.target.checked })
            }
          />
        </label>
      </article>
    </li>
  );
}
