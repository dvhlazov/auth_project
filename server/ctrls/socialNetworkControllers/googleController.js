import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../tokens.js';

export const googleController = (req, res) => {
    try {
        //get user data from callback(object 'done');
        const user = req.user;

        const accessToken = generateAccessToken(user.userID);
        
        const refreshToken = generateRefreshToken(user.userID);
        
        res.cookie('accessToken', accessToken, { 
            httpOnly: true, 
            maxAge: 3600000,
            secure: false // 1 h
            /* secure: process.env.NODE_ENV === 'production' //  */
        });
        
        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true, 
            maxAge: 86400000,
            secure: false // 1 day
            /* secure: process.env.NODE_ENV === 'production' //  */
        });

        //Then => redirect to route /profile

        res.redirect('/api/profile');

    } catch (error) {
        //if error => redirect to login
        res.redirect('/api/login');
    }
}
export default googleController;