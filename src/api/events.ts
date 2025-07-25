import type { Event, EventListResponse, EventFilter, PaginationParams, EventType } from '../types'

// Generate comprehensive mock data for development
const generateMockEvents = (): Event[] => {
  const eventTitles = [
    'React Advanced Workshop', 'Vue.js Masterclass', 'Angular Deep Dive', 'Node.js Performance Tuning',
    'Summer Music Festival', 'Jazz Night Downtown', 'Rock Concert Extravaganza', 'Classical Symphony Evening',
    'JavaScript Meetup', 'Python Developer Gathering', 'Data Science Workshop', 'AI/ML Conference',
    'UI/UX Design Conference', 'Digital Marketing Summit', 'Startup Pitch Competition', 'Tech Innovation Forum',
    'Photography Workshop', 'Creative Writing Seminar', 'Digital Art Exhibition', 'Film Screening Event',
    'Yoga & Wellness Retreat', 'Running Club Meetup', 'Cycling Adventure Tour', 'Hiking Group Expedition',
    'Cooking Masterclass', 'Wine Tasting Evening', 'Food Truck Festival', 'International Food Fair',
    'Career Development Workshop', 'Networking Breakfast', 'Leadership Seminar', 'Professional Growth Summit',
    'Gaming Tournament', 'Board Game Night', 'Trivia Competition', 'Escape Room Challenge',
    'Art Gallery Opening', 'Museum Special Exhibition', 'Cultural Heritage Festival', 'Music Production Workshop',
    'Blockchain Summit', 'Cryptocurrency Conference', 'Fintech Innovation Day', 'Investment Strategy Seminar',
    'Environmental Action Day', 'Sustainability Workshop', 'Green Tech Conference', 'Climate Change Forum',
    'Mental Health Awareness', 'Meditation Workshop', 'Mindfulness Retreat', 'Wellness Conference',
    'Education Technology Summit', 'Online Learning Conference', 'Teaching Innovation Workshop', 'Student Career Fair'
  ]

  const locations = [
    'Tech Hub, San Francisco, CA', 'Convention Center, San Jose, CA', 'Golden Gate Park, San Francisco, CA',
    'Startup Commons, Palo Alto, CA', 'Innovation Hub, Mountain View, CA', 'Symphony Hall, San Francisco, CA',
    'Community Center, Oakland, CA', 'Conference Hall, Berkeley, CA', 'Event Space, Redwood City, CA',
    'Cultural Center, Santa Clara, CA', 'University Campus, Stanford, CA', 'Downtown Plaza, San Francisco, CA',
    'Waterfront Park, Alameda, CA', 'Business District, Sunnyvale, CA', 'Arts Quarter, San Francisco, CA',
    'Sports Complex, San Jose, CA', 'Marina District, San Francisco, CA', 'Tech Campus, Cupertino, CA'
  ]

  const eventTypes = ['Workshop', 'Concert', 'Meetup', 'Conference', 'Seminar', 'Festival', 'Tech Talk']
  const organizers = [
    'Tech Community', 'Music Collective', 'Developer Guild', 'Innovation Labs', 'Creative Studios',
    'Professional Network', 'Event Organizers', 'Local Community', 'Industry Leaders', 'Art Society'
  ]

  const imageUrls = [
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551818255-e6e10975cd17?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=400&fit=crop'
  ]

  const events: Event[] = []
  const startDate = new Date('2024-08-01')

  for (let i = 0; i < 120; i++) {
    // Generate random date within next 6 months
    const randomDays = Math.floor(Math.random() * 180)
    const eventDate = new Date(startDate)
    eventDate.setDate(eventDate.getDate() + randomDays)
    
    // Random hour between 9 AM and 9 PM
    const randomHour = Math.floor(Math.random() * 12) + 9
    eventDate.setHours(randomHour, 0, 0, 0)

    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)] as EventType
    const baseTitle = eventTitles[Math.floor(Math.random() * eventTitles.length)]
    const title = i > 0 && Math.random() > 0.7 ? `${baseTitle} ${Math.floor(Math.random() * 5) + 2024}` : baseTitle

    events.push({
      id: (i + 1).toString(),
      title,
      description: generateEventDescription(eventType),
      location: locations[Math.floor(Math.random() * locations.length)],
      date: eventDate.toISOString(),
      time: eventDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      }),
      type: eventType,
      organizer: organizers[Math.floor(Math.random() * organizers.length)],
      attendeeLimit: getAttendeeLimit(eventType),
      price: getEventPrice(eventType),
      imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)]
    })
  }

  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

