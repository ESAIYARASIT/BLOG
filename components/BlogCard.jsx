import { useState } from "react"
import { Trash2, Eye, Calendar } from "lucide-react"

const BlogCard = ({ blog, onDelete }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fadeIn">
        
        <div className="relative h-48 overflow-hidden">
          <img
            src={blog.image || "https://source.unsplash.com/600x400/?technology"}
            alt={blog.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
          </div>
        </div>

        <div className="p-5">
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
            {blog.content}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{blog.date}</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="hover:text-indigo-500 transition">
                <Eye size={18} />
              </button>

              <button
                onClick={() => setShowModal(true)}
                className="hover:text-red-500 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fadeIn">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-80 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Delete Blog?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
              Are you sure you want to delete this blog post?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:opacity-80 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(blog.id)
                  setShowModal(false)
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BlogCard