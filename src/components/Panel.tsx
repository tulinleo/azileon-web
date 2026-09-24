/* A section of the bento page: one big rounded card. `tone` picks the surface; `padded` off for cards that lay
   out their own inner padding (the AI pair, the contact card). */
export type Tone = 'white' | 'paper' | 'dark' | 'accent'

const TONE: Record<Tone, string> = {
  white: 'bg-surface text-ink',
  paper: 'bg-paper text-ink',
  dark: 'bg-ink text-paper',
  accent: 'bg-accent text-white',
}

type Props = {
  children: React.ReactNode
  id?: string
  tone?: Tone
  padded?: boolean
  className?: string
  as?: 'section' | 'div' | 'article' | 'footer' | 'header'
  'aria-label'?: string
}

export default function Panel({ children, id, tone = 'white', padded = true, className = '', as: Tag = 'section', ...rest }: Props) {
  return (
    <Tag id={id} className={`rounded-card ${TONE[tone]} ${padded ? 'p-panel' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
