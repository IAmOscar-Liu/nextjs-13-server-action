import handleAddTodo from "@/action/addTodo";

export default function addTodo() {
  return (
    <div>
      <h1>Add Todo</h1>
      <form action={handleAddTodo}>
        <label>
          Title: <input name="title" type="text" />
        </label>
        <label>
          Completed: <input name="completed" type="checkbox" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
