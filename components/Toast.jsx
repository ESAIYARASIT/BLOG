import { useEffect } from "react"
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react"

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info
}

const colors = {
  success: "from-emerald-500 to-green-500",
  error: "from-red-500 to-rose-500",
  warning: "from-amber-500 to-orange-500",
  info: "from-indigo-500 to-blue-500"
}

const Toast = ({ id, type = "success", message, duration = 4000, onClose }) => {
  const Icon = icons[type]

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  return (
    <div className="relative overflow-hidden min-w-[280px] max-w-sm p-4 rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700 shadow-xl animate-slideIn">
      
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${colors[type]} text-white`}>
          <Icon size={18} />
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-gray-800 dark:text-white">
            {message}
          </p>
        </div>

        <button
          onClick={() => onClose(id)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          <X size={16} />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full bg-gradient-to-r ${colors[type]} animate-progress`}
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  )
}

export default Toast