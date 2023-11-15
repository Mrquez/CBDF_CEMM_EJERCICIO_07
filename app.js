const express= require('express')
const routesUser=require('./src/routes/usuario.routes')
const app=express()
const port =process.env.PORT||3000;

app.use(express.json())
app.use('/socios/v1/users',routesUser);

app.listen(port,()=>{
    console.log("servidor corriendo en el puerto :",port)
})