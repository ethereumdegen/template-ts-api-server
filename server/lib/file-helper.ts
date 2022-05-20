import fs from 'fs'
import path from 'path'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class FileHelper {
  static readJSONFile(uri: string): any {
    const input = fs.readFileSync(path.resolve(uri), {
      encoding: 'utf8',
      flag: 'r',
    })

    return JSON.parse(input)
  }
}
