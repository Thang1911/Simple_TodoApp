import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { activatedTodo, deleteTodo, editTodo } from "../features/todo/todoSlice";
import { TodoData } from "../features/todo/todoSlice";

const Lists = () => {
  let todos = useAppSelector((state) => state.todo.todo);
  const dispatch = useAppDispatch();
  const [todoApp, setTodoApp] = useState<TodoData[]>([]);
  const [filter, setFilter] = useState<string>("All");
  useEffect(() => {
    setTodoApp(todos);
  }, [todos]);

  const [checkedItems, setCheckedItems] = useState(
    new Array(todos.length).fill(false)
  );

  const handleCheckboxChange = (index: number) => {
    setCheckedItems((prev) => {
      const newCheckedItems = [...prev];
      newCheckedItems[index] = !newCheckedItems[index];
      return newCheckedItems;
    });
  };

  const filterList = () => {
    let filteredTodos;

    if (filter === "All") {
      filteredTodos = todos;
    } else if (filter === "Active") {
      filteredTodos = todos.filter((todo) => todo?.activated === false);
    } else if (filter === "Complete") {
      filteredTodos = todos.filter((todo) => todo?.activated === true);
    } else {
      filteredTodos = todos;
    }
    console.log(filteredTodos);
    todos = filteredTodos;
    return todos;
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Activated
              </th>
              <th scope="col" className="px-6 py-3">
                Edited
              </th>
            </tr>
          </thead>
          <tbody>
            {filterList()?.map((todo, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td>
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    readOnly={!checkedItems[index]}
                    value={todo?.name}
                    onChange={(e) => dispatch(editTodo({id: todo?.id, name: e.target.value}))}
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() =>
                      dispatch(deleteTodo({ id: todo?.id, name: todo?.name }))
                    }
                  >
                    Delete
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={todo?.activated}
                      onChange={(e) => {
                        console.log("data", {
                          id: todo?.id,
                          name: todo?.name,
                          activated: e.target.checked,
                        });
                        dispatch(
                          activatedTodo({
                            id: todo?.id,
                            name: todo?.name,
                            activated: e.target.checked,
                          })
                        );
                      }}
                    />{" "}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={checkedItems[index]}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center p-4">
        <p>{todos?.length} items left!</p>
        <div className=" w-96 flex justify-between items-center">
          <button onClick={() => setFilter("All")}>All</button>
          <button onClick={() => setFilter("Active")}>Active</button>
          <button onClick={() => setFilter("Complete")}>Complete</button>
        </div>
        <button onClick={() => setFilter("Active")}>Clear completed</button>
      </div>
    </>
  );
};

export default Lists;
