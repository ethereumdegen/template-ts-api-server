## Template API Server
 
#### Prerequisites 

NodeJS V 16.13.1 
 

 #### Webhook 
 
    
#### Getting Started 

Install dependencies with 'yarn install'
 
Run tests with 'yarn test'


#### Building an API with this 

You will notice that there is a controller named FooController and a db extension (with database table definitions) named FooExtension.  

To build your API, for each database model, you should clone those two files to create new copies with new name for the new model.  Then, inside of  'index.ts' you will need to register the controller and the DB extension just like how the Foo controller and extension are being registered. 
