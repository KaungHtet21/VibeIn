import React from 'react'
import { Filter, ChevronDown } from 'lucide-react'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../atoms'
import { EVENT_TYPES } from '../../constants'
import type { EventType } from '../../types'
import { cn } from '../../utils'

interface FilterDropdownProps {
  value: EventType | 'All'
  onChange: (value: EventType | 'All') => void
  className?: string
}

const getTypeEmoji = (type: EventType | 'All') => {
  const emojis = {
    'All': '🌟',
    'Workshop': '🛠️',
    'Concert': '🎵',
    'Meetup': '🤝',
    'Conference': '🎯',
    'Seminar': '📚',
    'Festival': '🎉',
    'Tech Talk': '💻'
  }
  return emojis[type] || '📅'
}

export function FilterDropdown({ value, onChange, className }: FilterDropdownProps) {
  return (
    <div className={cn("w-full sm:w-auto", className)}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="glass-card w-full sm:w-[220px] border-border bg-white/5 backdrop-blur-md text-theme-primary hover:bg-white/10 transition-all duration-300 focus:ring-2 focus:ring-purple-400/30 h-12">
          <div className="flex items-center gap-3">
            <Filter className="h-4 w-4 text-purple-400 flex-shrink-0" />
            <span className="flex items-center gap-2 min-w-0">
              <span className="flex-shrink-0">{getTypeEmoji(value)}</span>
              <SelectValue placeholder="Event type" className="truncate" />
            </span>
          </div>
        </SelectTrigger>
        
        <SelectContent className="glass-card border-border bg-card/90 backdrop-blur-xl w-full sm:w-[220px]">
          <SelectItem 
            value="All" 
            className="text-theme-primary hover:bg-white/10 focus:bg-purple-500/20 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>{getTypeEmoji('All')}</span>
              <span className="font-medium">All Events</span>
            </div>
          </SelectItem>
          
          {EVENT_TYPES.map((type) => (
            <SelectItem 
              key={type} 
              value={type}
              className="text-theme-primary hover:bg-white/10 focus:bg-purple-500/20 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span>{getTypeEmoji(type)}</span>
                <span className="font-medium">{type}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 