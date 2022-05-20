import fs from 'fs'
import http from 'http'
import https from 'https'
import path from 'path'

import cors from 'cors'
import express from 'express'
import DegenRouteLoader from 'degen-route-loader'

import FileHelper from '../lib/file-helper' 

import {Route} from 'degen-route-loader'

import  history from 'connect-history-api-fallback'
import APIController from '../controllers/api-controller'

 

require('dotenv').config() 
 

const AllRoutes:Array<Route> = FileHelper.readJSONFile('./server/config/routes.json')
 


export default class WebServer {
  server: https.Server | http.Server | undefined

  app:any

  apiPort:number

  degenRouteLoader:DegenRouteLoader

  appListener: any

  constructor( public serverConfig: any , public apiControllers: Array<{name:string, controller: APIController}>) {



    this.app = express()

    this.degenRouteLoader = new DegenRouteLoader()

    this.apiPort = this.serverConfig.port? this.serverConfig.port : 3000

    let envmode = process.env.NODE_ENV

    this.app.use(cors());
 
  }

  async start(  ): Promise<void> {
  
    
      //Load all of the api controllers similar to rails 
      this.apiControllers.map( controllerData => {

        // @ts-ignore
        let filteredRoutes = AllRoutes.filter(x => (x.controller.toLowerCase() == controllerData.name.toLowerCase()))

        this.degenRouteLoader.loadRoutes( this.app, filteredRoutes, controllerData.controller)

      }) 
      
     
 
      //host static files from dist for webpage 
      const staticFileMiddleware = express.static('cache');
      this.app.use(staticFileMiddleware);
      this.app.use(history({
        disableDotRule: true,
        verbose: true
      }));
      this.app.use(staticFileMiddleware);

      


      this.appListener = this.app.listen(this.apiPort, () => {
        console.log(`API Server listening at http://localhost:${this.apiPort}`)
      })


  }


  async stop(    ){
    if(this.appListener){
      this.appListener.close()
    }
    


  }
}
