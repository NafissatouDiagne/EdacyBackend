const router =  require('express').Router();
const {catchErrors}=require('../handlers/errorHandlers');
const registerController = require('../Controllers/registerController');

 router.post('/login',catchErrors(registerController.login));
 router.post('/register',catchErrors(registerController.register));

 module.exports=router;