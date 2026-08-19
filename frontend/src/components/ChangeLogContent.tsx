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

function truncate(value: string, maxLength?: number) { if (!maxLength || value.length <= maxLength) return value; return value.slice(0, Math.max(0, maxLength - 1)).trimEnd() + '…' }

function fieldValue(entry: ChangeLogRecord, field: string) {
  const value = entry[field]
  return typeof value === 'string' || typeof value === 'number' ? String(value) : ''
}

export function ReleaseSummary({ entry, blocks = defaultReleaseBlocks, maxLength, onOpen }: { entry: ChangeLogRecord; blocks?: ReleaseBlock[]; maxLength?: number; onOpen?: () => void }) {
  const layout = blocks.length ? blocks : defaultReleaseBlocks
  return <div className="release-summary">{layout.map((block) => {
    const rawValue = fieldValue(entry, block.field); const value = block.type === 'text' || block.type === 'markdown' ? truncate(rawValue, maxLength) : rawValue
    if (!value) return null
    if (block.type === 'date') return <time key={block.id} className="release-block release-block-date" dateTime={value}>{new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))}</time>
    if (block.type === 'badge') return <span key={block.id} className="release-block release-block-badge">{value}</span>
    if (block.type === 'title') return <button key={block.id} className="release-block release-block-title" onClick={onOpen} disabled={!onOpen}>{value}</button>
    if (block.type === 'markdown') return <div key={block.id} className="release-block release-block-markdown"><ChangeLogContent content={value} /></div>
    return <p key={block.id} className="release-block release-block-text">{value}</p>
  })}</div>
}

export function ChangeLogEntry({ entry, blocks, maxLength, onOpen }: { entry: ChangeLogRecord; blocks?: ReleaseBlock[]; maxLength?: number; onOpen?: () => void }) {
  return <article id={'release-' + entry.id} className="changelog-entry"><ReleaseSummary entry={entry} blocks={blocks} maxLength={maxLength} onOpen={onOpen} /></article>
}
