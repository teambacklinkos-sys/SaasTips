import { useState } from 'react';
import { X, ImageIcon, User, Tag, AlignLeft, Type, Loader2 } from 'lucide-react';

const CATEGORIES = ['Technology', 'Business', 'Design', 'Marketing', 'Development', 'Other'];

export default function EditBlogModal({ blog, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    title: blog.title || '',
    description: blog.excerpt || blog.description || '',
    content: (blog.body?.[0]?.text) || blog.content || '',
    category: blog.category
      ? blog.category.charAt(0).toUpperCase() + blog.category.slice(1)
      : 'Technology',
    author: blog.author || '',
    image: blog.image || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    try {
      await onUpdate({ ...blog, ...formData, updatedAt: new Date().toISOString() });
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Edit Post</h2>
            <p className="text-sm text-slate-500 mt-0.5 truncate max-w-sm">{blog.title}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-5">

          {/* Title */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-1.5">
              <Type size={14} />
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Blog title"
              className={`w-full px-4 py-2.5 rounded-lg border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.title ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-1.5">
              <AlignLeft size={14} />
              Short Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="A brief summary..."
              rows="2"
              className={`w-full px-4 py-2.5 rounded-lg border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${errors.description ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>

          {/* Content */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-1.5">
              <AlignLeft size={14} />
              Full Content <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Full blog content..."
              rows="7"
              className={`w-full px-4 py-2.5 rounded-lg border text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${errors.content ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
            />
            {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content}</p>}
          </div>

          {/* Category + Author row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-1.5">
                <Tag size={14} />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-1.5">
                <User size={14} />
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 mb-1.5">
              <ImageIcon size={14} />
              Cover Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="mt-2 w-full h-32 object-cover rounded-lg border border-slate-200"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-slate-50 rounded-b-2xl">
          <p className="text-xs text-slate-400"><span className="text-red-400">*</span> Required fields</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              {isLoading ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
