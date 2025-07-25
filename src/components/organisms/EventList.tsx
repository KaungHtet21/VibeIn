import React, { useEffect } from 'react'
import { Loader2, AlertCircle, Sparkles, TrendingUp, ArrowDown } from 'lucide-react'
import { EventCard } from '../molecules'
import { Button } from '../atoms'
import { useInfiniteEvents } from '../../hooks'
import type { EventFilter, Event } from '../../types'
import { cn } from '../../utils'

interface EventListProps {
  filters: EventFilter
  onEventClick: (eventId: string) => void
  className?: string
}

export function EventList({ filters, onEventClick, className }: EventListProps) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteEvents(filters)

  // Auto-scroll to load more when near bottom (optional)
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  // Calculate total events loaded
  const totalEvents = data?.pages.reduce((acc: number, page: any) => acc + page.events.length, 0) || 0
  const totalCount = data?.pages[0]?.totalCount || 0

  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        {/* Loading skeleton */}
        <div className="glass-card p-8 text-center border-border bg-white/5 backdrop-blur-md">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-purple-400" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <p className="text-theme-primary font-medium text-lg">🔍 Searching for epic events...</p>
              <p className="text-theme-secondary text-sm">Hold tight, magic is happening! ✨</p>
            </div>
          </div>
        </div>

        {/* Loading grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card p-6 border-border bg-white/5 backdrop-blur-md animate-pulse">
              <div className="aspect-video bg-white/10 rounded-lg mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
                <div className="h-3 bg-white/10 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="glass-card p-8 text-center border-red-500/20 bg-red-500/5 backdrop-blur-md">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <AlertCircle className="h-12 w-12 text-red-400" />
              <div className="absolute inset-0 rounded-full bg-red-400/20 animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <p className="text-red-400 font-medium text-lg">⚠️ Oops! Something went wrong</p>
              <p className="text-theme-secondary text-sm">
                {error?.message || 'Failed to load events. Please try again later.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const allEvents: Event[] = data?.pages.flatMap((page: any) => page.events) || []

  if (allEvents.length === 0) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="glass-card p-12 text-center border-border bg-white/5 backdrop-blur-md">
          <div className="flex flex-col items-center gap-6">
            <div className="text-8xl">🎭</div>
            <div className="space-y-3">
              <h3 className="text-theme-primary font-bold text-2xl">No Events Found</h3>
              <p className="text-theme-secondary text-lg max-w-md">
                No events match your current filters. Try adjusting your search criteria or check back later for new events! 🌟
              </p>
            </div>
            <div className="flex items-center gap-2 text-cyan-400 text-sm">
              <Sparkles className="h-4 w-4" />
              <span>New events are added regularly</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* Results summary */}
      <div className="glass-card p-6 border-border bg-white/5 backdrop-blur-md hover-lift">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <span className="text-theme-primary font-medium">
              Showing {totalEvents} of {totalCount} events
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-theme-secondary text-sm">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>
              {hasNextPage 
                ? `${totalCount - totalEvents} more events available` 
                : 'All events loaded! 🎉'
              }
            </span>
          </div>
        </div>
      </div>

      {/* Event grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allEvents.map((event: Event, index: number) => (
          <div
            key={event.id}
            className="animate-fadeInUp"
            style={{
              animationDelay: `${(index % 12) * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <EventCard
              event={event}
              onClick={() => onEventClick(event.id)}
            />
          </div>
        ))}
      </div>

      {/* Load more section */}
      {hasNextPage && (
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="glass-card p-6 border-border bg-white/5 backdrop-blur-md hover-lift transition-all duration-300">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-theme-secondary text-sm">
                <ArrowDown className="h-4 w-4 animate-bounce text-cyan-400" />
                <span>Scroll down or click to load more events</span>
              </div>
              
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="btn-glow bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium px-8 py-3 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isFetchingNextPage ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading amazing events...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Load More Events</span>
                    <Sparkles className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Loading indicator for auto-scroll */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-8">
          <div className="glass-card p-4 border-border bg-white/5 backdrop-blur-md">
            <div className="flex items-center gap-3 text-theme-primary">
              <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
              <span className="font-medium">Loading more events...</span>
              <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 