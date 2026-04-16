export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-8 md:py-12 px-6">
      <div className="flex-1 h-px bg-[var(--color-border)]" />
      <div className="w-2 h-2 rotate-45 bg-[var(--color-accent)] mx-4" />
      <div className="flex-1 h-px bg-[var(--color-border)]" />
    </div>
  )
}
