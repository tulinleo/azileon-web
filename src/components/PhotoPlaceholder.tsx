import type { Icon } from '@phosphor-icons/react'
import { MagnifyingGlassPlus } from '@phosphor-icons/react'
import { useT } from '../i18n'

type PhotoPlaceholderProps = {
  /** Path under /public. When missing, a dashed placeholder is rendered instead. */
  src?: string
  alt: string
  label: string
  icon: Icon
  /** CSS aspect-ratio value, e.g. "4 / 3" */
  aspect: string
  /** CSS object-position for the image inside its frame, e.g. "center 60%" */
  position?: string
  /** When provided, the photo becomes a button that opens it (e.g. in a lightbox). */
  onOpen?: () => void
  className?: string
}

export default function PhotoPlaceholder({ src, alt, label, icon: IconCmp, aspect, position, onOpen, className = '' }: PhotoPlaceholderProps) {
  const t = useT()

  if (src) {
    const frameClass = 'relative rounded-inner overflow-hidden border border-line bg-surface block w-full p-0'
    const image = (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.03]"
        style={position ? { objectPosition: position } : undefined}
      />
    )

    return (
      <figure className={`m-0 ${className}`}>
        {onOpen ? (
          <button
            type="button"
            onClick={onOpen}
            aria-label={`${t('lightboxOpen')}: ${alt}`}
            className={`${frameClass} group cursor-zoom-in focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none`}
            style={{ aspectRatio: aspect }}
          >
            {image}
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 text-ink flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200"
            >
              <MagnifyingGlassPlus size={18} weight="bold" />
            </span>
          </button>
        ) : (
          <div className={frameClass} style={{ aspectRatio: aspect }}>
            {image}
          </div>
        )}
        <figcaption className="mt-2 text-xs tracking-[0.1em] uppercase text-ink-3 font-medium">
          {label}
        </figcaption>
      </figure>
    )
  }

  return (
    <div className={className}>
      <div
        role="img"
        aria-label={alt}
        className="rounded-inner border border-dashed border-line-2 bg-surface/60 flex flex-col items-center justify-center gap-2 text-ink-3"
        style={{ aspectRatio: aspect }}
      >
        <IconCmp size={28} weight="regular" />
        <span className="text-xs tracking-[0.1em] uppercase font-medium">{label}</span>
      </div>
    </div>
  )
}
