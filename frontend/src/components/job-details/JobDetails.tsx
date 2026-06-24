import "./JobDetails.css"

import { useJobStore } from "../../store/jobStore"

export function JobDetails() {
  const activeJob = useJobStore(
    (s) => s.activeJob
  )
  const cancelActiveJob = useJobStore(
    (s) => s.cancelActiveJob
  )

  if (!activeJob) {
    return (
      <div className='job-details__empty'>
        Select a job
      </div>
    )
  }

  const { 
    id,
    status,
    urls
  } = activeJob;

  const processed = activeJob.urls.filter(
    (u) =>
      u.status === "success" ||
      u.status === "error" ||
      u.status === "cancelled"
  ).length

  return (
    <div className='job-details'>
      <h2 className='job-details__title'>
        Job Details
      </h2>

      <div className='job-details__field'>
        ID: {id}
      </div>

      <div className='job-details__field'>
        Status: {status}
      </div>

      <div className='job-details__progress'>
        Progress: {processed} / {urls.length}
      </div>

      {status === "in_progress" && (
        <button
          className='job-details__cancel-btn'
          onClick={cancelActiveJob}
        >
          Cancel Job
        </button>
      )}

      <div className='job-details__divider'>
        <hr />
      </div>

      {urls.map(({
        url,
        status,
        httpStatus,
        error,
        duration
      }) => (
        <div
          key={url}
          className='job-details__url-item'
        >
          <div className='job-details__url'>
            {url}
          </div>

          <div className='job-details__field'>
            Status: {status}
          </div>

          {httpStatus !== undefined && (
            <div className="job-details__field">
              HTTP: {httpStatus}
            </div>
          )}

          {duration !== undefined && (
            <div className="job-details__field">
              Duration: {duration} ms
            </div>
          )}

          {error && (
            <div className='job-details__error'>
              Error: {error}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}