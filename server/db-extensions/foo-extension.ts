
import {TableDefinition, DatabaseExtension} from 'extensible-mongoose'
import { Schema } from 'mongoose'

export interface Foo {
    bar: string

}


export const  FooSchema = new Schema<Foo>({    
    bar:  { type: String, index: true, unique: true, required: true }
  })


export const FooDefinition :TableDefinition= {tableName:'foos',schema:FooSchema}

export default class FooDBExtension extends DatabaseExtension {
 
  
    getBindableModels() : Array<TableDefinition>{

        return  [
            FooDefinition
        ]
    } 
    

}