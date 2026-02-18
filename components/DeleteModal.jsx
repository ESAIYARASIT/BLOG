import { useEffect } from "react"
import { Trash2 } from "lucide-react"

const DeleteModal = ({ isOpen, onClose, onConfirm, title = "Delete Item", message = "Are you sure you want to delete this item?" }) => {

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-2xl shadow-2xl w-96 p-6 transform animate-scaleIn">
        
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-red-500 text-white shadow-lg">
            <Trash2 size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:opacity-80 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal