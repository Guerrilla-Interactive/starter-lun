import fs from "fs"
import path from "path"
import React, { useEffect, useState } from "react"

const DevTab: React.FC = () => {
  const [pages, setPages] = useState<Array<string>>([])

  useEffect(() => {
    // Ensure this code runs only in development environment
    if (process.env.NODE_ENV === "development") {
      const pagesDirectory = path.join(process.cwd(), "src/app/site")
      fs.readdir(pagesDirectory, (err, files) => {
        if (err) throw new Error("Unable to scan directory: " + err)

        const pageFiles = files.filter((file) => file.endsWith(".ts"))
        setPages(pageFiles)
      })
    }
  }, [])

  return (
    <div className="dev-tab">
      <h2>Development Tab</h2>
      <ul>
        {pages.map((page, index) => (
          <li key={index}>{page}</li>
        ))}
      </ul>
    </div>
  )
}

export default DevTab
