export interface Event {
  id: string
  title: string
  description: string
  location: string
  date: string
  time: string
  type: EventType
  organizer: string
  attendeeLimit?: number
  imageUrl?: string
  price?: number
  isOnline?: boolean
}

export interface EventListResponse {
  events: Event[]
  totalCount: number
  page: number
  totalPages: number
}

export type EventType = 
  | 'Workshop' 
  | 'Concert' 
  | 'Meetup' 
  | 'Conference' 
  | 'Seminar' 
  | 'Festival'
  | 'Tech Talk'

export interface EventFilter {
  search: string
  type: EventType | 'All'
  dateFrom?: string
  dateTo?: string
  location?: string
}

export interface PaginationParams {
  page: number
  limit: number
} 