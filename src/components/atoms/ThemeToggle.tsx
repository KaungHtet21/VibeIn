import { Sun, Moon, Sparkles } from 'lucide-react'
import { useTheme } from '../../hooks'
import { cn } from '../../utils'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { toggle, isDark } = useTheme()

  return (
    <button
      onClick={toggle}
      className={cn(
        "relative group glass-card w-16 h-8 rounded-full border border-white/20 transition-all duration-500 hover:scale-105",
        "focus:outline-none focus:ring-2 focus:ring-purple-400/50",
        isDark ? "bg-slate-800/50" : "bg-white/20",
        className
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {/* Toggle slider */}
      <div
        className={cn(
          "absolute top-1 w-6 h-6 rounded-full transition-all duration-500 ease-in-out transform",
          "shadow-lg backdrop-blur-md flex items-center justify-center",
          isDark 
            ? "translate-x-8 bg-gradient-to-r from-purple-500 to-pink-500" 
            : "translate-x-1 bg-gradient-to-r from-yellow-400 to-orange-500"
        )}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-white" />
        ) : (
          <Sun className="h-3 w-3 text-white" />
        )}
      </div>

      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
        <Sun 
          className={cn(
            "h-3 w-3 transition-all duration-300",
            isDark ? "text-white/30" : "text-yellow-400"
          )} 
        />
        <Moon 
          className={cn(
            "h-3 w-3 transition-all duration-300",
            isDark ? "text-purple-400" : "text-white/30"
          )} 
        />
      </div>

      {/* Sparkle effects on hover */}
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
      </div>
      <div className="absolute -bottom-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{animationDelay: '0.2s'}}>
        <Sparkles className="h-3 w-3 text-pink-400 animate-pulse" />
      </div>
    </button>
  )
} 