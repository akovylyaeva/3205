import express from "express"
import cors from "cors"
import fetch from "node-fetch"
import { jobs } from "./jobs"
import type { Job } from "./types"

const app = express()

app.use(cors())
app.use(express.json())

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const cancelledJobs = new Set<string>()

// async job processor
async function runJob(job: Job) {
  job.status = "in_progress"

  const concurrency = 5
  let index = 0

  async function worker() {
    while (true) {
      const currentIndex = index++
      if (currentIndex >= job.urls.length) break

      if (cancelledJobs.has(job.id)) return

      const task = job.urls[currentIndex]

      task.status = "in_progress"
      task.startedAt = Date.now()

      try {
        await sleep(Math.random() * 10000)

        const res = await fetch(task.url, { method: "HEAD" })

        task.httpStatus = res.status
        task.status = "success"
      } catch (e: unknown) {
        task.status = "error"
        task.error = e instanceof Error
          ? e.message
          : "unknown error"
      }

      task.finishedAt = Date.now()

      if (task.startedAt && task.finishedAt) {
        task.duration = task.finishedAt - task.startedAt
      }
    }
  }

  await Promise.all(
    Array.from({ length: concurrency }, () => worker())
  )

  if (cancelledJobs.has(job.id)) return

  job.status = job.urls.some((u) => u.status === "error")
    ? "failed"
    : "completed"
}

// create job
app.post("/api/jobs", (req, res) => {
  const id = crypto.randomUUID()

  const { urls = [] } = req.body

  const job: Job = {
    id,
    createdAt: Date.now(),
    status: "pending",
    urls: urls.map((url: string) => ({
      url,
      status: "pending",
    })),
  }

  jobs.set(id, job)

  runJob(job)

  res.json({
    jobId: id
  })
});

// get job list
app.get("/api/jobs", (req, res) => {
  const list = Array.from(jobs.values())
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(({
        id,
        createdAt,
        status,
        urls
    }) => ({
        id: id,
        createdAt: createdAt,
        status: status,
        total: urls.length,
        success: urls.filter((u) => u.status === "success").length,
        error: urls.filter((u) => u.status === "error").length,
    }))

  res.json(list)
});

// get job by id
app.get("/api/jobs/:id", (req, res) => {
  const job = jobs.get(req.params.id)

  if (!job) {
    return res.status(404).json({
        error: "Job not found"
    })
  }

  res.json(job)
});

// cancel job by id
app.delete("/api/jobs/:id", (req, res) => {
  const job = jobs.get(req.params.id)

  if (!job) {
    return res.status(404).json({
        error: "Job not found"
    })
  }

  job.status = "cancelled"
  cancelledJobs.add(job.id)

  job.urls.forEach((u) => {
    if (u.status === "pending") {
      u.status = "cancelled"
    }
  })

  res.json({
    ok: true
  })
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000")
})