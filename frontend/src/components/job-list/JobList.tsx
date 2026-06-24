import "./JobList.css"

import { useJobStore } from "../../store/jobStore"

export function JobList() {
  const jobs = useJobStore(
    (s) => s.jobs
  )
  const loadJob = useJobStore(
    (s) => s.loadJob
  )

  return (
    <div className='jobs-list'>
      <h2 className='job-list__title'>
        Jobs
      </h2>

      {jobs.map(({
        id,
        status,
        success,
        error
      }) => (
        <div
          key={id}
          onClick={() => loadJob(id)}
          className='job-list__item'
        >
          <div className='job-list__item-id'>
            {id}
          </div>

          <div className='job-list__item-status'>
            Status: {status}
          </div>

          <div className='job-list__item-status'>
            Success: {success} / Error: {error}
          </div>
        </div>
      ))}
    </div>
  )
}