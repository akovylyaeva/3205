import { create } from "zustand"
import {
  createJob,
  getJob,
  getJobs,
  cancelJob,
} from "../api/jobs"
import type { Job, JobSummary } from "../types/job"

interface JobStore {
  jobs: JobSummary[]
  activeJob: Job | null

  error: string | null

  loadJobs: () => Promise<void>
  loadJob: (id: string) => Promise<void>
  createNewJob: (urls: string[]) => Promise<void>
  cancelActiveJob: () => Promise<void>
}

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],
  activeJob: null,

  error: null,

  loadJobs: async () => {
    try {
      set({
        error: null
      })

      const jobs = await getJobs()

      set({
        jobs: jobs
      })
    } catch {
      set({
        error: "Failed to load jobs"
      })
    }
  },

  loadJob: async (id) => {
    try {
      set({
        error: null
      })

      const job = await getJob(id)

      set({
        activeJob: job
      })
    } catch {
      set({
        error: "Failed to load job"
      })
    }
  },

  createNewJob: async (urls) => {
    try {
      set({
        error: null
      })

      const result = await createJob(urls)

      await get().loadJobs()
      await get().loadJob(result.jobId)
    } catch {
      set({
        error: "Failed to create job"
      })
    }
  },

  cancelActiveJob: async () => {
    const activeJob = get().activeJob

    if (!activeJob) return

    try {
      set({
        error: null
      })

      await cancelJob(activeJob.id)

      await get().loadJob(activeJob.id)
      await get().loadJobs()
    } catch {
      set({
        error: "Failed to cancel job"
      })
    }
  },
}))