import { Todo } from "@/types/Todo";
import TodoItem from "./TodoItem";

async function getTodos() {
  try {
    const response = await fetch("http://localhost:5000/todo", {
      next: { revalidate: 60, tags: ["todos"] },
    });

    return (await response.json()) as Todo[];
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

export default async function Todolist() {
  const todos = await getTodos();

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
