import { useEffect } from "react";
import { useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let shouldCancel = false;
    async function fetchTodoList() {
      try {
        const response = await fetch(`https://restapi.fr/api/rtodo`);
        if (response.ok) {
          const todos = await response.json();
          if (!shouldCancel) {
            if (Array.isArray(todos)) {
              setTodoList(todos);
            } else {
              setTodoList([todos]);
            }
          }
        } else {
          console.log("Erreur");
        }
      } catch (e) {
        console.log("Erreur");
      } finally {
        setLoading(false);
      }
    }
    fetchTodoList();
    return () => {
      shouldCancel = true;
    };
  }, []);

  function addTodo(newTodo) {
    setTodoList([...todoList, newTodo]);
  }

  function deleteTodo(deletedTodo) {
    setTodoList(todoList.filter((t) => t._id !== deletedTodo._id));
  }

  function updateTodo(updatedTodo) {
    setTodoList(
      todoList.map((t) => (t._id === updatedTodo._id ? updatedTodo : t))
    );
  }

  return (
    <div className="d-flex flex-row justify-content-center align-items-center p-20">
      <div className="card container p-20">
        <h1 className="mb-20">Todo list</h1>
        <AddTodo addTodo={addTodo} />
        {loading ? (
          <p>Chargement en cours</p>
        ) : (
          <TodoList
            todoList={todoList}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
