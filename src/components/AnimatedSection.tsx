type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

export default function AnimatedSection({ children, className = '', id }: AnimatedSectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 px-6 relative overflow-hidden ${className}`}>
      {children}
    </section>
  )
}
