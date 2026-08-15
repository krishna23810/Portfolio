import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'

// CounterAPI Proxy & Direct Endpoints
const PROXY_BASE_URL = '/api/counter'
const DIRECT_BASE_URL = import.meta.env.VITE_COUNTER_API_URL
const API_TOKEN = import.meta.env.VITE_COUNTER_API_TOKEN

export default function VisitorCounter({ className = '' }) {
  const [visitorCount, setVisitorCount] = useState(null)
  const [displayCount, setDisplayCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const sessionKey = 'ka_portfolio_session_counted'
    const cacheKey = 'ka_portfolio_live_visitor_cache'

    async function fetchLiveCount() {
      const hasCountedInSession = sessionStorage.getItem(sessionKey)
      const path = hasCountedInSession ? '' : '/up'

      // Helper function to extract count from various API response shapes
      const parseCount = (json) => {
        if (!json) return null
        if (json.data && typeof json.data.up_count === 'number') return json.data.up_count
        if (typeof json.up_count === 'number') return json.up_count
        if (typeof json.count === 'number') return json.count
        if (typeof json.value === 'number') return json.value
        if (typeof json.up === 'number') return json.up
        if (typeof json.data === 'number') return json.data
        if (json.data && typeof json.data.value === 'number') return json.data.value
        if (json.data && typeof json.data.count === 'number') return json.data.count
        if (json.data && typeof json.data.up === 'number') return json.data.up
        if (json.data && typeof json.data.total === 'number') return json.data.total
        return null
      }

      // 1. Try internal proxy first (/api/counter)
      try {
        const response = await fetch(`${PROXY_BASE_URL}${path}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`,
          },
        })

        if (response.ok) {
          const json = await response.json()
          const count = parseCount(json)
          if (typeof count === 'number') {
            if (isMounted) {
              setVisitorCount(count)
              setIsLoading(false)
              sessionStorage.setItem(sessionKey, 'true')
              localStorage.setItem(cacheKey, count.toString())
            }
            return
          }
        }
      } catch (proxyErr) {
        console.warn('[CounterAPI] Proxy attempt note:', proxyErr.message)
      }

      // 2. Fallback to direct API URL
      try {
        const response = await fetch(`${DIRECT_BASE_URL}${path}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`,
          },
        })

        if (response.ok) {
          const json = await response.json()
          const count = parseCount(json)
          if (typeof count === 'number') {
            if (isMounted) {
              setVisitorCount(count)
              setIsLoading(false)
              sessionStorage.setItem(sessionKey, 'true')
              localStorage.setItem(cacheKey, count.toString())
            }
            return
          }
        }
      } catch (directErr) {
        console.warn('[CounterAPI] Direct attempt note:', directErr.message)
      }

      // 3. Fallback to cached count if network fails
      const cached = localStorage.getItem(cacheKey)
      if (isMounted) {
        const fallback = cached && !isNaN(parseInt(cached, 10)) ? parseInt(cached, 10) : 1
        setVisitorCount(fallback)
        setIsLoading(false)
      }
    }

    fetchLiveCount()

    return () => {
      isMounted = false
    }
  }, [])

  // Rolling counter number animation
  useEffect(() => {
    if (visitorCount === null) return

    let start = Math.max(0, visitorCount - Math.min(20, visitorCount))
    const duration = 700
    const steps = Math.max(1, visitorCount - start)
    const stepTime = Math.max(20, Math.floor(duration / steps))

    const timer = setInterval(() => {
      start += 1
      setDisplayCount(start)
      if (start >= visitorCount) {
        setDisplayCount(visitorCount)
        clearInterval(timer)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [visitorCount])

  return (
    <div
      className={`inline-flex items-center gap-3 px-3.5 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 backdrop-blur-md font-mono text-xs text-gray-300 shadow-[0_0_15px_rgba(16,185,129,0.08)] transition-all hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] ${className}`}
      title="Live portfolio visitor tracker"
    >
      {/* Live Server Indicator */}
      {/* <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider hidden sm:inline">
          LIVE
        </span>
      </div> */}

      <div className="h-3 w-[1px] bg-emerald-500/20 hidden sm:block" />

      {/* Label */}
      <div className="flex items-center gap-1.5 text-gray-400">
        <Eye className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-[11px] font-medium text-gray-400">VISITORS:</span>
      </div>

      {/* Real Live Digit Display */}
      <div className="flex items-center px-2.5 py-0.5 rounded bg-black/60 border border-emerald-500/30 font-bold text-emerald-400 tracking-wider text-xs shadow-inner min-w-[3rem] justify-center">
        {isLoading && visitorCount === null ? (
          <span className="animate-pulse text-emerald-500/60 font-sans tracking-widest text-[10px]">...</span>
        ) : (
          <span>{displayCount.toLocaleString('en-US')}</span>
        )}
      </div>
    </div>
  )
}
