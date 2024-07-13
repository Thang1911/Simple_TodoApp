import React, { useRef } from "react";
import { addTodo } from "../store/slice/todoSlice";
import { useAppDispatch } from "../store";

const Add = () => {
  const nameRef = useRef<String>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    dispatch(addTodo({ name: nameRef.current.toString() }));
  };

  return (
    <form>
      <div className="flex items-center border-b border-teal-500 py-2 m-7">
        <input
          ref={inputRef}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Todo App"
          aria-label="Full name"
          onChange={(e) => {
            nameRef.current = e.target.value;
          }}
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          onClick={handleClick}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default Add;
