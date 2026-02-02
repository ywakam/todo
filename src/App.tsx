import { useState, useMemo } from 'react';
import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { FilterType, SortType } from './types/todo';

function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('createdAt');

  const filteredAndSortedTodos = useMemo(() => {
    let result = [...todos];

    // フィルタリング
    switch (filter) {
      case 'active':
        result = result.filter((todo) => !todo.completed);
        break;
      case 'completed':
        result = result.filter((todo) => todo.completed);
        break;
    }

    // ソート
    result.sort((a, b) => {
      switch (sort) {
        case 'dueDate': {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        case 'priority': {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        case 'createdAt':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [todos, filter, sort]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">TODO アプリ</h1>
          <p className="text-gray-600">タスクを管理して生産性を向上させましょう</p>

          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              <span className="font-semibold text-gray-700">全体: </span>
              <span className="text-blue-600 font-bold">{stats.total}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              <span className="font-semibold text-gray-700">未完了: </span>
              <span className="text-orange-600 font-bold">{stats.active}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              <span className="font-semibold text-gray-700">完了: </span>
              <span className="text-green-600 font-bold">{stats.completed}</span>
            </div>
          </div>
        </header>

        <TodoForm onAdd={addTodo} />

        <TodoFilter
          filter={filter}
          sort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
        />

        <TodoList
          todos={filteredAndSortedTodos}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
