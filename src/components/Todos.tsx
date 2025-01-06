import { RootState } from "@/features/todoSlice";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const Todos = () => {
  const todos = useSelector((state: RootState) => state.todos);
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div className="" key={todo.id}>
            <TodoItem todo={todo} />
          </div>
        );
      })}
    </div>
  );
};
export default Todos;
