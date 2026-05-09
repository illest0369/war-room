'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Grid2x2,
  Target,
  Rocket,
  Play,
  DollarSign,
  Lightbulb,
  Brain,
  BookOpen,
  Zap,
  BookMarked,
  Lock,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: 'Command Center',
    href: '/dashboard',
    icon: Grid2x2,
  },
  {
    name: 'Founder Board',
    href: '/dashboard/war-room',
    icon: Target,
  },
  {
    name: 'Ventures',
    href: '/dashboard/ventures',
    icon: Rocket,
  },
  {
    name: 'Runnit Back',
    href: '/dashboard/projects',
    icon: Play,
  },
  {
    name: 'Money',
    href: '/dashboard/money',
    icon: DollarSign,
  },
  {
    name: 'Opportunities',
    href: '/dashboard/opportunities',
    icon: Lightbulb,
  },
  {
    name: 'AI Agents',
    href: '/dashboard/agents',
    icon: Brain,
  },
  {
    name: 'Content Ops',
    href: '/dashboard/content',
    icon: BookOpen,
  },
  {
    name: 'Strategy',
    href: '/dashboard/strategy',
    icon: Zap,
  },
  {
    name: 'Knowledge',
    href: '/dashboard/knowledge',
    icon: BookMarked,
  },
  {
    name: 'Vault',
    href: '/dashboard/vault',
    icon: Lock,
  },
]

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()

  const handleNavClick = () => {
    onClose?.()
  }

  return (
    <aside className="w-72 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col overflow-hidden h-full">
      {/* Logo/Brand */}
      <div className="px-6 py-8 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2" onClick={handleNavClick}>
          <div className="w-8 h-8 rounded-lg bg-gradient-purple flex items-center justify-center text-white font-bold">
            W
          </div>
          <span className="text-xl font-bold">WAR ROOM</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:bg-opacity-20'
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <Link
          href="/dashboard/settings"
          onClick={handleNavClick}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:bg-opacity-20 transition-all duration-200"
        >
          <Zap className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </Link>
      </div>
    </aside>
  )
}
