import type { EventType } from '../types'

export const EVENT_TYPES: EventType[] = [
  'Workshop',
  'Concert', 
  'Meetup',
  'Conference',
  'Seminar',
  'Festival',
  'Tech Talk'
]

// Updated for infinite scrolling
export const EVENTS_PER_PAGE = 12 // Increased from 6 for better infinite scroll experience
export const EVENTS_PER_LOAD = 12 // Events loaded per infinite scroll batch
export const INFINITE_SCROLL_THRESHOLD = 1000 // Pixels from bottom to trigger auto-load

export const API_BASE_URL = 'https://app.ticketmaster.com/discovery/v2'

// Animation delays for staggered loading
export const ANIMATION_DELAY_STEP = 100 // ms between each card animation
export const MAX_ANIMATION_DELAY = 1200 // Maximum delay for the last card in a batch 