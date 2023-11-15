const Usuario= require('../models/usuario.models')
const bcrypt = require("bcryptjs");
exports.getAllUsers=async(req,res)=>{
    try{
        const Usuarios= await Usuario.find();
        res.status(200).json({
            estado:1,
            mensaje:"Usuarios encontrados",
            Usuarios:Usuarios
        })
    }catch(error){
        console.error("Error en la consulta:", error);
        res.status(500).json({
            estado:0,
            mensaje:"Ocurrio un error desconocido al mostrar todos los usuarios"
        })
    }
}
exports.addUser=async(req,res)=>{
    try{
        const{nombre,apellidos, usuario, correo, clave}=req.body;
        if(nombre==undefined|| apellidos==undefined||usuario==undefined||correo==undefined||clave==undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Faaltan paramentros a la solicitud"
            })
        }else{
            const usuarioEncontrado=await Usuario.findOne({correo:correo, usuario:usuario}).exec();
            if(usuarioEncontrado){
                res.status(200).json({
                    estado:0,
                    mensaje:"Usuario ya existente, favor de registrar uno nuevo"
                    
                })

            }else{
            const salt = await bcrypt.genSalt(8);
            const claveEncriptada= await bcrypt.hash(clave,salt)
            const nuevoUsuario=await Usuario.create({nombre, apellidos, usuario,correo,clave:claveEncriptada});
            if(nuevoUsuario){
                res.status(200).json({
                    estado:1,
                    mensaje:"Usuario agregado correctamente",
                    nuevoUsuario: usuario
                })
            }else{
                res.status(500).json({
                    estado:0,
                    mensaje:"Ocurrio un error desconocido"
                })
                console.log(error);

            }
          }
        }
    }catch(error){
        console.error("Error en la consulta:", error);
        res.status(500).json({
            estado:0,
            mensaje:"Ocurrio un error desconocido al mostrar todas los usuarios"
        })
    }

}
exports.getUserByEmail=async(req,res)=>{
    try{
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa get user by email")

        const{email}=req.params;

        const usuario=await Usuario.findOne({correo:email}).exec();
        
        if(usuario){
            res.status(200).json({
                estado:1,
                mensaje:"Usuario Encontrado",
                usuario:usuario
            })
        }else{
            res.status(200).json({
            estado:0,
            mensaje:"usuario no encontrado"})

        }
        
    }catch(error){
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa get user by email error")

        console.log(error);
        res.status(500).json({
            estado:0,
            mensaje:"ocurrio un error desconocido"
        })
     
    }

}

exports.updateUser = async(req,res)=> {
    try{
        const { correo } = req.params;
        const { nombre, apellidos, clave } = req.body;
        if(nombre==undefined || apellidos==undefined || clave==undefined)
        {
            res.status(400).json({
                estado: 0,
                mensaje: "Faltan patametros"
            })
        }else{
            //encriptar la clave
            const salt = await bcrypt.genSalt(8);
            claveEncriptada = await bcrypt.hash(clave, salt);

            await Usuario.findOneAndUpdate({correo: correo},{nombre: nombre, apellidos: apellidos, clave: claveEncriptada})
            res.status(200).json({
                estado: 1,
                mensaje: "El registro se actualizco correctamente",
            });
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            estado  : 0,
            mensaje : "Ocurrio un error desconocido"
        })

    }
}
exports.deleteUser=async(req,res)=>{
    try{
        const {email}=req.params;
        console.log(email);
        const usuario=await Usuario.findOne({correo:email}).exec();
        
        console.log(usuario);
        if(usuario){
            await Usuario.deleteOne(usuario)
            res.status(200).json({
                estado:1,
                mensaje:"Usuario eliminado"
            })
        }else{
            res.status(404).json({
                estado:0,
                mensaje:"Usuario no encontrado"
            })
        }

    }catch(error){
        console.error("Error en la consulta:", error);
        res.status(500).json({
            estado:0,
            mensaje:"Ocurrio un error desconocido "
        })

    }
}