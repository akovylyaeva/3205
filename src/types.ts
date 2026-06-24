export type UrlStatus =
  | 'pending'
  | 'in_progress'
  | 'success'
  | 'error'
  | 'cancelled'

export type JobStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'failed'

export interface UrlTask {
  url: string
  status: UrlStatus
  httpStatus?: number
  error?: string
  startedAt?: number
  finishedAt?: number
  duration?: number
}

export interface Job {
  id: string
  createdAt: number
  status: JobStatus
  urls: UrlTask[]
}