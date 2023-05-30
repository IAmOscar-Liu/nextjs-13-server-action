"use client";

import { Todo } from "@/types/Todo";
import { setRefreshRoute, useRouteStore } from "@/utils/routeStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function SingleTodo({ todo }: { todo: Todo }) {
  const pathname = usePathname();
  const router = useRouter();
  const refreshRoute = useRouteStore((state) => state.refreshRoute);

  useEffect(() => {
    if (refreshRoute.includes(pathname)) {
      setRefreshRoute(refreshRoute.filter((p) => p !== pathname));
      router.refresh();
    }
  }, [pathname, refreshRoute, router]);

  return (
    <div>
      <h1>Title: {todo.title}</h1>
      <h2>ID: {todo.id}</h2>
      <h3>Completed: {todo.completed + ""}</h3>
    </div>
  );
}

export default SingleTodo;
