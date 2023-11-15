const mongoose = require('../config/db')
const{Schema}=mongoose
const usuarioSchema=new Schema({
    usuario:{
        type:String,
        unique:true

    },
    nombre:{
        type:String

    },
    apellidos:{
        type:String

    },
    correo:{
        type:String,
        unique:true

    },
    clave:{
        type:String
    }
})
const Usuario= mongoose.model('Usuario',usuarioSchema)
module.exports=Usuario
//Para ponerla en otro lado es 
//module.exports=Usuario;