import { useState } from 'react'
import { EventFilters, EventList, EventDetails } from '../components/organisms'
import { ThemeToggle } from '../components/atoms'
import { useEventFilters } from '../hooks'
import { Sparkles, Zap, Calendar, TrendingUp } from 'lucide-react'

export function HomePage() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const { filters, updateFilter, clearFilters, hasActiveFilters } = useEventFilters()

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId)
  }

  const handleCloseDetails = () => {
    setSelectedEventId(null)
  }

  const handleFiltersChange = (newFilters: typeof filters) => {
    Object.entries(newFilters).forEach(([key, value]) => {
      updateFilter(key as keyof typeof filters, value)
    })
  }

  // Show event details page when an event is selected
  if (selectedEventId) {
    return (
      <div className="min-h-screen cyber-grid">
        <div className="container mx-auto px-4 py-8">
          <EventDetails
            eventId={selectedEventId}
            onClose={handleCloseDetails}
          />
        </div>
      </div>
    )
  }

  // Show home page
  return (
    <div className="min-h-screen cyber-grid">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 floating-bg-1 rounded-full blur-3xl float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 floating-bg-2 rounded-full blur-3xl float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 floating-bg-3 rounded-full blur-3xl float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-border bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Logo and title */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block">
                {/* Background glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 rounded-3xl blur-xl"></div>
                
                {/* Main logo */}
                <h1 className="relative text-5xl lg:text-7xl font-black mb-4 tracking-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                    Vibe
                  </span>
                  <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
                    In
                  </span>
                  
                  {/* Floating sparkles */}
                  <div className="absolute -top-2 -right-2 opacity-80">
                    <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
                  </div>
                  <div className="absolute top-1/2 -left-3 opacity-60">
                    <Zap className="w-5 h-5 text-pink-400 animate-bounce" style={{animationDelay: '0.5s'}} />
                  </div>
                </h1>
              </div>
              
              <p className="text-xl text-theme-secondary max-w-2xl">
                Discover amazing events and connect with your community 🌟
              </p>
            </div>

            {/* Theme toggle */}
            <div className="flex justify-center lg:justify-end">
              <ThemeToggle />
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="glass-card rounded-2xl p-6 hover-lift">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                  <Calendar className="h-8 w-8 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-theme-primary">120+</p>
                  <p className="text-theme-secondary text-sm">Events Available</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 hover-lift">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                  <TrendingUp className="h-8 w-8 text-cyan-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-theme-primary">Live</p>
                  <p className="text-theme-secondary text-sm">Real-time Updates</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 hover-lift">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                  <Zap className="h-8 w-8 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-theme-primary">Fast</p>
                  <p className="text-theme-secondary text-sm">Instant Search</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative container mx-auto px-4 py-12">
        {/* Filters section */}
        <section className="mb-12">
          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold gradient-text">Find Your Perfect Event</h2>
            </div>
            
            <EventFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </section>

        {/* Events section */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="h-6 w-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-theme-primary">Discover Events</h2>
          </div>
          
          <EventList
            filters={filters}
            onEventClick={handleEventClick}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border bg-black/20 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-theme-secondary">
              Made with 💜 for the community • VibeIn {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 