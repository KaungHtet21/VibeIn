import { Search, Sparkles } from 'lucide-react'
import { Input } from '../atoms'
import { cn } from '../../utils'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search for epic events... 🔍", 
  className 
}: SearchBarProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative group w-full">
        {/* Animated search icon */}
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-purple-400 group-focus-within:text-pink-400 transition-colors duration-300 z-10" />
        
        {/* Magic sparkle effect */}
        <Sparkles className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400 opacity-50 group-focus-within:opacity-100 transition-opacity duration-300 z-10" />
        
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="glass-card w-full pl-12 pr-12 py-4 text-theme-primary placeholder:text-theme-secondary border-border focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/30 bg-white/5 backdrop-blur-md transition-all duration-300 text-base sm:text-lg font-medium h-12 sm:h-14"
        />
        
        {/* Animated border gradient on focus */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
      </div>
    </div>
  )
} 