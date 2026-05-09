'use client'

import { motion } from 'framer-motion'
import { MonthlyRevenueCard } from '@/components/dashboard/MonthlyRevenueCard'
import { ExecutionScoreCard } from '@/components/dashboard/ExecutionScoreCard'
import { ActiveVenturesCard } from '@/components/dashboard/ActiveVenturesCard'
import { RecentActivityCard } from '@/components/dashboard/RecentActivityCard'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export default function DashboardPage() {
  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Command Center</h2>
            <p className="text-muted-foreground mt-1">Your executive dashboard for today</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-green-600">Active</span>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <MonthlyRevenueCard />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ExecutionScoreCard />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ActiveVenturesCard />
        </motion.div>
      </motion.div>

      {/* Secondary Content */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <RecentActivityCard />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
