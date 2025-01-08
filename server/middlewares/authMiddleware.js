import jwt from 'jsonwebtoken';
import { publicKey } from '../ctrls/tokens.js';

//Middleware for checkingTokens
export function verifyToken(req, res, next) {
    let token = req.header('Authorization')?.replace('Bearer ', ''); 
    if(!token) {
       token = req.cookies?.accessToken;
    }
    console.log('Cookies:', req.cookies); // Перевірка всіх cookies
    if(!token) {
        console.log('Access Denied')
        return res.status(403).json({message: "Access Denied"})
    }
    jwt.verify(token, publicKey, (err, user)=> {
        if(err) {
            console.log('Invalid token');
            return res.status(401).json({message: "Invalid token"});
        }
        
   req.user = user;
   console.log(`token veryfied for user`, user);
   next();

    });
};