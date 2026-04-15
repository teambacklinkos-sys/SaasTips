import { categories } from '../data/blogs';

export default function CategoryFilter({ active, onChange, onResetPagination }) {
  const handleChange = (id) => {
    onChange(id);
    if (onResetPagination) onResetPagination();
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleChange(cat.id)}
          className={`text-xs font-semibold px-4 py-2 rounded-full border transition whitespace-nowrap
            ${active === cat.id
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200'
              : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
