import { categories } from '../data/blogs';

export default function CategoryFilter({ active, onChange, onResetPagination }) {
  const handleChange = (id) => {
    onChange(id);
    if (onResetPagination) onResetPagination();
  };

  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleChange(cat.id)}
          className={`text-[13px] font-medium px-5 py-2.5 rounded-full border transition-all duration-300 whitespace-nowrap outline-none
            ${active === cat.id
              ? 'bg-surface-900 text-white border-surface-900 shadow-md shadow-surface-900/20'
              : 'bg-white text-surface-600 border-surface-200 hover:border-brand-300 hover:text-brand-600 hover:shadow-sm'
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
