"use client"

import React from "react"

import { useEffect, useRef, useCallback } from "react"

/**
 * Hook para debounce - optimiza eventos frecuentes
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Hook para throttle - limita ejecuciones
 */
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const lastRun = useRef(Date.now())

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastRun.current >= delay) {
        callback(...args)
        lastRun.current = now
      }
    },
    [callback, delay],
  )
}

/**
 * Hook para lazy loading de componentes
 */
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {},
): boolean {
  const [isIntersecting, setIsIntersecting] = React.useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return isIntersecting
}

/**
 * Optimización de localStorage para evitar bloqueos
 */
export const optimizedStorage = {
  setItem: (key: string, value: any) => {
    try {
      requestIdleCallback(() => {
        localStorage.setItem(key, JSON.stringify(value))
      })
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  },

  getItem: (key: string) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error("Error reading from localStorage:", error)
      return null
    }
  },

  removeItem: (key: string) => {
    try {
      requestIdleCallback(() => {
        localStorage.removeItem(key)
      })
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  },
}

/**
 * Memoización de cálculos costosos
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

/**
 * Pool de objetos para reducir garbage collection
 */
export class ObjectPool<T> {
  private pool: T[] = []
  private factory: () => T
  private reset: (obj: T) => void

  constructor(factory: () => T, reset: (obj: T) => void, initialSize = 10) {
    this.factory = factory
    this.reset = reset

    for (let i = 0; i < initialSize; i++) {
      this.pool.push(factory())
    }
  }

  acquire(): T {
    return this.pool.pop() || this.factory()
  }

  release(obj: T): void {
    this.reset(obj)
    this.pool.push(obj)
  }
}

/**
 * Batch de actualizaciones para reducir re-renders
 */
export function batchUpdates<T>(updates: Array<() => void>, callback?: () => void): void {
  requestAnimationFrame(() => {
    updates.forEach((update) => update())
    callback?.()
  })
}
