import type { Job, JobSummary } from "../types/job"

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000"

// create job
export async function createJob(urls: string[]) {
  const response = await fetch(`${API_URL}/api/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls }),
  })

  if (!response.ok) {
    throw new Error("Failed to create job")
  }

  return response.json()
}

// get jobs list
export async function getJobs(): Promise<JobSummary[]> {
  const response = await fetch(`${API_URL}/api/jobs`)

  if (!response.ok) {
    throw new Error("Failed to load jobs")
  }

  return response.json()
}

// get job by id
export async function getJob(id: string): Promise<Job> {
  const response = await fetch(`${API_URL}/api/jobs/${id}`)

  if (!response.ok) {
    throw new Error("Failed to load job")
  }

  return response.json()
}

// cancel job
export async function cancelJob(id: string) {
  const response = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to cancel job")
  }

  return response.json()
}