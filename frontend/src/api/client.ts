import type { ChangeLogRecord, PocketBaseList } from "../types"

const changelogApiUrl = import.meta.env.VITE_CHANGELOG_API_URL

export async function getChangeLog(): Promise<ChangeLogRecord[]> {
  if (!changelogApiUrl) throw new Error("VITE_CHANGELOG_API_URL is not configured")

  const url = new URL(changelogApiUrl)
  url.searchParams.set("sort", "-created")
  url.searchParams.set("perPage", "100")

  const response = await fetch(url, { headers: { Accept: "application/json" } })
  if (!response.ok) throw new Error(`ChangeLog request failed: ${response.status}`)

  const payload = await response.json() as PocketBaseList<ChangeLogRecord> | ChangeLogRecord[]
  return Array.isArray(payload) ? payload : payload.items
}
