import { removeTodo, Todo, toggleTodo } from "@/features/todoSlice";
import React, { useCallback, useRef, memo } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface TodoItemProps {
  todo: Todo;
}

const useSwipeToDelete = (onDelete: () => void) => {
  const touchStartXRef = useRef<number | null>(null);
  const swipeAnimationRef = useRef<HTMLDivElement | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartXRef.current || !swipeAnimationRef.current) return;
    
    const touchEnd = e.touches[0].clientX;
    const THRESHOLD_PIXELS = 200;

    if (touchStartXRef.current - touchEnd > THRESHOLD_PIXELS) {
      swipeAnimationRef.current.classList.add('animate-swipe-out', 'bg-red-500');
      setTimeout(onDelete, 500);
    }
  }, [onDelete]);

  const handleTouchEnd = useCallback(() => {
    touchStartXRef.current = null;
  }, []);

  return {
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    },
    swipeRef: swipeAnimationRef
  };
};

const TodoItem: React.FC<TodoItemProps> = memo(({ todo }) => {
  const dispatch = useDispatch();
  const todoInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = useCallback(() => {
    dispatch(removeTodo({ id: todo.id }));
  }, [dispatch, todo.id]);

  const handleToggle = useCallback(() => {
    dispatch(toggleTodo({ id: todo.id }));
  }, [dispatch, todo.id]);

  const { touchHandlers, swipeRef } = useSwipeToDelete(handleDelete);

  const handleFocusInput = useCallback(() => {
    if (!todo.completed && todoInputRef.current) {
      todoInputRef.current.focus();
      todoInputRef.current.readOnly = false;
    }
  }, [todo.completed]);

  const handleBlur = useCallback(() => {
    if (todoInputRef.current) {
      todoInputRef.current.readOnly = true;
    }
  }, []);

  return (
    <div
      ref={swipeRef}
      className={`mx-auto mb-1 flex max-w-lg justify-between gap-4 rounded-lg px-4 py-2
        transition-all duration-300 ${todo.completed ? "bg-zinc-500" : "bg-zinc-700"}`}
      {...touchHandlers}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <div className={todo.completed ? "line-through" : ""}>
          <input
            ref={todoInputRef}
            type="text"
            defaultValue={todo.text}
            className={`w-full bg-transparent outline-none ${
              todo.completed ? "line-through" : ""
            }`}
            readOnly
            onBlur={handleBlur}
            onFocus={handleFocusInput}
            
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          className="hidden rounded-lg bg-zinc-100 p-2 md:block"
        >
          <FaTrash className="text-zinc-800" />
        </button>
      </div>
    </div>
  );
});

TodoItem.displayName = "TodoItem";

export default TodoItem;