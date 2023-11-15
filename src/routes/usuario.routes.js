const express = require('express');
const router=express.Router();
const userController=require('../controllers/usuario.controllers');

router.get('/',userController.getAllUsers);
router.get('/:email',userController.getUserByEmail); 
router.post('/',userController.addUser);
router.put('/:email',userController.updateUser);
router.delete('/:email',userController.deleteUser);
module.exports=router;