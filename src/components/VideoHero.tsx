import { useEffect, useRef } from 'react'
import {
  Cpu,
  CloudArrowUp,
  Rocket,
  Wrench,
} from '@phosphor-icons/react'

const services = [
  {
    icon: Cpu,
    title: 'Embedded & device software',
    desc: 'Business logic and control software for payment terminals, parcel lockers and custom self-service devices.',
  },
  {
    icon: CloudArrowUp,
    title: 'Backend & integrations',
    desc: 'APIs, payment gateway integrations, ERP/WMS connections and remote monitoring dashboards.',
  },
  {
    icon: Rocket,
    title: 'Prototyping & MVPs',
    desc: 'Rapid prototypes and pilot projects delivered in weeks, not months.',
  },
  {
    icon: Wrench,
    title: 'Long-term support',
    desc: 'Ongoing feature development, maintenance and SLA-based support.',
  },
]

// Auto-scroll speed: pixels per frame at 60fps
const AUTO_SCROLL_SPEED = 12

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroLayerRef = useRef<HTMLDivElement>(null)
  const servicesLayerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  // Detect touch device (no auto-scroll on mobile — fights native iOS scrolling)
  const isTouchDevice = useRef(false)

  // Auto-scroll state
  const autoScrolling = useRef(false)
  const autoScrollDir = useRef<'down' | 'up'>('down')
  const autoScrollRaf = useRef<number>(0)
  const triggeredDown = useRef(false)
  const triggeredUp = useRef(false)
  const lastWheelTime = useRef(0)
  const lastProgress = useRef(0)
  const scrollStartTime = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    // Detect touch device
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    let rafId: number

    // Core scroll → video sync (direct DOM manipulation, no React re-renders)
    const syncVideo = () => {
      const rect = container.getBoundingClientRect()
      const scrollHeight = container.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      const p = Math.min(Math.max(scrolled / scrollHeight, 0), 1)

      if (video.duration && video.readyState >= 2) {
        video.currentTime = p * video.duration
      }

      // Direct DOM updates — avoids React re-render per frame
      const heroOp = Math.max(1 - p * 3.3, 0)
      const servicesOp = Math.min(Math.max((p - 0.4) / 0.3, 0), 1)
      const overlayOp = 0.15 + p * 0.1

      if (heroLayerRef.current) heroLayerRef.current.style.opacity = String(heroOp)
      if (servicesLayerRef.current) servicesLayerRef.current.style.opacity = String(servicesOp)
      if (overlayRef.current) overlayRef.current.style.background = `rgba(6,5,3,${overlayOp})`
      if (scrollIndicatorRef.current) scrollIndicatorRef.current.style.opacity = String(heroOp)

      return p
    }

    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const p = syncVideo()
        const prev = lastProgress.current
        lastProgress.current = p

        const scrollingUp = p < prev - 0.005
        const now = performance.now()

        // Track when user first enters the zone
        if (p > 0.02 && p < 0.98 && scrollStartTime.current === 0) {
          scrollStartTime.current = now
        }
        if (p <= 0.01 || p >= 0.99) {
          scrollStartTime.current = 0
        }

        // Require 300ms of scrolling + past 4% threshold before triggering
        const hasScrolledEnough = now - scrollStartTime.current > 300

        // Auto-scroll only on non-touch devices (fights native iOS scrolling)
        if (!isTouchDevice.current) {
          // Trigger auto-scroll DOWN
          if (p > 0.04 && !scrollingUp && !triggeredDown.current && !autoScrolling.current && hasScrolledEnough) {
            triggeredDown.current = true
            triggeredUp.current = false
            startAutoScroll('down')
          }

          // Trigger auto-scroll UP
          if (scrollingUp && p > 0.02 && p < 0.92 && !triggeredUp.current && !autoScrolling.current && hasScrolledEnough) {
            triggeredUp.current = true
            triggeredDown.current = false
            startAutoScroll('up')
          }
        }

        // Reset triggers at edges
        if (p <= 0.01) {
          triggeredDown.current = false
          triggeredUp.current = false
        }
        if (p >= 0.99) {
          triggeredDown.current = false
          triggeredUp.current = false
        }
      })
    }

    // Smooth auto-scroll using rAF — supports both directions
    const startAutoScroll = (dir: 'down' | 'up') => {
      cancelAnimationFrame(autoScrollRaf.current)
      autoScrolling.current = true
      autoScrollDir.current = dir
      let lastTime = performance.now()

      const tick = (now: number) => {
        const delta = now - lastTime
        lastTime = now

        const rect = container.getBoundingClientRect()
        const scrollHeight = container.offsetHeight - window.innerHeight
        const scrolled = -rect.top
        const currentP = scrolled / scrollHeight

        const speed = AUTO_SCROLL_SPEED * (delta / 16.67)

        if (dir === 'down') {
          if (currentP >= 0.99) {
            autoScrolling.current = false
            return
          }
          window.scrollBy(0, speed)
        } else {
          if (currentP <= 0.01) {
            autoScrolling.current = false
            return
          }
          window.scrollBy(0, -speed)
        }

        autoScrollRaf.current = requestAnimationFrame(tick)
      }

      autoScrollRaf.current = requestAnimationFrame(tick)
    }

    const handleWheel = () => {
      lastWheelTime.current = performance.now()
    }

    // Stop auto-scroll on explicit navigation (link clicks, refresh, hash change)
    const stopAutoScroll = () => {
      cancelAnimationFrame(autoScrollRaf.current)
      autoScrolling.current = false
      triggeredDown.current = false
      triggeredUp.current = false
      scrollStartTime.current = 0
    }

    const handleNavClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a, button')
      if (target && autoScrolling.current) {
        stopAutoScroll()
      }
    }

    // iOS Safari needs a brief play() to initialize video for seeking
    const initVideo = () => {
      video.currentTime = 0
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        video.play().then(() => {
          video.pause()
          video.currentTime = 0
        }).catch(() => {
          // Autoplay blocked — video will init on first scroll interaction
        })
      }
    }
    video.addEventListener('loadedmetadata', initVideo)

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchmove', handleWheel, { passive: true })
    document.addEventListener('click', handleNavClick, true)
    window.addEventListener('hashchange', stopAutoScroll)
    document.addEventListener('visibilitychange', stopAutoScroll)
    window.addEventListener('beforeunload', stopAutoScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchmove', handleWheel)
      document.removeEventListener('click', handleNavClick, true)
      window.removeEventListener('hashchange', stopAutoScroll)
      document.removeEventListener('visibilitychange', stopAutoScroll)
      window.removeEventListener('beforeunload', stopAutoScroll)
      cancelAnimationFrame(rafId)
      cancelAnimationFrame(autoScrollRaf.current)
    }
  }, [])

  return (
    <div ref={containerRef} className="video-scroll-container" id="home">
      <div className="video-sticky">
        {/* Video */}
        <video
          ref={videoRef}
          muted
          playsInline
          // @ts-ignore webkit-playsinline needed for older iOS Safari
          webkit-playsinline=""
          preload="auto"
          className="block"
        >
          <source src="/az_video.mp4" type="video/mp4" />
        </video>

        {/* Persistent dark overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(6,5,3,0.15)' }}
        />

        {/* Left-side gradient for hero text readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(6,5,3,0.7) 0%, rgba(6,5,3,0.4) 35%, transparent 65%)',
          }}
        />

        {/* Bottom gradient for seamless transition */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 60%, rgba(14,12,10,0.8) 90%, rgba(14,12,10,1) 100%)',
          }}
        />

        {/* ─── Layer 1: Hero text ─── */}
        <div
          ref={heroLayerRef}
          className="hero-text-layer absolute inset-0 flex items-center justify-start pointer-events-none"
          style={{ opacity: 1 }}
        >
          <div className="px-6 md:px-16 lg:px-24 max-w-3xl pointer-events-auto">
            <p className="text-xs tracking-[0.2em] uppercase text-white/70 mb-4 font-medium font-mono">
              Prague-based engineering team
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.05] mb-6">
              Software for terminals,{' '}
              <em className="italic" style={{ color: '#c8956c' }}>lockers</em>{' '}
              & self-service devices
            </h1>
            <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-[50ch]">
              We build and maintain the brains and business logic for your
              hardware — so you can launch new features faster without growing
              a full in-house dev team.
            </p>
          </div>
        </div>

        {/* ─── Layer 2: "What we do" glass overlay ─── */}
        <div
          ref={servicesLayerRef}
          className="hero-text-layer absolute inset-0 flex items-center justify-start pointer-events-none overflow-y-auto"
          style={{ opacity: 0 }}
        >
          <div className="w-full max-w-3xl px-4 md:px-16 lg:px-24 py-16 md:py-0 pointer-events-auto" id="services">
            <div className="glass-panel glass-panel-mobile p-5 md:p-12">
              <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-[var(--color-accent)] mb-2 md:mb-4 font-semibold font-mono">
                What we do
              </p>
              <h2 className="font-serif text-3xl md:text-6xl text-white tracking-tight leading-[1.05] mb-5 md:mb-10">
                Focused expertise for<br />specialized hardware
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-5">
                {services.map((s) => (
                  <div
                    key={s.title}
                    className="group rounded-xl bg-white/5 border border-white/10 p-3 md:p-6 hover:bg-white/8 transition-colors duration-300"
                  >
                    <s.icon size={18} className="md:hidden text-[var(--color-accent)] mb-2" weight="bold" />
                    <s.icon size={22} className="hidden md:block text-[var(--color-accent)] mb-3" weight="bold" />
                    <h3 className="text-xs md:text-sm font-semibold text-white mb-1 md:mb-1.5">
                      {s.title}
                    </h3>
                    <p className="text-[11px] md:text-[13px] text-white/70 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: 1 }}
        >
          <span className="text-[11px] text-white/40 tracking-[0.15em] uppercase font-mono">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </div>
  )
}
