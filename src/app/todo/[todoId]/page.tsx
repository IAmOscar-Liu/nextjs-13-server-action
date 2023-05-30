import SingleTodo from "@/component/SingleTodo";
import { Todo } from "@/types/Todo";

type pageProps = { params: { todoId: string }; searchParams: {} };

async function getTodo(id: number) {
  try {
    const response = await fetch(`http://localhost:5000/todo/${id}`, {
      // next: { revalidate: 60, tags: [`todos_${id}`] },
      cache: "no-store",
    });

    const result = await response.json();
    if (Object.keys(result).length === 0) return null;
    return result as Todo;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

export default async function page(props: pageProps) {
  const todo = await getTodo(+props.params.todoId);

  if (!todo) return <div>No such Todo</div>;

  return <SingleTodo todo={todo} />;
}
