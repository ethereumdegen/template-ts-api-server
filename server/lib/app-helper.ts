import fs from 'fs'
import path from 'path'

require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV
 

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class AppHelper {
  static getEnvironmentName(): string {
    const envName = NODE_ENV ? NODE_ENV : 'development'

    return envName
  }
  
  static escapeString(input: string): string {
    return encodeURI(input)
  }

  static unescapeString(input: string): string {
    return decodeURI(input)
  }
}
