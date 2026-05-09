'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'

const data = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 55 },
  { name: 'May', value: 60 },
  { name: 'Jun', value: 65 },
  { name: 'Jul', value: 70 },
  { name: 'Aug', value: 72 },
  { name: 'Sep', value: 75 },
  { name: 'Oct', value: 78 },
  { name: 'Nov', value: 80 },
  { name: 'Dec', value: 82 },
]

export function MonthlyRevenueCard() {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.2 }}
      className="card-elevated gradient-coral-pink text-white p-4 sm:p-6 flex flex-col relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0 mb-4 sm:mb-6 relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <p className="text-xs sm:text-sm font-medium text-white/80 uppercase tracking-wider">Monthly Revenue</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-white mt-2">$47.2K</h3>
          <p className="text-xs sm:text-sm text-white/80 mt-1">Goal: $68K • 68% there</p>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
          >
            <MoreVertical className="w-4 sm:w-5 h-4 sm:h-5" />
          </Button>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="flex-1 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-2 sm:pb-4 relative z-10">
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: 'none',
                borderRadius: '0.5rem',
              }}
              formatter={(value) => `$${value}K`}
            />
            <Bar dataKey="value" fill="rgba(255,255,255,0.5)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Breakdown */}
      <motion.div className="grid grid-cols-3 gap-2 sm:gap-4 mt-3 sm:mt-4 relative z-10">
        {[
          { label: 'Recurring', value: '47%' },
          { label: 'One-time', value: '38%' },
          { label: 'Other', value: '15%' }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <p className="text-xs text-white/80">{item.label}</p>
            <p className="text-lg sm:text-xl font-bold text-white">{item.value}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
