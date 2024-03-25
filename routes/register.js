const router =  require('express').Router();
const {catchErrors}=require('../handlers/errorHandlers');
const registerController = require('../Controllers/registerController');
const authMiddleware = require('../middlewares/auth');
const User = require('../models/User');
 router.post('/login',catchErrors(registerController.login));
 router.post('/register',catchErrors(registerController.register));
 router.get('/user',catchErrors(registerController.user))


router.get('/profile', authMiddleware, async(req, res) => {
   try{
    // L'authentification a réussi, vous pouvez accéder aux informations de l'utilisateur à partir de req.payload
    const userId = req.payload.id;
    const user = await User.findById(userId);
   if(!user){
    return res.status(404).json({message:"Utilisateur introuvable!!!"});

   }
   res.json({user})
}catch(error){
  console.error("Erreur lors de la recuperations de l'utilisateur",error)
}
    // Utilisez userId pour récupérer les informations de l'utilisateur à partir de votre base de données par exemple
    
});

 module.exports=router;