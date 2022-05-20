 
import ExtensibleMongoDB, {DatabaseExtension} from 'extensible-mongoose'
  

import FooController from './controllers/foo-controller'

import FooDBExtension from './db-extensions/foo-extension'
import AppHelper from './lib/app-helper'
import FileHelper from './lib/file-helper'
import WebServer from './lib/web-server'

let envmode = AppHelper.getEnvironmentName()


let serverConfigFile = FileHelper.readJSONFile('./server/config/serverConfig.json')
let serverConfig = serverConfigFile[envmode]

async function start(){

  let dbNameBase = 'foodatabase'
  let mongoDb = new ExtensibleMongoDB(  ) 
  await mongoDb.init(  `${dbNameBase}_${envmode}` )


  let dbExtensions:Array<DatabaseExtension> = []
    
  dbExtensions.push(...[
    new FooDBExtension(mongoDb),
 
  ])

  dbExtensions.map(ext => ext.bindModelsToDatabase())
  



  let apiControllers = [
    {name:'foo', controller: new FooController(mongoDb)},
   
  ]


  let webserver = new WebServer( serverConfig, apiControllers)
  await webserver.start()
   


}


 
start()