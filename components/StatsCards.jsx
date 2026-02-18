import { useEffect, useState } from "react"
import { BookOpen, Users, TrendingUp, MessageSquare } from "lucide-react"

const statsData = [
  {
    id: 1,
    title: "Total Blogs",
    value: 128,
    icon: BookOpen,
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: 2,
    title: "Total Users",
    value: 342,
    icon: Users,
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    id: 3,
    title: "Engagement",
    value: 87,
    suffix: "%",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    id: 4,
    title: "Comments",
    value: 564,
    icon: MessageSquare,
    gradient: "from-amber-500 to-orange-500"
  }
]

const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1200
    const increment = value / (duration / 16)

    const counter = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(counter)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(counter)
  }, [value])

  return (
    <h3 className="text-3xl font-bold text-gray-800 dark:text-white">
      {count}
      {suffix}
    </h3>
  )
}

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.id}
            className="relative p-6 rounded-2xl backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border border-white/20 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
          >
            <div
              className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r ${stat.gradient}`}
            />
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon size={22} />
              </div>
            </div>
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {stat.title}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default StatsCards