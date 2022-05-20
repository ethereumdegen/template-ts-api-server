import axios from 'axios'
import chai, { expect } from 'chai'
import WebServer from '../server/lib/web-server'
 
import FooController from '../server/controllers/foo-controller'
 
import MongoDB , { DatabaseExtension} from 'extensible-mongoose' 
import FooDBExtension from '../server/db-extensions/foo-extension'
import AppHelper from '../server/lib/app-helper'

const crypto = require('crypto')

const serverConfig = { port: 4040 }

const uriRoot = `http://localhost:${serverConfig.port}`

let webServer: WebServer

let mongoDB :MongoDB
let fooController: FooController 

let envmode = AppHelper.getEnvironmentName()


describe('Foo Controller', () => {
  describe('Create Foo', () => {


    before(async () => {


      let dbNameBase = 'foodatabase'

      //boot web server
      mongoDB = new MongoDB()
      await mongoDB.init(  `${dbNameBase}_${envmode}` )


      await mongoDB.dropDatabase()

      fooController = new FooController(mongoDB)


    


      let dbExtensions:Array<DatabaseExtension> = []
        
      dbExtensions.push(...[
        new FooDBExtension(mongoDB),
      ])

      dbExtensions.map(ext => ext.bindModelsToDatabase())  


      let apiControllers = [{name: 'foo' , controller: fooController}]


      webServer = new WebServer({port:8000}, apiControllers )
      await webServer.start( )
 

     
 
    })

    after(async () => {
      await webServer.stop()
      await mongoDB.disconnect()
    })



    it('should create a foo', async () => {
      const result = await fooController.createFoo({
        fields: {
          name: 'fizzbuzz'
        }
      })

      expect(result.success).to.eql(true) 
      expect(result.data.bar).to.eql('fizzbuzz')
      
      const foundFoo = await fooController.findFoo({
        fields: {
           
        }
      })

      expect(result.success).to.eql(true) 
      expect(result.data.bar).to.eql('fizzbuzz')


    })

   

   
  })
})
