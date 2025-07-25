import { CalendarDays, ArrowRight } from 'lucide-react'
import { Input } from '../atoms'
import { cn } from '../../utils'

interface DateRangeFilterProps {
  dateFrom?: string
  dateTo?: string
  onDateFromChange: (date: string) => void
  onDateToChange: (date: string) => void
  className?: string
}

export function DateRangeFilter({ 
  dateFrom, 
  dateTo, 
  onDateFromChange, 
  onDateToChange,
  className 
}: DateRangeFilterProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Mobile Layout */}
      <div className="block sm:hidden space-y-4">
        <div className="flex items-center gap-2 justify-center">
          <CalendarDays className="h-5 w-5 text-cyan-400" />
          <span className="text-theme-primary font-medium text-sm">Date Range</span>
        </div>
        
        <div className="space-y-3">
          <div className="relative group">
            <label className="block text-xs text-theme-secondary mb-1 ml-1">From Date</label>
            <Input
              type="date"
              value={dateFrom || ''}
              onChange={(e) => onDateFromChange(e.target.value)}
              className="glass-card w-full border-border bg-white/5 backdrop-blur-md text-theme-primary focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300 [color-scheme:dark] h-12"
              placeholder="From date"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
          
          <div className="relative group">
            <label className="block text-xs text-theme-secondary mb-1 ml-1">To Date</label>
            <Input
              type="date"
              value={dateTo || ''}
              onChange={(e) => onDateToChange(e.target.value)}
              className="glass-card w-full border-border bg-white/5 backdrop-blur-md text-theme-primary focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 [color-scheme:dark] h-12"
              placeholder="To date"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
        </div>
      </div>

      {/* Tablet and Desktop Layout */}
      <div className="hidden sm:flex sm:flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex items-center gap-2 lg:flex-shrink-0">
          <CalendarDays className="h-5 w-5 text-cyan-400" />
          <span className="text-theme-primary font-medium text-sm whitespace-nowrap">Date Range:</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
          <div className="relative group w-full sm:w-44">
            <Input
              type="date"
              value={dateFrom || ''}
              onChange={(e) => onDateFromChange(e.target.value)}
              className="glass-card w-full border-border bg-white/5 backdrop-blur-md text-theme-primary focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/30 transition-all duration-300 [color-scheme:dark] h-12"
              placeholder="From date"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
          
          <ArrowRight className="h-4 w-4 text-theme-secondary flex-shrink-0 hidden sm:block" />
          
          <div className="relative group w-full sm:w-44">
            <Input
              type="date"
              value={dateTo || ''}
              onChange={(e) => onDateToChange(e.target.value)}
              className="glass-card w-full border-border bg-white/5 backdrop-blur-md text-theme-primary focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 [color-scheme:dark] h-12"
              placeholder="To date"
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 