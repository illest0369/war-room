'use client'

import { motion } from 'framer-motion'
import { MoreVertical, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

const activities = [
  {
    id: 1,
    title: 'Closed Series A funding round',
    time: '2 hours ago',
  },
  {
    id: 2,
    title: 'Launched new product feature',
    time: '4 hours ago',
  },
  {
    id: 3,
    title: 'Team standup completed',
    time: 'Yesterday',
  },
]

export function RecentActivityCard() {
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
          Recent Activity
        </motion.p>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground rounded-lg">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ x: 4 }}
            className="flex items-start gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0 cursor-pointer"
          >
            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: -10 }}
              className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5"
            >
              <Clock className="w-4 h-4 text-muted-foreground" />
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-sm">{activity.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All */}
      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: 'rgb(249 250 251)' }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 px-4 py-2 text-sm font-medium text-accent hover:text-accent/90 rounded-lg border border-border transition-colors"
      >
        View All Activity
      </motion.button>
    </motion.div>
  )
}
