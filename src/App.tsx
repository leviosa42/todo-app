import TodoList from "./components/TodoList.tsx";

export default () => {
  return (
    <>
      <header
        style={{
          fontSize: "1.5rem",
          fontStyle: "italic",
          backgroundColor: "#333",
          color: "#fff",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        ToDo App
      </header>
      <main
        style={{
          backgroundColor: "#eee",
          padding: "1em",
        }}
      >
        <TodoList />
      </main>
    </>
  );
};
