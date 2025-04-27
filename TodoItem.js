function TodoItem({ todo, onAction, actionLabel, showCompletedDate }) {
  return (
    <div className="todo-item">
      <p>{todo.title}</p>
      {showCompletedDate && (
        <small>Completed on: {new Date(todo.completedAt).toLocaleDateString()}</small>
      )}
      <button onClick={() => onAction(todo)}>{actionLabel}</button>
    </div>
  );
}

export default TodoItem;
