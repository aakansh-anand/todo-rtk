import { addTodo } from "@/features/todoSlice";
import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { useDispatch } from "react-redux";

const AddTodo = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  function addTodoHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(addTodo({ text: input }));
    setInput("");
  }
  return (
    <div className="mx-auto mb-10 max-w-lg">
      <form
        onSubmit={addTodoHandler}
        className="flex w-full justify-between gap-5 rounded-lg bg-zinc-100"
      >
        <input
          type="text"
          placeholder="Add Todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-4/5 rounded-lg bg-zinc-100 px-4 py-2 text-black outline-none"
          required
        />
        <button
          type="submit"
          className=" rounded-lg bg-zinc-100 px-3 py-2 text-black hover:bg-zinc-300"
        >
          <FaArrowCircleUp />
        </button>
      </form>
    </div>
  );
};
export default AddTodo;
