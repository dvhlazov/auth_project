import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook"; 
import { generateAccessToken, generateRefreshToken } from "../ctrls/tokens.js";

import dotenv from 'dotenv';

dotenv.config({path: './server/config/google.env'});
dotenv.config({path: './server/config/facebook.env'});

passport.use(
    //GOOGLE
    
        new GoogleStrategy( 
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3030/api/network-auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const userID = profile.id;
    
                const access = generateAccessToken(userID);
                const refresh = generateRefreshToken(userID);
    
                //user object before transfer
                const user = {
                    userID,
                    userName: profile.displayName,
                    userEmail: profile.emails?.[0]?.value,
                    tokens: {
                        accessToken: access,
                        refreshToken: refresh,
                    },
                };
    
                // transfer data if success
                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    ), 
    );
    passport.use(
           //FACEBOOK 
           new FacebookStrategy( 
            {
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_APP_SECRET,
                callbackURL: process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3030/api/network-auth/facebook/callback',
                profileFields: ['id', 'emails', 'name'],
            },
            async(accessToken, refreshToken, profile, done) => {
                try {
                   
                    const firstName = profile._json.first_name;
                const lastName = profile._json.last_name;
                const fullName = `${firstName} ${lastName}`;
                    
                    const userID = profile.id;
                    
                    
    
                    const access = generateAccessToken(userID);
                    const refresh = generateRefreshToken(userID);
    
                  
                    const user = {
                        userID,
                        userName: fullName, 
                        userEmail: profile.emails?.[0]?.value,
                        tokens: {
                            accessToken: access,
                            refreshToken: refresh,
                        },
                    };
    
                    
                    done(null, user);
                } catch (error) {
                    done(error, null);
                }
            }
        )
    );

passport.serializeUser((user, done) => {
    done(null, user.userID); 
});

passport.deserializeUser((id, done) => {
    
    const user = { userID: id }; 
    done(null, user);
});

export default passport;