const generateEventDescription = (type: string): string => {
  const descriptions = {
    Workshop: `Join this hands-on workshop where you'll learn practical skills and techniques. Perfect for both beginners and experienced practitioners looking to expand their knowledge.`,
    Concert: `Experience an unforgettable musical performance featuring talented artists. Enjoy great music, atmosphere, and connect with fellow music lovers.`,
    Meetup: `Connect with like-minded individuals in a casual, friendly environment. Great opportunity to network, share ideas, and learn from the community.`,
    Conference: `Industry-leading conference featuring expert speakers, cutting-edge insights, and valuable networking opportunities. Don't miss this premium event.`,
    Seminar: `Educational seminar designed to provide deep insights and actionable knowledge. Learn from industry experts and thought leaders.`,
    Festival: `Celebrate culture, community, and creativity at this vibrant festival. Featuring performances, food, art, and entertainment for all ages.`,
    'Tech Talk': `Technical presentation covering the latest trends, tools, and technologies. Perfect for developers and tech enthusiasts.`
  }
  
  return descriptions[type as keyof typeof descriptions] || 'Join us for this exciting event!'
}

const getAttendeeLimit = (type: string): number => {
  const limits = {
    Workshop: Math.floor(Math.random() * 50) + 20,
    Concert: Math.floor(Math.random() * 1000) + 200,
    Meetup: Math.floor(Math.random() * 100) + 30,
    Conference: Math.floor(Math.random() * 800) + 200,
    Seminar: Math.floor(Math.random() * 150) + 50,
    Festival: Math.floor(Math.random() * 5000) + 1000,
    'Tech Talk': Math.floor(Math.random() * 200) + 50
  }
  
  return limits[type as keyof typeof limits] || 100
}

const getEventPrice = (type: string): number => {
  const priceRanges = {
    Workshop: [29, 149],
    Concert: [25, 199],
    Meetup: [0, 25],
    Conference: [199, 599],
    Seminar: [49, 299],
    Festival: [89, 299],
    'Tech Talk': [0, 49]
  }
  
  const range = priceRanges[type as keyof typeof priceRanges] || [0, 50]
  const price = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0]
  
  // 30% chance of free events
  return Math.random() < 0.3 ? 0 : price
}

// Generate the mock events
const mockEvents: Event[] = generateMockEvents()

// Updated interface for infinite scrolling
export interface InfiniteEventListResponse {
  events: Event[]
  nextCursor?: number
  hasMore: boolean
  totalCount: number
}

export const fetchEvents = async (
  filters: EventFilter,
  pagination: PaginationParams
): Promise<EventListResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  let filteredEvents = [...mockEvents]
  
  // Apply filters
  filteredEvents = applyEventFilters(filteredEvents, filters)
  
  // Pagination
  const startIndex = (pagination.page - 1) * pagination.limit
  const endIndex = startIndex + pagination.limit
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex)
  
  return {
    events: paginatedEvents,
    totalCount: filteredEvents.length,
    page: pagination.page,
    totalPages: Math.ceil(filteredEvents.length / pagination.limit)
  }
}

// New infinite scroll API
export const fetchInfiniteEvents = async (
  filters: EventFilter,
  cursor = 0,
  limit = 12
): Promise<InfiniteEventListResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500))
  
  let filteredEvents = [...mockEvents]
  
  // Apply filters
  filteredEvents = applyEventFilters(filteredEvents, filters)
  
  // Cursor-based pagination
  const startIndex = cursor
  const endIndex = startIndex + limit
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex)
  const hasMore = endIndex < filteredEvents.length
  
  return {
    events: paginatedEvents,
    nextCursor: hasMore ? endIndex : undefined,
    hasMore,
    totalCount: filteredEvents.length
  }
}

const applyEventFilters = (events: Event[], filters: EventFilter): Event[] => {
  let filteredEvents = [...events]
  
  // Filter by search term
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredEvents = filteredEvents.filter(event =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm) ||
      event.organizer.toLowerCase().includes(searchTerm)
    )
  }
  
  // Filter by event type
  if (filters.type && filters.type !== 'All') {
    filteredEvents = filteredEvents.filter(event => event.type === filters.type)
  }
  
  // Filter by date range
  if (filters.dateFrom) {
    filteredEvents = filteredEvents.filter(event => 
      new Date(event.date) >= new Date(filters.dateFrom!)
    )
  }
  
  if (filters.dateTo) {
    filteredEvents = filteredEvents.filter(event => 
      new Date(event.date) <= new Date(filters.dateTo!)
    )
  }
  
  // Sort by date
  return filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}

export const fetchEventById = async (id: string): Promise<Event | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return mockEvents.find(event => event.id === id) || null
} 