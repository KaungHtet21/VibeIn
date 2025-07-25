import { RotateCcw, Sparkles } from 'lucide-react'
import { SearchBar, FilterDropdown, DateRangeFilter } from '../molecules'
import { Button } from '../atoms'
import type { EventFilter, EventType } from '../../types'
import { cn } from '../../utils'

interface EventFiltersProps {
  filters: EventFilter
  onFiltersChange: (filters: EventFilter) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
  className?: string
}

export function EventFilters({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  hasActiveFilters,
  className 
}: EventFiltersProps) {
  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search })
  }

  const handleTypeChange = (type: EventType | 'All') => {
    onFiltersChange({ ...filters, type })
  }

  const handleDateFromChange = (dateFrom: string) => {
    onFiltersChange({ ...filters, dateFrom })
  }

  const handleDateToChange = (dateTo: string) => {
    onFiltersChange({ ...filters, dateTo })
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Mobile-First Layout */}
      <div className="space-y-4">
        {/* Search Bar - Full width on mobile */}
        <div className="w-full">
          <SearchBar
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        
        {/* Type Filter and Clear Button Row */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <FilterDropdown
            value={filters.type}
            onChange={handleTypeChange}
            className="w-full sm:w-auto"
          />
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="lg"
              onClick={onClearFilters}
              className="glass-card border-border bg-white/5 backdrop-blur-md text-theme-primary hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 px-6 w-full sm:w-auto"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="font-medium">Clear All</span>
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </Button>
          )}
        </div>

        {/* Date Range Filter - Responsive layout */}
        <div className="w-full">
          <DateRangeFilter
            dateFrom={filters.dateFrom}
            dateTo={filters.dateTo}
            onDateFromChange={handleDateFromChange}
            onDateToChange={handleDateToChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
} 