import { useEffect, useRef, useState } from 'react'
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

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    let rafId: number

    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect()
        const scrollHeight = container.offsetHeight - window.innerHeight
        const scrolled = -rect.top
        const p = Math.min(Math.max(scrolled / scrollHeight, 0), 1)

        setProgress(p)

        if (video.duration && video.readyState >= 2) {
          video.currentTime = p * video.duration
        }
      })
    }

    video.addEventListener('loadedmetadata', () => {
      video.currentTime = 0
    })

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  const heroOpacity = Math.max(1 - progress * 3.3, 0)
  const servicesOpacity = Math.min(Math.max((progress - 0.4) / 0.3, 0), 1)
  const overlayOpacity = 0.15 + progress * 0.1

  return (
    <div ref={containerRef} className="video-scroll-container" id="home">
      <div className="video-sticky">
        {/* Video */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="block"
        >
          <source src="/az_video.mp4" type="video/mp4" />
        </video>

        {/* Persistent dark overlay — always visible, intensifies on scroll */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `rgba(6,5,3,${overlayOpacity})` }}
        />

        {/* Left-side gradient for hero text readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(6,5,3,0.7) 0%, rgba(6,5,3,0.4) 35%, transparent 65%)',
          }}
        />

        {/* Bottom gradient for seamless transition to dark sections */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 60%, rgba(14,12,10,0.8) 90%, rgba(14,12,10,1) 100%)',
          }}
        />

        {/* ─── Layer 1: Hero text ─── */}
        <div
          className="hero-text-layer absolute inset-0 flex items-center justify-start pointer-events-none"
          style={{ opacity: heroOpacity }}
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
          className="hero-text-layer absolute inset-0 flex items-center justify-start pointer-events-none"
          style={{ opacity: servicesOpacity }}
        >
          <div className="w-full max-w-3xl px-6 md:px-16 lg:px-24 pointer-events-auto" id="services">
            <div className="glass-panel p-8 md:p-12">
              <p className="text-xs tracking-[0.2em] uppercase text-white/50 mb-3 font-medium font-mono">
                What we do
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-white tracking-tight leading-[1.1] mb-10">
                Focused expertise for<br />specialized hardware
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {services.map((s) => (
                  <div
                    key={s.title}
                    className="group rounded-xl bg-white/5 border border-white/8 p-6 hover:bg-white/8 transition-colors duration-300"
                  >
                    <s.icon size={22} weight="bold" className="text-[var(--color-accent)] mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-1.5">
                      {s.title}
                    </h3>
                    <p className="text-[13px] text-white/50 leading-relaxed">
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: heroOpacity }}
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
