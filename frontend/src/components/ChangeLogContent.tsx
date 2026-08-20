import { useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import type { ChangeLogRecord, ReleaseBlock } from '../types'
import ReactMarkdown from 'react-markdown'

interface ChangeLogContentProps { content: string }

export const defaultReleaseBlocks: ReleaseBlock[] = [
  { id: 'created', type: 'date', field: 'created' },
  { id: 'version', type: 'badge', field: 'version' },
  { id: 'title', type: 'title', field: 'title' },
  { id: 'content', type: 'markdown', field: 'content' },
]

function normaliseContent(content: string) {
  if (!/<[a-z][\s\S]*>/i.test(content)) return content.trim()
  const document = new DOMParser().parseFromString(content, 'text/html')
  document.querySelectorAll('br').forEach((element) => element.replaceWith('\n'))
  document.querySelectorAll('p, div, li, h1, h2, h3, h4, h5, h6, pre, blockquote').forEach((element) => element.append('\n\n'))
  return document.body.textContent?.replace(/\n{3,}/g, '\n\n').trim() ?? ''
}

export function ChangeLogContent({ content }: ChangeLogContentProps) {
  return <div className="changelog-content"><ReactMarkdown>{normaliseContent(content)}</ReactMarkdown></div>
}

function useTruncation(cap: number, deps: unknown[]) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [truncated, setTruncated] = useState(false)
  useLayoutEffect(() => {
    const element = contentRef.current
    const measure = () => setTruncated(Boolean(element && element.scrollHeight > cap + 1))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return { contentRef, truncated }
}

function TruncatableBlock({ blockClassName, maxHeight, children }: { blockClassName: string; maxHeight?: number; children: ReactNode }) {
  const [expanded, setExpanded] = useState(false)
  const { contentRef, truncated } = useTruncation(maxHeight || 260, [children, maxHeight])
  const classes = [blockClassName, truncated && !expanded ? 'is-truncated' : '', expanded ? 'is-expanded' : ''].filter(Boolean).join(' ')
  return <>
    <div ref={contentRef} className={classes} style={summaryStyle(maxHeight)}>{children}</div>
    {truncated && !expanded && <button type="button" className="release-summary-toggle" onClick={() => setExpanded(true)} aria-label="Show full release content">…</button>}
    {expanded && truncated && <button type="button" className="release-summary-toggle" onClick={() => setExpanded(false)}>Show less</button>}
  </>
}

function summaryStyle(maxHeight?: number): CSSProperties { return { '--release-summary-height': (maxHeight || 260) + 'px' } as CSSProperties }

function fieldValue(entry: ChangeLogRecord, field: string) {
  const value = entry[field]
  return typeof value === 'string' || typeof value === 'number' ? String(value) : ''
}

export function ReleaseSummary({ entry, blocks = defaultReleaseBlocks, maxHeight, onOpen }: { entry: ChangeLogRecord; blocks?: ReleaseBlock[]; maxHeight?: number; onOpen?: () => void }) {
  const layout = blocks.length ? blocks : defaultReleaseBlocks
  return <div className="release-summary" style={summaryStyle(maxHeight)}>{layout.map((block) => {
    const value = fieldValue(entry, block.field)
    if (!value) return null
    if (block.type === 'date') return <time key={block.id} className="release-block release-block-date" dateTime={value}>{new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))}</time>
    if (block.type === 'badge') return <span key={block.id} className="release-block release-block-badge">{value}</span>
    if (block.type === 'title') return <button key={block.id} className="release-block release-block-title" onClick={onOpen} disabled={!onOpen}>{value}</button>
    if (block.type === 'markdown') return <TruncatableBlock key={block.id} blockClassName="release-block release-block-markdown" maxHeight={maxHeight}><ChangeLogContent content={value} /></TruncatableBlock>
    return <TruncatableBlock key={block.id} blockClassName="release-block release-block-text" maxHeight={maxHeight}>{value}</TruncatableBlock>
  })}</div>
}

export function ChangeLogEntry({ entry, blocks, maxHeight, onOpen }: { entry: ChangeLogRecord; blocks?: ReleaseBlock[]; maxHeight?: number; onOpen?: () => void }) {
  return <article id={'release-' + entry.id} className="changelog-entry"><ReleaseSummary entry={entry} blocks={blocks} maxHeight={maxHeight} onOpen={onOpen} /></article>
}
