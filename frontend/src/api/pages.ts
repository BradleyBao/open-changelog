import type { ChangeLogPage, ChangeLogRecord, PocketBaseList } from '../types'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/admin-api${path}`, init)
  if (!response.ok) { const payload = await response.json().catch(() => ({})); throw new Error(payload.error || `Request failed: ${response.status}`) }
  return response.status === 204 ? undefined as T : response.json() as Promise<T>
}
function adminRequest<T>(path: string, token: string, init?: RequestInit) { return request<T>(path, { ...init, headers: { 'content-type': 'application/json', 'x-admin-session': token, ...init?.headers } }) }

export const pagesApi = {
  login: (password: string) => request<{ token: string }>('/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ password }) }),
  list: (token: string) => adminRequest<ChangeLogPage[]>('/pages', token),
  create: (page: Omit<ChangeLogPage, 'id' | 'created' | 'updated'>, token: string) => adminRequest<ChangeLogPage>('/pages', token, { method: 'POST', body: JSON.stringify(page) }),
  update: (id: string, page: Omit<ChangeLogPage, 'id' | 'created' | 'updated'>, token: string) => adminRequest<ChangeLogPage>(`/pages/${id}`, token, { method: 'PATCH', body: JSON.stringify(page) }),
  remove: (id: string, token: string) => adminRequest<void>(`/pages/${id}`, token, { method: 'DELETE' }),
  publicPage: (path: string) => request<ChangeLogPage>(`/public/page?path=${encodeURIComponent(path)}`),
  inspect: (apiUrl: string, token: string) => adminRequest<{ fields: string[]; sample: ChangeLogRecord | null }>("/inspect?apiUrl=" + encodeURIComponent(apiUrl), token),
  records: async (id: string) => { const payload = await request<PocketBaseList<ChangeLogRecord> | ChangeLogRecord[]>(`/public/pages/${id}/records`); return Array.isArray(payload) ? payload : payload.items },
}
