  
import AppHelper from '../lib/app-helper' 
import APIController from './api-controller'

import {ControllerMethod} from 'degen-route-loader'
import { Foo, FooDefinition } from '../db-extensions/foo-extension'
 
export default class FooController extends APIController {
  
  
  createFoo: ControllerMethod = async (req:any )=> {

   
    let name = req.fields.name
 
    let newFoo:Foo = {
      bar: name
    }
 

    let creation = await this.mongoDB.getModel(FooDefinition).create(newFoo)

    return {success:true, data: creation}
  }



  findFoo: ControllerMethod = async (req:any) => {

    let record = await this.mongoDB.getModel(FooDefinition).findOne()

    return {success:true, data: record}
    
  }


}