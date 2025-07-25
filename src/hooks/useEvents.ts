import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { fetchEvents, fetchEventById, fetchInfiniteEvents } from '../api/events'
import type { EventFilter, PaginationParams } from '../types'

export const useEvents = (filters: EventFilter, pagination: PaginationParams) => {
  return useQuery({
    queryKey: ['events', filters, pagination],
    queryFn: () => fetchEvents(filters, pagination),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useInfiniteEvents = (filters: EventFilter, limit = 12) => {
  return useInfiniteQuery({
    queryKey: ['infinite-events', filters],
    queryFn: ({ pageParam = 0 }) => fetchInfiniteEvents(filters, pageParam, limit),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => fetchEventById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  })
} 