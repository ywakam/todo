import { FilterType, SortType } from '../types/todo';

interface TodoFilterProps {
  filter: FilterType;
  sort: SortType;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
}

export const TodoFilter = ({ filter, sort, onFilterChange, onSortChange }: TodoFilterProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            フィルター
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => onFilterChange('all')}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              すべて
            </button>
            <button
              onClick={() => onFilterChange('active')}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                filter === 'active'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              未完了
            </button>
            <button
              onClick={() => onFilterChange('completed')}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                filter === 'completed'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              完了
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
            並び替え
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="createdAt">作成日順</option>
            <option value="dueDate">期限順</option>
            <option value="priority">優先度順</option>
          </select>
        </div>
      </div>
    </div>
  );
};
