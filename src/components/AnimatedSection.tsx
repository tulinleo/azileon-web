import { forwardRef } from 'react'

type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

export default forwardRef<HTMLElement, AnimatedSectionProps>(
  function AnimatedSection({ children, className = '', id }, ref) {
    return (
      <section ref={ref} id={id} className={`py-16 md:py-24 px-6 relative overflow-hidden ${className}`}>
        {children}
      </section>
    )
  }
)
