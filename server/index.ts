 
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


  /* 
    Register all db extensions here and bind their models to mongo.  
    This step informs Mongo of all of the models structures and rules.
  */
  let dbExtensions:Array<DatabaseExtension> = []
    
  dbExtensions.push(...[
    new FooDBExtension(mongoDb), 
  ])
  dbExtensions.map(ext => ext.bindModelsToDatabase())
  


  /*
  Register all api controllers here.
  Each controller class has methods which are defined and bound in routes.json, callable by hitting the uri on the webserver.
  The 'name' field is very important as it must match exactly the 'controller' field of all routes for this controller defined in routes.json
  */
  let apiControllers = [
    {name:'foo', controller: new FooController(mongoDb)},
    
  ]

  let webserver = new WebServer( serverConfig, apiControllers)
  await webserver.start()
  

}


 
start()