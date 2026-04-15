import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Eye } from 'lucide-react';
import CreateBlogModal from '../components/modals/CreateBlogModal';
import EditBlogModal from '../components/modals/EditBlogModal';
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from '../lib/api';

export default function AdminPanelPage() {
  const [blogs, setBlogs] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load blogs from localStorage (will replace with Supabase later)
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    const data = await fetchBlogs();
    setBlogs(data);
    setLoading(false);
  };

  const handleCreateBlog = async (newBlog) => {
    try {
      await createBlog(newBlog);
      await loadBlogs();
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog. Please try again.');
    }
  };

  const handleUpdateBlog = async (updatedBlog) => {
    try {
      await updateBlog(updatedBlog.id, updatedBlog);
      await loadBlogs();
      setShowEditModal(false);
      setSelectedBlog(null);
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog. Please try again.');
    }
  };

  const handleDeleteBlog = async (id) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(id);
        await loadBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Blog Manager</h1>
          <p className="text-gray-600 mt-1">Create, edit, and manage your blog posts</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition cursor-pointer active:bg-blue-800"
          >
            <Plus size={20} />
            Create New Blog
          </button>
        </div>

        {/* Blogs List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No blogs yet. Create your first blog post!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h3>
                    <p className="text-gray-600 line-clamp-2 mb-4">{blog.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Category: {blog.category}</span>
                      <span>•</span>
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedBlog(blog);
                        setShowEditModal(true);
                      }}
                      className="bg-gray-100 hover:bg-gray-200 text-blue-600 p-2 rounded-lg transition border border-gray-300"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="bg-gray-100 hover:bg-gray-200 text-red-600 p-2 rounded-lg transition border border-gray-300"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                    <a
                      href={`/blog/${blog.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-gray-200 text-green-600 p-2 rounded-lg transition border border-gray-300"
                      title="View"
                    >
                      <Eye size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateBlogModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateBlog}
        />
      )}
      {showEditModal && selectedBlog && (
        <EditBlogModal
          blog={selectedBlog}
          onClose={() => {
            setShowEditModal(false);
            setSelectedBlog(null);
          }}
          onUpdate={handleUpdateBlog}
        />
      )}
    </div>
  );
}
