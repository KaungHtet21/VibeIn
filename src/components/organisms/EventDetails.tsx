import { X, Calendar, MapPin, Users, User, DollarSign, Globe, Zap, Heart, Share, Sparkles } from 'lucide-react'
import { Button, Card, CardContent } from '../atoms'
import { useEvent } from '../../hooks'
import { formatDateTime } from '../../utils'
import { cn } from '../../utils'

interface EventDetailsProps {
  eventId: string
  onClose: () => void
  className?: string
}

const getEventTypeColor = (type: string) => {
  const colors = {
    'Workshop': 'from-blue-500 to-purple-500',
    'Concert': 'from-purple-500 to-pink-500',
    'Meetup': 'from-green-500 to-emerald-500',
    'Conference': 'from-red-500 to-orange-500',
    'Seminar': 'from-yellow-500 to-orange-500',
    'Festival': 'from-pink-500 to-rose-500',
    'Tech Talk': 'from-indigo-500 to-purple-500'
  }
  return colors[type as keyof typeof colors] || 'from-gray-500 to-gray-600'
}

const getEventEmoji = (type: string) => {
  const emojis = {
    'Workshop': '🛠️',
    'Concert': '🎵',
    'Meetup': '🤝',
    'Conference': '🎯',
    'Seminar': '📚',
    'Festival': '🎉',
    'Tech Talk': '💻'
  }
  return emojis[type as keyof typeof emojis] || '📅'
}

export function EventDetails({ eventId, onClose, className }: EventDetailsProps) {
  const { data: event, isLoading, error } = useEvent(eventId)

  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center py-20", className)}>
        <div className="text-center glass-card rounded-3xl p-12">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-500 rounded-full animate-spin mx-auto" style={{animationDelay: '0.1s', animationDirection: 'reverse'}}></div>
          </div>
          <h3 className="text-xl font-bold text-theme-primary mb-2">✨ Loading Event Details</h3>
          <p className="text-theme-secondary">Getting all the exciting details...</p>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className={cn("text-center py-20", className)}>
        <div className="glass-card rounded-3xl p-12 max-w-md mx-auto">
          <div className="text-6xl mb-4">😵</div>
          <h3 className="text-xl font-bold text-theme-primary mb-4">Oops! Event not found</h3>
          <p className="text-theme-secondary mb-6">We couldn't load the event details.</p>
          <Button onClick={onClose} className="btn-glow">
            <Zap className="h-4 w-4 mr-2" />
            Go Back to Events
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("max-w-5xl mx-auto", className)}>
      <Card className="glass-card border-border overflow-hidden relative">
        {/* Close button with style */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-6 top-6 z-20 glass-card w-12 h-12 rounded-full backdrop-blur-md hover:bg-white/20 transition-all duration-300"
        >
          <X className="h-5 w-5 text-theme-primary" />
        </Button>
        
        {/* Hero section with image */}
        {event.imageUrl && (
          <div className="relative aspect-[21/9] overflow-hidden">
            <img 
              src={event.imageUrl} 
              alt={event.title}
              className="h-full w-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            {/* Floating elements */}
            <div className="absolute top-6 left-6">
              <div className={cn(
                "flex items-center gap-3 rounded-full px-4 py-2 text-white font-bold bg-gradient-to-r backdrop-blur-md",
                getEventTypeColor(event.type)
              )}>
                <span className="text-xl">{getEventEmoji(event.type)}</span>
                <span>{event.type}</span>
              </div>
            </div>
            
            {event.price !== undefined && (
              <div className="absolute top-6 right-20 glass-card rounded-full px-4 py-2 backdrop-blur-md">
                <span className="text-lg font-bold text-white">
                  {event.price === 0 ? '🆓 FREE' : `💰 $${event.price}`}
                </span>
              </div>
            )}
            
            {/* Title overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                {event.title}
              </h1>
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  <span className="font-semibold">{formatDateTime(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-cyan-400" />
                  <span className="font-semibold">{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <CardContent className="p-8 md:p-12 space-y-8">
          {/* Event details grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <User className="h-5 w-5 text-purple-400" />
                  <span className="text-theme-secondary font-medium">Organizer</span>
                </div>
                <p className="text-theme-primary font-bold text-lg">{event.organizer}</p>
              </div>
              
              {event.attendeeLimit && (
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="h-5 w-5 text-green-400" />
                    <span className="text-theme-secondary font-medium">Capacity</span>
                  </div>
                  <p className="text-theme-primary font-bold text-lg">{event.attendeeLimit} people</p>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              {event.price !== undefined && (
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="h-5 w-5 text-yellow-400" />
                    <span className="text-theme-secondary font-medium">Price</span>
                  </div>
                  <p className="text-theme-primary font-bold text-lg">
                    {event.price === 0 ? 'Free Event! 🎉' : `$${event.price}`}
                  </p>
                </div>
              )}
              
              {event.isOnline && (
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="h-5 w-5 text-blue-400" />
                    <span className="text-theme-secondary font-medium">Format</span>
                  </div>
                  <p className="text-theme-primary font-bold text-lg">Online Event 💻</p>
                </div>
              )}
            </div>
            
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-5 w-5 text-pink-400" />
                <span className="text-theme-secondary font-medium">Quick Actions</span>
              </div>
              <div className="space-y-3">
                <Button 
                  className="w-full btn-glow text-white font-bold"
                  size="lg"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Save Event
                </Button>
                <Button 
                  variant="outline"
                  className="w-full glass-card border-border bg-white/5 text-theme-primary hover:bg-white/10 hover:text-theme-primary"
                  size="lg"
                >
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Description section */}
          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-theme-primary">About This Event</h2>
              <div className="w-2 h-8 bg-gradient-to-b from-pink-400 to-cyan-400 rounded-full"></div>
            </div>
            <p className="text-theme-secondary leading-relaxed text-lg">
              {event.description}
            </p>
          </div>

          {/* CTA Section */}
          <div className="glass-card rounded-3xl p-8 text-center bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Ready to Join the Fun? 🎉
            </h3>
            <p className="text-theme-secondary mb-6 text-lg">
              Don't miss out on this amazing experience!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-glow px-8 py-3 text-lg font-bold">
                <Zap className="h-5 w-5 mr-2" />
                Register Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="glass-card border-border bg-white/5 text-theme-primary hover:bg-white/10 px-8 py-3 text-lg font-bold"
              >
                <Heart className="h-5 w-5 mr-2" />
                Add to Wishlist
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 