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
      className="space-y-4 sm:space-y-6 lg:space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Command Center</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Your executive dashboard for today</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-green-600">Active</span>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Grid - Mobile first: 1 col → 2 cols → 3 cols */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <MonthlyRevenueCard />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ExecutionScoreCard />
        </motion.div>
        <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
          <ActiveVenturesCard />
        </motion.div>
      </motion.div>

      {/* Secondary Content */}
      <motion.div
        className="grid grid-cols-1 gap-4 sm:gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <RecentActivityCard />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
