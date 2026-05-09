'use client'

import { motion } from 'framer-motion'
import { MoreVertical, TrendingUp, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ventures = [
  {
    id: 1,
    name: 'Runnit Back',
    avatar: 'R',
    avatarColor: 'bg-gradient-purple',
    views: '8.4M',
    trend: 23,
    isPositive: true,
  },
  {
    id: 2,
    name: 'AI Platform',
    avatar: 'A',
    avatarColor: 'bg-gradient-purple',
    views: '2.1k',
    trend: 18,
    isPositive: true,
  },
  {
    id: 3,
    name: 'Content Studio',
    avatar: 'C',
    avatarColor: 'bg-gradient-purple',
    views: '847',
    trend: -4,
    isPositive: false,
  },
]

export function ActiveVenturesCard() {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.2 }}
      className="card-elevated bg-white border border-border p-6 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.p
          className="text-sm font-medium text-muted-foreground uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Active Ventures
        </motion.p>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground rounded-lg">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      {/* Ventures List */}
      <div className="space-y-4">
        {ventures.map((venture, i) => (
          <motion.div
            key={venture.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ x: 4, backgroundColor: 'rgb(249 250 251)' }}
            className="flex items-center gap-4 p-3 rounded-lg transition-colors cursor-pointer"
          >
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`w-10 h-10 ${venture.avatarColor} rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}
            >
              {venture.avatar}
            </motion.div>

            {/* Venture Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm">{venture.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{venture.views} views</p>
            </div>

            {/* Trend */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-1 flex-shrink-0"
            >
              {venture.isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-sm font-semibold ${venture.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {venture.isPositive ? '+' : ''}{venture.trend}%
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: 'rgb(249 250 251)' }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 px-4 py-2 text-sm font-medium text-accent hover:text-accent/90 rounded-lg border border-border transition-colors"
      >
        View All
      </motion.button>
    </motion.div>
  )
}
