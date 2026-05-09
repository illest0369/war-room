'use client'

import { motion } from 'framer-motion'
import { MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ExecutionScoreCard() {
  const score = 87
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (score / 100) * circumference

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.2 }}
      className="card-elevated bg-white border border-border p-4 sm:p-6 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <motion.p
          className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Execution Score
        </motion.p>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground rounded-lg">
            <MoreVertical className="w-4 sm:w-5 h-4 sm:h-5" />
          </Button>
        </motion.div>
      </div>

      {/* Circular Progress */}
      <div className="flex-1 flex items-center justify-center mb-4 sm:mb-6">
        <motion.div
          className="relative w-24 sm:w-32 h-24 sm:h-32"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="text-accent-gold transition-all duration-1000"
              animate={{ strokeDashoffset: offset }}
              initial={{ strokeDashoffset: circumference }}
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-2xl sm:text-3xl font-bold text-foreground"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {score}
            </motion.span>
            <span className="text-xs text-muted-foreground">Score</span>
          </div>
        </motion.div>
      </div>

      {/* Metrics */}
      <motion.div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-border">
        {[
          { value: '12', label: 'Wins' },
          { value: '8', label: 'Shipped' },
          { value: '3', label: 'Streaks' }
        ].map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="text-center hover:bg-slate-50 p-2 rounded-lg transition-colors"
          >
            <p className="text-xl sm:text-2xl font-bold text-foreground">{metric.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
