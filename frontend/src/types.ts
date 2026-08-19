export type ReleaseBlockType = "date" | "badge" | "title" | "text" | "markdown"

export interface ReleaseBlock {
  id: string
  type: ReleaseBlockType
  field: string
}

export interface ChangeLogRecord {
  [key: string]: unknown
  id: string
  version: string
  title: string
  content: string
  created: string
  updated: string
}

export interface PocketBaseList<T> {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: T[]
}

export interface ChangeLogPage {
  id: string
  name: string
  publicPath: string
  apiUrl: string
  releaseIdentifierField: string
  releaseBlocks: ReleaseBlock[]
  releaseMaxLength: number
  markdownCss: string
  themeCss: string
  brandName: string
  logoUrl: string
  websiteUrl: string
  introLabel: string
  introDescription: string
  footerText: string
  isHome: boolean
  created: string
  updated: string
}
