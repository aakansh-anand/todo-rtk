import { removeTodo, Todo, toggleTodo, updateTodo } from "@/features/todoSlice";
import React, { useState } from "react";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [todoValue, setTodoValue] = useState(todo.text);
  const dispatch = useDispatch();
  return (
    <div
      className={`mx-auto mb-1 flex max-w-lg justify-between gap-4 rounded-lg px-4 py-2 ${todo.completed ? "bg-zinc-500" : "bg-zinc-700"}`}
      key={todo.id}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() =>
            dispatch(
              toggleTodo({
                id: todo.id,
              })
            )
          }
        />
        <div className={todo.completed ? "line-through" : ""}>
          <input
            type="text"
            value={todoValue}
            className="bg-transparent outline-none"
            readOnly={!isEditable}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => dispatch(updateTodo({ id: todo.id, text: todoValue }))}
          className="rounded-lg bg-zinc-100 p-2"
        >
          {isEditable ? (
            <FaSave
              className="text-zinc-800"
              onClick={() => setIsEditable(false)}
            />
          ) : (
            <FaEdit
              className="text-zinc-800"
              onClick={() => setIsEditable(true)}
            />
          )}
        </button>
        <button
          onClick={() => dispatch(removeTodo({ id: todo.id }))}
          className="rounded-lg bg-zinc-100 p-2"
        >
          <FaTrash className="text-zinc-800" />
        </button>
      </div>
    </div>
  );
};
export default TodoItem;
