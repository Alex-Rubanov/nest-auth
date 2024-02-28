import * as fs from 'fs'
import * as path from 'path'

export const createDirAsync = (
  path: string,
  options: fs.Mode | fs.MakeDirectoryOptions = { recursive: true },
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, options, (err) => {
      if (err) {
        reject(err)
      }

      resolve()
    })
  })
}

export const createFileAsync = (pathName: string, fileName: string, data: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(pathName, fileName), data, (err) => {
      if (err) {
        reject(err)
      }

      resolve()
    })
  })
}
