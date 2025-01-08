import express from "express";
import loginController from '../ctrls/loginController.js';
import registerController from '../ctrls/registerController.js';
import rememberController from '../ctrls/rememberController.js';
import networkRouter from './social-network/networkRouter.js';
import { verifyToken } from "../middlewares/authMiddleware.js"; //For protected routes!!!
import { logoutController } from "../ctrls/logoutController.js";

const router = express.Router();

//Login Router
router.get('/login', loginController);
//Registration Router
router.get('/register', registerController);
//Remember Password
router.get('/remember', rememberController);
//Authoriazation via Social Network
router.use('/network-auth', networkRouter);
//Profile
router.get('/profile', verifyToken, (req, res) => {
    if(req.user) {
        res.json({
            message: 'Access Granted',
            user: req.user,

        });

    } else {
        res.status(403).json({message: 'Access denied'});
    }
})
router.get('/logout', logoutController);

export default router;