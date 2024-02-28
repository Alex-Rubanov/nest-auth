import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as uuid from 'uuid'
import * as path from 'path'
import * as fs from 'fs'
import { createDirAsync, createFileAsync } from './utils/files.utils'

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg'
      const filePath = path.resolve(__dirname, '..', 'static')

      if (!fs.existsSync(filePath)) {
        await createDirAsync(filePath)
      }

      await createFileAsync(filePath, fileName, file.buffer)

      return fileName
    } catch (err) {
      throw new HttpException('File was not created', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
