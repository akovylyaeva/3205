import "./JobForm.css"

import { useState } from "react"
import { useJobStore } from "../../store/jobStore"

export function JobForm() {
  const [value, setValue] = useState("")

  const createNewJob = useJobStore(
    (s) => s.createNewJob
  )

  const handleSubmit = async () => {
    const urls = value
      .split(/\n| /)
      .map((x) => x.trim())
      .filter(Boolean)

    if (!urls.length) return

    await createNewJob(urls)

    setValue("")
  }

  return (
    <div className='job-form'>
      <h2 className='job-form__title'>
        Create Job
      </h2>

      <textarea
        className='job-form__textarea'
        rows={8}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={'https://example.com'}
      />

      <button
        className='job-form__button'
        onClick={handleSubmit}
      >
        Run Check
      </button>
    </div>
  )
}