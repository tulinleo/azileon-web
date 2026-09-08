import { useEffect, useRef } from 'react'
import { X } from '@phosphor-icons/react'
import { useT } from '../i18n'

type LightboxProps = {
  src: string
  alt: string
  caption?: string
  onClose: () => void
}

/** Full-screen image viewer. Closes on backdrop click, the close button or Escape. */
export default function Lightbox({ src, alt, caption, onClose }: LightboxProps) {
  const t = useT()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={caption ?? alt}
      onClick={onClose}
      className="lightbox-backdrop fixed inset-0 z-[100] bg-[#1A1A1A]/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={t('lightboxClose')}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border-none cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
      >
        <X size={22} weight="bold" />
      </button>

      <figure
        className="lightbox-figure m-0 max-w-full max-h-full flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl cursor-default"
        />
        {caption && (
          <figcaption className="text-xs tracking-[0.1em] uppercase text-white/70 font-medium">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  )
}
