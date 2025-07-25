import { useState, useMemo } from 'react'
import type { EventFilter, EventType } from '../types'

export const useEventFilters = () => {
  const [filters, setFilters] = useState<EventFilter>({
    search: '',
    type: 'All',
    dateFrom: '',
    dateTo: '',
  })

  const updateFilter = (key: keyof EventFilter, value: string | EventType) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      type: 'All',
      dateFrom: '',
      dateTo: '',
    })
  }

  const hasActiveFilters = useMemo(() => {
    return filters.search !== '' || 
           filters.type !== 'All' || 
           filters.dateFrom !== '' || 
           filters.dateTo !== ''
  }, [filters])

  return {
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters
  }
} 