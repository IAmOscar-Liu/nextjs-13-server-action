import Link from "next/link";

export default function Header() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 20 }}>
        Todo with Nextjs Server Action
      </h1>
      <nav style={{ width: "max-content", margin: "15px auto" }}>
        <Link href={"/"}>Home</Link>
        {"  "}
        <Link href={"/add-todo"}>Create Todo</Link>
      </nav>
    </div>
  );
}
