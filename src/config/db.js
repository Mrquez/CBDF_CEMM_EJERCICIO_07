//ClaudioMqz
//Claudio.v200
//ip Acces list 148.204.142.9/32
const mongoose = require('mongoose')
uriLOCAL ="mongodb://127.0.0.1:27017/test"
const uriRemota = "mongodb+srv://ClaudioMqz:Claudio.v200@cluster0.oxomyn8.mongodb.net/?retryWrites=true&w=majority";

 mongoose.connect(uriRemota)

module.exports=mongoose;