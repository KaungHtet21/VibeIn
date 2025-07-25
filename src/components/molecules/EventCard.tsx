import { Calendar, MapPin, Clock, Users, Star, Heart, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../atoms'
import { formatDate, formatTime } from '../../utils'
import type { Event } from '../../types'
import { cn } from '../../utils'

interface EventCardProps {
  event: Event
  onClick?: () => void
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

export function EventCard({ event, onClick, className }: EventCardProps) {
  const shortDescription = event.description.length > 120 
    ? event.description.substring(0, 120) + '...' 
    : event.description

  return (
    <Card 
      className={cn(
        "group glass-card hover-lift cursor-pointer transition-all duration-500 border-border overflow-hidden relative",
        className
      )}
      onClick={onClick}
    >
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Image with overlay */}
      {event.imageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-t-xl">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Floating price tag */}
          {event.price !== undefined && (
            <div className="absolute top-4 right-4 glass-card rounded-full px-3 py-1 backdrop-blur-md">
              <span className="text-sm font-bold text-white">
                {event.price === 0 ? '🆓 FREE' : `💰 $${event.price}`}
              </span>
            </div>
          )}
          
          {/* Floating type badge */}
          <div className="absolute top-4 left-4">
            <div className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1 text-white font-semibold text-sm bg-gradient-to-r",
              getEventTypeColor(event.type)
            )}>
              <span>{getEventEmoji(event.type)}</span>
              <span>{event.type}</span>
            </div>
          </div>
        </div>
      )}
      
      <CardHeader className="pb-3 relative z-10">
        {!event.imageUrl && (
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className={cn(
              "flex items-center gap-2 rounded-full px-3 py-1 text-white font-semibold text-sm bg-gradient-to-r",
              getEventTypeColor(event.type)
            )}>
              <span>{getEventEmoji(event.type)}</span>
              <span>{event.type}</span>
            </div>
            
            {event.price !== undefined && (
              <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {event.price === 0 ? '🆓 FREE' : `💰 $${event.price}`}
              </span>
            )}
          </div>
        )}
        
        <CardTitle className="text-xl font-bold leading-snug line-clamp-2 text-theme-primary group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
          {event.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 relative z-10">
        <p className="text-theme-secondary line-clamp-3 leading-relaxed">
          {shortDescription}
        </p>
        
        {/* Event details with neon icons */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-theme-primary">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-400" />
              <span className="font-medium">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-pink-400" />
              <span className="font-medium">{formatTime(event.date)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-theme-primary">
            <MapPin className="h-4 w-4 text-cyan-400 flex-shrink-0" />
            <span className="line-clamp-1 font-medium">{event.location}</span>
          </div>
          
          {event.attendeeLimit && (
            <div className="flex items-center gap-2 text-sm text-theme-primary">
              <Users className="h-4 w-4 text-green-400" />
              <span className="font-medium">Max {event.attendeeLimit} attendees</span>
            </div>
          )}
        </div>

        {/* Bottom action bar */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-theme-secondary">
            <Star className="h-4 w-4" />
            <span className="text-sm">by {event.organizer}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 group">
              <Heart className="h-4 w-4 text-theme-secondary group-hover:text-pink-400 transition-colors duration-200" />
            </button>
            <div className="btn-glow px-4 py-2 rounded-full text-white font-semibold text-sm flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Join Event</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 