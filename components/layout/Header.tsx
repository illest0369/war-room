'use client'

import { Search, Bell, Zap, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface HeaderProps {
  sidebarOpen?: boolean
  onSidebarToggle?: () => void
}

export function Header({ onSidebarToggle }: HeaderProps) {
  const now = new Date()
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'short' })
  const month = now.toLocaleDateString('en-US', { month: 'short' })
  const date = now.getDate()
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

  return (
    <header className="border-b border-border bg-background px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-4">
      {/* Left: Menu button and Title */}
      <div className="flex items-center gap-3 sm:gap-6 min-w-0">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onSidebarToggle}
          className="md:hidden rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </Button>

        <div className="min-w-0">
          <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">WAR ROOM</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {dayOfWeek}, {month} {date} • {time}
          </p>
        </div>
      </div>

      {/* Center: Search - hidden on mobile */}
      <div className="hidden md:flex flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search anything..."
            className="pl-10 bg-muted border-muted text-foreground placeholder:text-muted-foreground rounded-lg"
          />
        </div>
      </div>

      {/* Right: Actions and Profile */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Quick Action Button - text hidden on mobile */}
        <Button
          size="sm"
          className="bg-foreground text-background hover:bg-foreground/90 rounded-lg"
        >
          <Zap className="w-4 h-4" />
          <span className="hidden sm:inline">Quick Action</span>
        </Button>

        {/* Notification Bell */}
        <Button
          variant="ghost"
          size="sm"
          className="relative rounded-lg hover:bg-muted"
        >
          <Bell className="w-4 sm:w-5 h-4 sm:h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </Button>

        {/* Profile Avatar */}
        <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-purple flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-card-hover transition-all flex-shrink-0">
          O
        </div>
      </div>
    </header>
  )
}
