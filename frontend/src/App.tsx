import './App.css'

import { useEffect } from "react"
import { useJobStore } from "./store/jobStore"
import { JobForm } from "./components/job-form/JobForm"
import { JobList } from "./components/job-list/JobList"
import { JobDetails } from "./components/job-details/JobDetails"

function App() {
  const loadJobs = useJobStore(
    (s) => s.loadJobs
  )

  useEffect(() => {
    loadJobs();
  }, [loadJobs])

  const activeJob = useJobStore(
    (s) => s.activeJob
  )

  const loadJob = useJobStore(
    (s) => s.loadJob
  )

  useEffect(() => {
    if (!activeJob) return

    const finalStatuses = [
      "completed",
      "failed",
      "cancelled",
    ]

    if (finalStatuses.includes(activeJob.status)) {
      return
    }

    const interval = setInterval(() => {
      loadJob(activeJob.id)
      loadJobs()
    }, 1000)

    return () => clearInterval(interval)
  }, [
    activeJob?.id,
    activeJob?.status,
    loadJob,
    loadJobs,
  ])

  const error = useJobStore(
    (s) => s.error
  )

  return (
    <div className='layout'>
      {error && (
        <div className='error'>
          {error}
        </div>
      )}
      <div className='layout__form'>
        <JobForm />
      </div>

      <div className='layout__bottom'>
        <JobList />
        <JobDetails />
      </div>
    </div>
  );
}

export default App