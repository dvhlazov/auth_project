import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const privateKey = process.env.PRIVATE_KEY;
export const publicKey = process.env.PUBLIC_KEY;

//for test ID


export const generateAccessToken = (userID) => {
    return jwt.sign({userID}, privateKey, {algorithm: 'RS256', expiresIn: '10m'});//10m for expiring of accessToken
}
export const generateRefreshToken = (userID) => {
    return jwt.sign({userID}, privateKey, {algorithm: 'RS256', expiresIn: '1d'}) //1 day for expiring of refreshToken
}


/* const userID = '12345abc';
const accesToken = generateAccessToken(userID);
console.log(`Yout accesToken is: ${accesToken}`); */

/* const refreshToken = generateRefreshToken(userID);
console.log(`Refresh token: ${refreshToken}`); */

