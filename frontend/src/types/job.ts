export type UrlStatus =
  | "pending"
  | "in_progress"
  | "success"
  | "error"
  | "cancelled"

export type JobStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "failed"
  | "cancelled"

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

export interface JobSummary {
  id: string
  createdAt: number
  status: JobStatus
  total: number
  success: number
  error: number
}