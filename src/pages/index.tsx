import AddTodo from "@/components/AddTodo";
import Todos from "@/components/Todos";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const index = () => {
  return (
    <Provider store={store}>
      <h1 className="my-10 text-center text-3xl font-bold">
        Redux Toolkit Todo list
      </h1>
      <AddTodo />
      <Todos />
    </Provider>
  );
};
export default index;
