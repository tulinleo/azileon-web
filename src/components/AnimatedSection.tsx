type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  id?: string
}

export default function AnimatedSection({ children, className = '', id }: AnimatedSectionProps) {
  return (
    <section id={id} className={`py-32 md:py-40 px-6 ${className}`}>
      {children}
    </section>
  )
}
