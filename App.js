import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import FilterSort from './components/FilterSort';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterUser, setFilterUser] = useState('');
  const [sortUncompleted, setSortUncompleted] = useState('title-asc');
  const [sortCompleted, setSortCompleted] = useState('date-asc');
  const [visibleTodos, setVisibleTodos] = useState(10);

  useEffect(() => {
    fetch('http://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data));

    fetch('http://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleComplete = (todo) => {
    setTodos(todos.filter(t => t.id !== todo.id));
    setCompletedTodos([
      { ...todo, completedAt: new Date().toISOString() },
      ...completedTodos
    ]);
  };

  const handleUndo = (todo) => {
    setCompletedTodos(completedTodos.filter(t => t.id !== todo.id));
    setTodos([...todos, { ...todo, completed: false }]);
  };

  const filteredTodos = todos.filter(todo =>
    !filterUser || todo.userId === parseInt(filterUser)
  );
  const filteredCompleted = completedTodos.filter(todo =>
    !filterUser || todo.userId === parseInt(filterUser)
  );

  const sortByTitle = (list, order) => {
    return [...list].sort((a, b) => {
      if (order === 'title-asc') return a.title.localeCompare(b.title);
      else return b.title.localeCompare(a.title);
    });
  };

  const sortByDate = (list, order) => {
    return [...list].sort((a, b) => {
      if (order === 'date-asc') return new Date(a.completedAt) - new Date(b.completedAt);
      else return new Date(b.completedAt) - new Date(a.completedAt);
    });
  };

  return (
    <div className="container">
      <div className="left-side">
        <h2>Pending</h2>
        <FilterSort
          users={users}
          filterUser={filterUser}
          setFilterUser={setFilterUser}
          sortType={sortUncompleted}
          setSortType={setSortUncompleted}
          sortOptions={[
            { value: 'title-asc', label: 'Title (asc)' },
            { value: 'title-desc', label: 'Title (desc)' }
          ]}
        />
        <div className="todo-list">
        {sortByTitle(filteredTodos, sortUncompleted).slice(0, visibleTodos).map((todo) => (
          <TodoItem key={todo.id} todo={todo} onAction={handleComplete} actionLabel="Complete" />
        ))}
          {visibleTodos < filteredTodos.length && (
            <button onClick={() => setVisibleTodos(visibleTodos + 10)} className="load-more">
              Load More
            </button>
          )}
        </div>
      </div>

      <div className="right-side">
        <h2>Completed</h2>
        <FilterSort
          users={users}
          filterUser={filterUser}
          setFilterUser={setFilterUser}
          sortType={sortCompleted}
          setSortType={setSortCompleted}
          sortOptions={[
            { value: 'date-asc', label: 'Date (asc)' },
            { value: 'date-desc', label: 'Date (desc)' }
          ]}
        />
        <div className="todo-list">
        {sortByDate(filteredCompleted, sortCompleted).map((todo) => (
          <TodoItem
           key={todo.id}
           todo={todo}
           onAction={handleUndo}
           actionLabel="Undo"
           showCompletedDate
          />
         ))}
        </div>
      </div>
    </div>
  );
}

export default App;
